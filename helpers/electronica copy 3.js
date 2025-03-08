const soap = require('soap');
const axios = require('axios');
const crypto = require('crypto');
const http = require('http');

const AdmZip = require('adm-zip');

const Dsig = require('pkcs12-xml');
const fs = require('fs');
const xpath = require('xpath');
const forge = require('node-forge');
const { DOMParser, XMLSerializer } = require('xmldom');
const { SignedXml } = require('xml-crypto');

const { create } = require('xmlbuilder2');

// MODELS
const Invoice = require('../models/invoices.model');
const Datos = require('../models/datos.model');
const Dataico = require('../models/dataico.model');


const { searchCity } = require('./searchCity');

const sendElectronica = async(invoice) => {

    const datos = await Datos.findOne({ status: true });
    const data = await Dataico.findOne();

    const { ciudad, departamento } = await searchCity(data.city, data.department);



    //  SoftwareSecurityCode (Id Software + Pin + NroDocumentos)
    const SoftwareSecurityCode = crypto.createHash('sha384').update('37fa0107-a7c3-4f84-934c-6a12faa17b40' + '54565' + '50', 'utf8').digest('hex');

    let dian = {
        id: '37fa0107-a7c3-4f84-934c-6a12faa17b40',
        clave: 'fc8eac422eba16e22ffd8c6f94b3f40a6e38162c',
        test: 'a00c4011-5384-4532-b75c-a3ba03621ed7',
        pin: '54565',
        url: 'https://vpfe-hab.dian.gov.co/WcfDianCustomerServices.svc?wsdl',
        fechaI: '3/14/2019',
        fechaT: '6/14/2019',
        prefijo: 'SETP',
        resolucion: '18760000001',
        cedula: '88243048',
        nit: '882430486',
        desde: '990000000',
        hasta: '995000000',
        fechaD: '2019-01-19',
        fechaH: '2030-01-19',
        number: '0001',
        documentos: '50',
        SoftwareSecurityCode,
        cufe: '',
        fecha: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
        hora: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}-05:00`,
    }





    let numberI = await Invoice.countDocuments({ prefix: dian.prefijo, send: true, electronica: true });

    numberI++;

    if (numberI > Number(dian.hasta)) {
        return { ok: false, msg: 'Ha llegado al limite de facturas en esta resolucion' };
    }

    numberI += 990000000;

    dian.number = numberI.toString();

    // Crear el hash SHA-384 CUFE
    // SHA‐384(NumFac + FecFac + HorFac + ValFac + CodImp1 + ValImp1 + CodImp2 + ValImp2 + CodImp3 + ValImp3 + ValTot + NitOFE + NumAdq + ClTec + TipoAmbie)
    const dataCufe = `${dian.number}${dian.fecha}${dian.hora}25000.00014750.0029750.00`
    const cufe = crypto.createHash('sha384').update(dataCufe, 'utf8').digest('hex');
    dian.cufe = cufe;

    let qrCode = `<QRCode>
    					NroFactura=${dian.prefijo}${dian.number}
    					NitFacturador=${dian.nit}
    					NitAdquiriente=22222222
    					FechaFactura=${dian.fecha}
    					ValorTotalFactura=${invoice.amount}
    					CUFE=${cufe}
    					URL=https://catalogo-vpfe-hab.dian.gov.co/Document/FindDocument?documentKey=${cufe}
    				</QRCode>`

    // let firm = await firma();

    const url = 'https://vpfe-hab.dian.gov.co/WcfDianCustomerServices.svc?wsdl';
    const _headXML = headXML();
    // const _ublExtentionXML = ublExtentionXML(firm, dian, qrCode);
    const _ublExtentionXML = ublExtentionXML(dian, qrCode);
    const _versionXML = versionXML(dian, cufe);
    const _accountingSuplierParty = accountingSuplierParty(datos, data, ciudad, departamento);
    const _accountingCustomerParty = accountingCustomerParty();
    const _payTotalLegal = payTotalLegal();
    const _totalTributos = totalTributos();
    const _invoiceLine = invoiceLine();
    const _footerXML = footerXML();

    //  PREPARAR XML
    let XML = `${_headXML.toString()}${_ublExtentionXML.toString()}${_versionXML.toString()}${_accountingSuplierParty.toString()}${_accountingCustomerParty.toString()}${_payTotalLegal.toString()}${_totalTributos.toString()}${_invoiceLine.toString()}${_footerXML.toString()}`
        // const XML = prepareXML(XMLBefore, dian);

    const xml = await firma2(XML);

    // Escribir el archivo XML
    await fs.writeFile(`uploads/xml/${dian.prefijo}${dian.number}.xml`, xml, (err) => {
        if (err) {
            console.error('Error al escribir el archivo', err);
        } else {
            console.log('Archivo XML guardado con éxito');

			// Crea una instancia de AdmZip
			const zip = new AdmZip();

			// Agrega el XML al ZIP con un nombre de archivo, por ejemplo, "invoice.xml"
			zip.addFile(`${dian.prefijo}${dian.number}.xml`, Buffer.from(xml, 'utf8'));

			// Opcional: Puedes escribir el archivo ZIP a disco si lo necesitas
			// zip.writeZip("invoice.zip");

			// Obtén el contenido del ZIP como Buffer
			const zipBuffer = zip.toBuffer();

			// Convierte el Buffer a una cadena Base64
			const base64Zip = zipBuffer.toString('base64');

			console.log('XML comprimido y convertido a Base64:');
			console.log(base64Zip);
        }
    });


};

const firma2 = async(xml) => {

    // Cargar archivo .p12
    const p12File = fs.readFileSync('uploads/p12/firma.p12');
    const password = 'Abcd.1234';

    // Parsear el archivo .p12
    const p12Asn1 = forge.asn1.fromDer(p12File.toString('binary'));
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password);

    // Extraer la clave privada y el certificado
    let key, cert;
    p12.safeContents.forEach(safeContent => {
        safeContent.safeBags.forEach(safeBag => {
            if (safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag) {
                key = forge.pki.privateKeyToPem(safeBag.key);
            } else if (safeBag.type === forge.pki.oids.certBag) {
                cert = forge.pki.certificateToPem(safeBag.cert);
            }
        });
    });

    // Asegúrate de que tanto la clave privada como el certificado han sido extraídos
    if (!key || !cert) {
        throw new Error('No se pudo extraer la clave privada o el certificado del archivo .p12');
    }

    const doc = new DOMParser().parseFromString(xml, 'application/xml');

    // Crear la firma
    const sig = new SignedXml({
        privateKey: key,
        publicCert: cert
    });

    sig.addReference({
        xpath: "//*[local-name(.)='UBLExtension']",
        digestAlgorithm: "http://www.w3.org/2001/04/xmlenc#sha256",
        transforms: ['http://www.w3.org/2000/09/xmldsig#enveloped-signature',
            'http://www.w3.org/2001/10/xml-exc-c14n#',
        ],
        isEmptyUri: true
    });

    sig.signingKey = key;

    // Incluir el certificado en la firma
    sig.keyInfoProvider = {
        getKeyInfo: () => `<X509Data><X509Certificate>${cert.replace(/-----BEGIN CERTIFICATE-----|-----END CERTIFICATE-----|\n/g, '')}</X509Certificate></X509Data>`
    };

    sig.canonicalizationAlgorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
    sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";


    // Firmar el documento
    sig.computeSignature(xml);

    // Obtener el XML firmado
    const signedXml = sig.getSignedXml();

    // Parsear la firma resultante para insertarla en el nodo <ExtensionContent>
    const signedDoc = new DOMParser().parseFromString(signedXml, 'application/xml');

    // Seleccionar el nodo <ExtensionContent> donde debe ir la firma
    const extensionContentNode = doc.getElementsByTagName('ExtensionContent')[1];
    if (!extensionContentNode) {
        throw new Error("No se encontró el nodo 'ExtensionContent' en el XML.");
    }

    // Importar el nodo de la firma en el documento original
    const signatureElement = signedDoc.getElementsByTagName('Signature')[0];
    const importedSignature = doc.importNode(signatureElement, true);

    // Insertar la firma dentro de <ExtensionContent>
    extensionContentNode.appendChild(importedSignature);

    // Serializar el XML de vuelta a cadena
    const finalXml = new XMLSerializer().serializeToString(doc);

    // VALIDAR FIRMAS DEL XML
    await validateFirma(finalXml, key, cert);

    // Obtener el XML firmado
    return finalXml;

}

const validateFirma = (xmlString, k, c) => {

    // Parsear el XML firmado
    const doc = new DOMParser().parseFromString(xmlString, 'application/xml');

    // Utilizar xpath para encontrar el nodo de la firma
    const select = xpath.useNamespaces({ "ds": "http://www.w3.org/2000/09/xmldsig#" });
    const signatureNode = select("//*[local-name(.)='Signature']", doc)[0];
    if (!signatureNode) {
        throw new Error('No se encontró la firma en el documento.');
    }

    // Crear la instancia para validar la firma
    const sig = new SignedXml();

    // Cargar la firma desde el nodo Signature
    sig.loadSignature(signatureNode);

    // Extraer el certificado del nodo de firma
    const certBase64 = sig.getKeyInfoContent({ publicCert: c }).match(/<X509Certificate>([^<]+)<\/X509Certificate>/)[1];
    const certPem = `-----BEGIN CERTIFICATE-----\n${certBase64.match(/.{1,64}/g).join('\n')}\n-----END CERTIFICATE-----`;

    // Parsear el certificado utilizando forge
    const cert = forge.pki.certificateFromPem(certPem);

    // Verificar la firma con respecto al contenido firmado
    const isValid = sig.checkSignature(xmlString);

    if (isValid) {
        console.log('La firma es válida.');
    } else {
        console.log('La firma no es válida:', sig.validationErrors);
    }

}

const firma = async() => {

    // Cargar archivo .p12
    const p12File = fs.readFileSync('uploads/p12/firma.p12');
    const password = 'Abcd.1234';

    // Parsear el archivo .p12 utilizando la clave
    const p12Asn1 = forge.asn1.fromDer(p12File.toString('binary'));
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password);

    // Extraer la clave privada y el certificado del archivo .p12
    let key, cert;
    p12.safeContents.forEach(safeContent => {
        safeContent.safeBags.forEach(safeBag => {
            if (safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag) {
                key = forge.pki.privateKeyToPem(safeBag.key);
            } else if (safeBag.type === forge.pki.oids.certBag) {
                cert = forge.pki.certificateToPem(safeBag.cert);
            }
        });
    });

    // Asegúrate de que tanto la clave privada como el certificado han sido extraídos
    if (!key || !cert) {
        throw new Error('No se pudo extraer la clave privada o el certificado del archivo .p12');
    }

    //  XML FIRMA
    const xml = `<UBLExtension><ExtensionContent></ExtensionContent></UBLExtension>`;

    // Crear la firma
    const sig = new SignedXml({
        privateKey: key,
        publicCert: cert
    });
    sig.addReference({
        xpath: "//*[local-name(.)='ExtensionContent']",
        digestAlgorithm: "http://www.w3.org/2001/04/xmlenc#sha256",
        transforms: ['http://www.w3.org/2000/09/xmldsig#enveloped-signature',
            'http://www.w3.org/2001/10/xml-exc-c14n#',
        ],
        isEmptyUri: true
    });
    sig.signingKey = key;

    // Incluir el certificado en la firma
    sig.keyInfoProvider = {
        getKeyInfo: () => `<X509Data><X509Certificate>${cert.replace(/-----BEGIN CERTIFICATE-----|-----END CERTIFICATE-----|\n/g, '')}</X509Certificate></X509Data>`
    };

    sig.canonicalizationAlgorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
    sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";


    // Firmar el documento
    sig.computeSignature(xml, {
        prefix: "ds",
        location: { reference: "//*[local-name(.)='ExtensionContent']" }
    });

    // Obtener el XML firmado
    return sig.getSignedXml();

}

const creatXML = (invoice, dian, empresa) => {

	// Construcción del XML de la factura electrónica en formato UBL 2.1
	const invoiceXML = create({ version: '1.0', encoding: 'UTF-8' })
	.ele('Invoice', {
	  xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
	  'xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
	  'xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
	  'xmlns:ext': 'urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2',
	  'xmlns:ds': 'http://www.w3.org/2000/09/xmldsig#',
	  'xmlns:sts': 'dian:gov:co:facturaelectronica:Structures-2-1',
	  'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
	  'xsi:schemaLocation': 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 http://docs.oasis-open.org/ubl/os-UBL-2.1/xsd/maindoc/UBL-Invoice-2.1.xsd'
	})
	
	// Sección de UBLExtensions
	.ele('ext:UBLExtensions')
		// Primer UBLExtension: Datos DIAN
		.ele('ext:UBLExtension')
			.ele('ext:ExtensionContent')
			.ele('sts:DianExtensions')
				.ele('sts:InvoiceControl')
					.ele('sts:InvoiceAuthorization').txt(`${dian.resolucion}`).up()
					.ele('sts:AuthorizationPeriod')
						.ele('cbc:StartDate')
							.txt(`2019-01-19`)
						.up()
						.ele('cbc:EndDate')
							.txt(`2030-01-19`)
						.up()
					.up()
				.up() // Cierra sts:InvoiceControl
			.up() // Cierra sts:DianExtensions
			.up() // Cierra ExtensionContent
		.up() // Cierra primer UBLExtension

	  // Segundo UBLExtension: Firma digital
		.ele('ext:UBLExtension')
			.ele('ext:ExtensionContent')
				
			.up() // Cierra ExtensionContent (firma)
		.up() // Cierra segundo UBLExtension

  	.up() // Cierra ext:UBLExtensions
  
	// Datos básicos de la factura
	.ele('cbc:UBLVersionID').txt('2.1').up()
	.ele('cbc:CustomizationID').txt('DIAN-2.1').up()
	.ele('cbc:ProfileID').txt('DIAN 2.1').up()
	.ele('cbc:ID').txt('990000001').up()
	.ele('cbc:IssueDate').txt('2025-03-05').up()
	.ele('cbc:InvoiceTypeCode').txt('01').up()
	.ele('cbc:DocumentCurrencyCode').txt('COP').up()
	.ele('cbc:CUFE').txt('951b5042595602fa7c363316396a87177f95ebcc03a6d677d4d5bee369af41603c8c8bc726b5337b6d20b97ebb64cd97').up()
  
	// Información del Emisor
	.ele('cac:AccountingSupplierParty')
	  .ele('cac:Party')
		.ele('cbc:EndpointID', { schemeID: '31' }).txt('88243048').up()
		.ele('cac:PartyName')
		  .ele('cbc:Name').txt('DISCOVERY SYSTEMS POS ELKIN DANIEL CASTILLO PEREZ').up()
		.up()
		.ele('cac:PartyTaxScheme')
		  .ele('cbc:RegistrationName').txt('DISCOVERY SYSTEMS POS ELKIN DANIEL CASTILLO PEREZ').up()
		  .ele('cbc:CompanyID').txt('88243048').up()
		  .ele('cac:TaxScheme')
			.ele('cbc:ID').txt('01').up()
		  .up()
		.up()
		.ele('cac:PartyLegalEntity')
		  .ele('cbc:RegistrationName').txt('DISCOVERY SYSTEMS POS ELKIN DANIEL CASTILLO PEREZ').up()
		  .ele('cbc:CompanyID').txt('88243048').up()
		  .ele('cac:RegistrationAddress')
			.ele('cbc:CityName').txt('Bogotá').up()
			.ele('cbc:CountrySubentity').txt('Cundinamarca').up()
			.ele('cac:AddressLine')
			  .ele('cbc:Line').txt('Calle 123 # 45-67').up()
			.up()
		  .up()
		.up()
	  .up()
	.up() // Cierra AccountingSupplierParty
  
	// Información del Receptor
	.ele('cac:AccountingCustomerParty')
	  .ele('cac:Party')
		.ele('cbc:EndpointID', { schemeID: '13' }).txt('22222222').up()
		.ele('cac:PartyLegalEntity')
		  .ele('cbc:RegistrationName').txt('Consumidor Final').up()
		  .ele('cbc:CompanyID').txt('22222222').up()
		  .ele('cac:RegistrationAddress')
			.ele('cbc:CityName').txt('Medellín').up()
			.ele('cbc:CountrySubentity').txt('Antioquia').up()
			.ele('cac:AddressLine')
			  .ele('cbc:Line').txt('Carrera 89 # 12-34').up()
			.up()
		  .up()
		.up()
	  .up()
	.up() // Cierra AccountingCustomerParty
  
	// Detalle de la factura (InvoiceLine)
	.ele('cac:InvoiceLine')
	  .ele('cbc:ID').txt('1').up()
	  .ele('cbc:InvoicedQuantity', { unitCode: 'EA' }).txt('10').up()
	  .ele('cbc:LineExtensionAmount', { currencyID: 'COP' }).txt('100000').up()
	  .ele('cac:Item')
		.ele('cbc:Description').txt('Producto A').up()
	  .up()
	  .ele('cac:Price')
		.ele('cbc:PriceAmount', { currencyID: 'COP' }).txt('10000').up()
	  .up()
	.up() // Cierra InvoiceLine
  
	// Totales e Impuestos (TaxTotal)
	.ele('cac:TaxTotal')
	  .ele('cbc:TaxAmount', { currencyID: 'COP' }).txt('19000').up()
	  .ele('cac:TaxSubtotal')
		.ele('cbc:TaxableAmount', { currencyID: 'COP' }).txt('100000').up()
		.ele('cbc:TaxAmount', { currencyID: 'COP' }).txt('19000').up()
		.ele('cac:TaxCategory')
		  .ele('cbc:ID').txt('01').up()
		  .ele('cac:TaxScheme')
			.ele('cbc:ID').txt('01').up()
		  .up()
		.up()
	  .up()
	.up(); // Cierra TaxTotal

	// Genera el XML final con formato bonito (prettyPrint)
	const xmlOutput = invoiceXML.end({ prettyPrint: true });

	// Visualización del XML generado
	return xmlOutput;


}

const headXML = () => {
    return `<?xml version="1.0" encoding="UTF-8"?><Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:schemaLocation="http://docs.oasis-open.org/ubl/os-UBL-2.1/xsd/maindoc/UBL-Invoice-2.1.xsd" xmlns:sts="dian:gov:co:facturaelectronica:Structures-2-1" xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" xmlns:xades141="http://uri.etsi.org/01903/v1.4.1#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">`;
}

const ublExtentionXML = (dian, qrCode) => {

        return `<UBLExtensions>
		<UBLExtension>
			<ExtensionContent>
				<DianExtensions>
					<InvoiceControl>
						<InvoiceAuthorization>
							${dian.resolucion}
						</InvoiceAuthorization>
						<AuthorizationPeriod>
							<StartDate>
								19-01-2019
							</StartDate>
							<EndDate>
								19-01-2030
							</EndDate>
						</AuthorizationPeriod>
						<AuthorizedInvoices>
							<Prefix>
								${dian.prefijo}
							</Prefix>
							<From>
								${dian.desde}
							</From>
							<To>
								${dian.hasta}
							</To>
						</AuthorizedInvoices>
					</InvoiceControl>
					<InvoiceSource>
						<IdentificationCode listAgencyID="6" listAgencyName="United Nations Economic Commission for Europe" listSchemeURI="urn:oasis:names:specification:ubl:codelist:gc:CountryIdentificationCode-2.1">
							CO
						</IdentificationCode>
					</InvoiceSource>
					<SoftwareProvider>
						<ProviderID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="8" schemeName="31">
							${dian.cedula}
						</ProviderID>
						<SoftwareID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)">
							${dian.id}
						</SoftwareID>
					</SoftwareProvider>
					<SoftwareSecurityCode schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)">
						${dian.SoftwareSecurityCode}
					</SoftwareSecurityCode>
					<AuthorizationProvider>
						<AuthorizationProviderID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="4" schemeName="31">
							${dian.cedula}
						</AuthorizationProviderID>
					</AuthorizationProvider>
					<QRCode>
						https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=${dian.cufe}
					</QRCode>
				</DianExtensions>
			</ExtensionContent>
		</UBLExtension>
		<UBLExtension>
			<ExtensionContent>
			</ExtensionContent>
		</UBLExtension>
	</UBLExtensions>`
}
    
const versionXML = (dian, cufe) => {

    return `<UBLVersionID>
		UBL 2.1
	</UBLVersionID>
	<CustomizationID>
		10
	</CustomizationID>
	<ProfileID>
		DIAN 2.1: Factura Electrónica de Venta
	</ProfileID>
	<ProfileExecutionID>
		1
	</ProfileExecutionID>
	<ID>
		${dian.number}
	</ID>
	<UUID schemeID="1" schemeName="CUFE-SHA384">
		${dian.cufe}
	</UUID>
	<IssueDate>
      ${dian.fecha}
	</IssueDate>
	<IssueTime>
      ${dian.hora}
	</IssueTime>
	<InvoiceTypeCode>
		01
	</InvoiceTypeCode>
	<DocumentCurrencyCode>
		COP
	</DocumentCurrencyCode>
	<LineCountNumeric>
		1
	</LineCountNumeric>`;
}

//TODO: MODIFICAR EL accountingSuplierParty
const accountingSuplierParty = (datos, data, ciudad, departamento) => {

    return `<AccountingSupplierParty>
		<AdditionalAccountID>
			2
		</AdditionalAccountID>
		<Party>
			<IndustryClassificationCode>
				9511
			</IndustryClassificationCode>
			<PartyName>
				<Name>
					DISCOVERY SYSTEMS POS
				</Name>
			</PartyName>
			<PhysicalLocation>
				<Address>
					<ID>
						68001
					</ID>
					<CityName>
						BUCARAMANGA
					</CityName>
					<CountrySubentity>
						SANTANDER
					</CountrySubentity>
					<CountrySubentityCode>
						68
					</CountrySubentityCode>
					<AddressLine>
						<Line>
							CR 18 34 43 CC PAEZ LC 310
						</Line>
					</AddressLine>
					<Country>
						<IdentificationCode>
							CO
						</IdentificationCode>
						<Name languageID="es">
							Colombia
						</Name>
					</Country>
				</Address>
			</PhysicalLocation>
			<PartyTaxScheme>
				<RegistrationName>
					ELKIN DANIEL CASTILLO PEREZ
				</RegistrationName>
				<CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="6" schemeName="13">
					88243048
				</CompanyID>
				<TaxLevelCode listName="48">
					R-99-PN
				</TaxLevelCode>
				<RegistrationAddress>
					<ID>
						68001
					</ID>
					<CityName>
						BUCARAMANGA
					</CityName>
					<CountrySubentity>
						SANTANDER
					</CountrySubentity>
					<CountrySubentityCode>
						68
					</CountrySubentityCode>
					<AddressLine>
						<Line>
							CR 18 34 43 CC PAEZ LC 310
						</Line>
					</AddressLine>
					<Country>
						<IdentificationCode>
							CO
						</IdentificationCode>
						<Name languageID="es">
							Colombia
						</Name>
					</Country>
				</RegistrationAddress>
				<TaxScheme>
					<ID>
						01
					</ID>
					<Name>
						IVA
					</Name>
				</TaxScheme>
			</PartyTaxScheme>
			<PartyLegalEntity>
				<RegistrationName>
					ELKIN DANIEL CASTILLO PEREZ
				</RegistrationName>
				<CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="6" schemeName="13">
					88243048
				</CompanyID>
				<CorporateRegistrationScheme>
					<ID>
						SETP
					</ID>
				</CorporateRegistrationScheme>
			</PartyLegalEntity>
			<Contact>
				<Telephone>
					3155962626
				</Telephone>
				<ElectronicMail>
					elkindanielcastillo@gmail.com
				</ElectronicMail>
			</Contact>
		</Party>
	</AccountingSupplierParty>`

}

//TODO: MODIFICAR EL accountingCustomerParty
const accountingCustomerParty = () => {

    return `<AccountingCustomerParty>
		<AdditionalAccountID>
			1
		</AdditionalAccountID>
		<Party>
			<PartyName>
				<Name>
					ETICO SERRANO GOMEZ
				</Name>
			</PartyName>
			<PartyTaxScheme>
				<RegistrationName>
					ETICO SERRANO GOMEZ
				</RegistrationName>
				<CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="7" schemeName="31">
					892300678
				</CompanyID>
				<TaxLevelCode listName="48">
					R-99-PN
				</TaxLevelCode>
				<TaxScheme>
					<ID>
						01
					</ID>
					<Name>
						IVA
					</Name>
				</TaxScheme>
			</PartyTaxScheme>
			<PartyLegalEntity>
				<RegistrationName>
					ETICO SERRANO GOMEZ
				</RegistrationName>
				<CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="7" schemeName="31">
					892300678
				</CompanyID>
				<CorporateRegistrationScheme>
					<ID>
						SETP
					</ID>
				</CorporateRegistrationScheme>
			</PartyLegalEntity>
			<Contact>
				<Telephone>
					3156889563
				</Telephone>
				<ElectronicMail>
					FARMACIA3160@ETICOS.COM
				</ElectronicMail>
			</Contact>
		</Party>
	</AccountingCustomerParty>`

}

//TODO: MODIFICAR EL payTotalLegal
const payTotalLegal = () => {
    return `<PaymentMeans>
		<ID>
			1
		</ID>
		<PaymentMeansCode>
			10
		</PaymentMeansCode>
		<PaymentDueDate>         
         ${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}
		</PaymentDueDate>
	</PaymentMeans>`
}

//TODO: MODIFICAR EL totalTributos
const totalTributos = () => {

    return `<TaxTotal>
		<TaxAmount currencyID="COP">
			4750.00
		</TaxAmount>
		<TaxSubtotal>
			<TaxableAmount currencyID="COP">
				25000.00
			</TaxableAmount>
			<TaxAmount currencyID="COP">
				4750.00
			</TaxAmount>
			<TaxCategory>
				<Percent>
					19.00
				</Percent>
				<TaxScheme>
					<ID>
						01
					</ID>
					<Name>
						IVA
					</Name>
				</TaxScheme>
			</TaxCategory>
		</TaxSubtotal>
	</TaxTotal>
   <LegalMonetaryTotal>
		<LineExtensionAmount currencyID="COP">
			25000.00
		</LineExtensionAmount>
		<TaxExclusiveAmount currencyID="COP">
			25000.00
		</TaxExclusiveAmount>
		<TaxInclusiveAmount currencyID="COP">
			29750.00
		</TaxInclusiveAmount>
		<PayableAmount currencyID="COP">
			29750.00
		</PayableAmount>
	</LegalMonetaryTotal>`

}

//TODO: MODIFICAR EL invoiceLine
const invoiceLine = () => {

    return `<InvoiceLine>
		<ID>
			1
		</ID>
		<InvoicedQuantity unitCode="94">
			1.00
		</InvoicedQuantity>
		<LineExtensionAmount currencyID="COP">
			25000.00
		</LineExtensionAmount>
		<TaxTotal>
			<TaxAmount currencyID="COP">
				4750.00
			</TaxAmount>
			<TaxSubtotal>
				<TaxableAmount currencyID="COP">
					25000.00
				</TaxableAmount>
				<TaxAmount currencyID="COP">
					4750.00
				</TaxAmount>
				<TaxCategory>
					<Percent>
						19.00
					</Percent>
					<TaxScheme>
						<ID>
							01
						</ID>
						<Name>
							IVA
						</Name>
					</TaxScheme>
				</TaxCategory>
			</TaxSubtotal>
		</TaxTotal>
		<Item>
			<Description>
				cargador v8 marca speedsong  sg-53C
			</Description>
			<StandardItemIdentification>
				<ID schemeID="999">
					23082024
				</ID>
			</StandardItemIdentification>
		</Item>
		<Price>
			<PriceAmount currencyID="COP">
				25000.00
			</PriceAmount>
			<BaseQuantity unitCode="94">
				1.00
			</BaseQuantity>
		</Price>
	</InvoiceLine>`

}

const footerXML = () => { return "</Invoice>" }

const prepareXML = (xml, dian) => {
    return `
   
   <?xml version="1.0" encoding="UTF-8"?>
<AttachedDocument xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:schemaLocation="http://docs.oasis-open.org/ubl/os-UBL-2.1/xsd/maindoc/UBL-Invoice-2.1.xsd" xmlns:xades141="http://uri.etsi.org/01903/v1.4.1#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" xmlns:sts="dian:gov:co:facturaelectronica:Structures-2-1" xmlns="urn:oasis:names:specification:ubl:schema:xsd:AttachedDocument-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
	<UBLVersionID>
		UBL 2.1
	</UBLVersionID>
	<CustomizationID>
		Documentos adjuntos
	</CustomizationID>
	<ProfileID>
		Factura Electrónica de Venta
	</ProfileID>
	<ProfileExecutionID>
		1
	</ProfileExecutionID>
	<ID>
		${dian.id}
	</ID>
	<IssueDate>
		${dian.fecha}
	</IssueDate>
	<IssueTime>
		${dian.hora}
	</IssueTime>
	<DocumentType>
		Contenedor de Factura Electrónica
	</DocumentType>
	<ParentDocumentID>
		${dian.prefijo}${dian.number}
	</ParentDocumentID>
	<SenderParty>
		<PartyTaxScheme>
			<RegistrationName>
				ELKIN DANIEL CASTILLO PEREZ
			</RegistrationName>
			<CompanyID schemeID="6" schemeName="13" schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)">
				88243048
			</CompanyID>
			<TaxLevelCode listName="48">
				R-99-PN
			</TaxLevelCode>
			<RegistrationAddress>
				<ID>
					68001
				</ID>
				<CityName>
					BUCARAMANGA
				</CityName>
				<CountrySubentity>
					SANTANDER
				</CountrySubentity>
				<CountrySubentityCode>
					68
				</CountrySubentityCode>
				<AddressLine>
					<Line>
						CR 18 34 43 CC PAEZ LC 310
					</Line>
				</AddressLine>
				<Country>
					<IdentificationCode>
						CO
					</IdentificationCode>
					<Name languageID="es">
						Colombia
					</Name>
				</Country>
			</RegistrationAddress>
			<TaxScheme>
				<ID>
					01
				</ID>
				<Name>
					IVA
				</Name>
			</TaxScheme>
		</PartyTaxScheme>
	</SenderParty>
	<ReceiverParty>
		<PartyTaxScheme>
			<RegistrationName>
				ETICO SERRANO GOMEZ
			</RegistrationName>
			<CompanyID schemeID="7" schemeName="31" schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)">
				892300678
			</CompanyID>
			<TaxLevelCode listName="48">
				R-99-PN
			</TaxLevelCode>
			<TaxScheme>
				<ID>
					01
				</ID>
				<Name>
					IVA
				</Name>
			</TaxScheme>
		</PartyTaxScheme>
	</ReceiverParty>
	<Attachment>
		<ExternalReference>
			<MimeCode>
				text/xml
			</MimeCode>
			<EncodingCode>
				UTF-8
			</EncodingCode>
			<Description>
				<![CDATA[ ${xml} ]]>
			</Description>
		</ExternalReference>
	</Attachment>
	<ParentDocumentLineReference>
		<LineID>
			1
		</LineID>
		<DocumentReference>
			<ID>
            ${dian.prefijo}${dian.number}
			</ID>
			<UUID schemeName="CUFE-SHA384">
				${dian.cufe}
			</UUID>
			<IssueDate>
				2024-08-23
			</IssueDate>
			<DocumentType>
				ApplicationResponse
			</DocumentType>
			<Attachment>
				<ExternalReference>
					<MimeCode>
						text/xml
					</MimeCode>
					<EncodingCode>
						UTF-8
					</EncodingCode>
					<Description>
						<![CDATA[ ${xml} ]]>
					</Description>
				</ExternalReference>
			</Attachment>
			<ResultOfVerification>
				<ValidatorID>
					Unidad Especial Dirección de Impuestos y Aduanas Nacionales
				</ValidatorID>
				<ValidationResultCode>
					02
				</ValidationResultCode>
				<ValidationDate>
					2024-08-23
				</ValidationDate>
				<ValidationTime>
					16:08:51-05:00
				</ValidationTime>
			</ResultOfVerification>
		</DocumentReference>
	</ParentDocumentLineReference>
</AttachedDocument>`;
}


// EXPORT
module.exports = {
    sendElectronica
};