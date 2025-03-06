const fs = require('fs');
const xpath = require('xpath');

const AdmZip = require('adm-zip');

const forge = require('node-forge');
const { SignedXml } = require('xml-crypto');
const { create } = require('xmlbuilder2');
const { DOMParser, XMLSerializer } = require('xmldom');

const crypto = require('crypto');

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
	let xml = await creatXML(invoice, dian, datos);
	// let xmlFirmado = await firma2(xml)

	const xmlFirmado = await firma2(xml);
	
    // Escribir el archivo XML
    await fs.writeFile(`uploads/xml/${dian.prefijo}${dian.number}.xml`, xmlFirmado, (err) => {
        if (err) {
            console.error('Error al escribir el archivo', err);
        } else {
            console.log('Archivo XML guardado con éxito');

			// Crea una instancia de AdmZip
			const zip = new AdmZip();

			// Agrega el XML al ZIP con un nombre de archivo, por ejemplo, "invoice.xml"
			zip.addFile(`${dian.prefijo}${dian.number}.xml`, Buffer.from(xmlFirmado, 'utf8'));

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
			  .ele('sts:InvoiceAuthorization').txt('18760000001').up()
			.up() // Cierra sts:InvoiceControl
		  .up() // Cierra sts:DianExtensions
		.up() // Cierra ExtensionContent
	  .up() // Cierra primer UBLExtension

	  // Segundo UBLExtension: Firma digital
	//   .ele('ext:UBLExtension')
    //   .ele('ext:ExtensionContent')
    //     .ele('ds:Signature', { Id: 'Signature' })
    //       .ele('ds:SignedInfo')
    //         .ele('ds:CanonicalizationMethod', { Algorithm: 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315' }).up()
    //         .ele('ds:SignatureMethod', { Algorithm: 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256' }).up()
    //         .ele('ds:Reference', { URI: '' })
    //           .ele('ds:Transforms')
    //             .ele('ds:Transform', { Algorithm: 'http://www.w3.org/2000/09/xmldsig#enveloped-signature' }).up()
    //             .ele('ds:Transform', { Algorithm: 'http://www.w3.org/2001/10/xml-exc-c14n#' }).up()
    //           .up() // Cierra ds:Transforms
    //           .ele('ds:DigestMethod', { Algorithm: 'http://www.w3.org/2001/04/xmlenc#sha256' }).up()
    //           .ele('ds:DigestValue').txt('DIGEST_VALUE_PLACEHOLDER').up()
    //         .up() // Cierra ds:Reference
    //       .up() // Cierra ds:SignedInfo
    //       .ele('ds:SignatureValue').txt('SIGNATURE_VALUE_PLACEHOLDER').up()
    //       .ele('ds:KeyInfo')
    //         .ele('ds:X509Data')
    //           .ele('ds:X509Certificate').txt('CERTIFICATE_BASE64').up()
    //         .up() // Cierra ds:X509Data
    //       .up() // Cierra ds:KeyInfo
    //     .up() // Cierra ds:Signature
    //   .up() // Cierra ExtensionContent (firma)
    // .up() // Cierra segundo UBLExtension

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
// const creatXML = (invoice, dian, empresa) => {

// 	// Construcción del XML de la factura electrónica en formato UBL 2.1
// 	const invoiceXML = create({ version: '1.0', encoding: 'UTF-8' })
// 	.ele('Invoice', {
// 		xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
// 		'xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
// 		'xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
// 		'xmlns:ext': 'urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2',
// 		'xmlns:dian': 'dian:gov:co:facturaelectronica:Structures-2-1'
// 	})
// 		// Sección de UBLExtensions con datos específicos de la DIAN
// 		.ele('ext:UBLExtensions')
// 		.ele('ext:UBLExtension')
// 			.ele('ext:ExtensionContent')
// 			.ele('dian:InvoiceControl')
// 				.ele('dian:InvoiceAuthorization').txt(dian.resolucion).up()
// 			.up()
// 			.up()
// 		.up()
// 		.up()
// 		// Datos básicos de la factura
// 		.ele('cbc:UBLVersionID').txt('2.1').up()
// 		.ele('cbc:CustomizationID').txt('DIAN-2.1').up()
// 		.ele('cbc:ProfileID').txt('DIAN 2.1').up()
// 		.ele('cbc:ID').txt(dian.number).up()
// 		.ele('cbc:IssueDate').txt(dian.fecha).up()
// 		.ele('cbc:InvoiceTypeCode').txt('01').up()
// 		.ele('cbc:DocumentCurrencyCode').txt('COP').up()
// 		// CUFE (valor de ejemplo, debe calcularse según lo requerido)
// 		.ele('cbc:CUFE').txt(dian.cufe).up()
		
// 		// Información del Emisor
// 		.ele('cac:AccountingSupplierParty')
// 		.ele('cac:Party')
// 			// Identificación del emisor
// 			.ele('cbc:EndpointID', { schemeID: '31' }).txt(empresa.nit).up()
// 			.ele('cac:PartyName')
// 			.ele('cbc:Name').txt(empresa.name).up()
// 			.up()
// 			// Datos tributarios
// 			.ele('cac:PartyTaxScheme')
// 			.ele('cbc:RegistrationName').txt(empresa.name).up()
// 			.ele('cbc:CompanyID').txt(empresa.nit).up()
// 			.ele('cac:TaxScheme')
// 				.ele('cbc:ID').txt('01').up()
// 			.up()
// 			.up()
// 			// Datos legales y de domicilio
// 			.ele('cac:PartyLegalEntity')
// 			.ele('cbc:RegistrationName').txt(empresa.name).up()
// 			.ele('cbc:CompanyID').txt(empresa.nit).up()
// 			.ele('cac:RegistrationAddress')
// 				.ele('cbc:CityName').txt('Bogotá').up()
// 				.ele('cbc:CountrySubentity').txt('Cundinamarca').up()
// 				.ele('cac:AddressLine')
// 				.ele('cbc:Line').txt('Calle 123 # 45-67').up()
// 				.up()
// 			.up()
// 			.up()
// 		.up()
// 		.up()
		
// 		// Información del Receptor
// 		.ele('cac:AccountingCustomerParty')
// 		.ele('cac:Party')
// 			// Identificación del receptor
// 			.ele('cbc:EndpointID', { schemeID: '13' }).txt('22222222').up()
// 			.ele('cac:PartyLegalEntity')
// 			.ele('cbc:RegistrationName').txt('Consumidor Final').up()
// 			.ele('cbc:CompanyID').txt('22222222').up()
// 			.ele('cac:RegistrationAddress')
// 				.ele('cbc:CityName').txt('Medellín').up()
// 				.ele('cbc:CountrySubentity').txt('Antioquia').up()
// 				.ele('cac:AddressLine')
// 				.ele('cbc:Line').txt('Carrera 89 # 12-34').up()
// 				.up()
// 			.up()
// 			.up()
// 		.up()
// 		.up()
		
// 		// Detalle de la factura: Líneas de productos o servicios
// 		.ele('cac:InvoiceLine')
// 		.ele('cbc:ID').txt('1').up()
// 		.ele('cbc:InvoicedQuantity', { unitCode: 'EA' }).txt('10').up()
// 		.ele('cbc:LineExtensionAmount', { currencyID: 'COP' }).txt('100000').up()
// 		.ele('cac:Item')
// 			.ele('cbc:Description').txt('Producto A').up()
// 		.up()
// 		.ele('cac:Price')
// 			.ele('cbc:PriceAmount', { currencyID: 'COP' }).txt('10000').up()
// 		.up()
// 		.up()
		
// 		// Totales de impuestos para la factura
// 		.ele('cac:TaxTotal')
// 		.ele('cbc:TaxAmount', { currencyID: 'COP' }).txt('19000').up()
// 		.ele('cac:TaxSubtotal')
// 			.ele('cbc:TaxableAmount', { currencyID: 'COP' }).txt('100000').up()
// 			.ele('cbc:TaxAmount', { currencyID: 'COP' }).txt('19000').up()
// 			.ele('cac:TaxCategory')
// 			.ele('cbc:ID').txt('01').up()
// 			.ele('cac:TaxScheme')
// 				.ele('cbc:ID').txt('01').up()
// 			.up()
// 			.up()
// 		.up()
// 		.up()
		
// 	.end({ prettyPrint: true });

// 	// Visualización del XML generado
// 	return invoiceXML;


// }

function firmarXML(xmlSinFirmar) {
	try {
	  console.log("XML recibido para firmar:", xmlSinFirmar);
  
	  // 1. Cargar y procesar el archivo P12
	  const p12Buffer = fs.readFileSync('uploads/p12/firma.p12');
	  const p12Asn1 = forge.asn1.fromDer(forge.util.createBuffer(p12Buffer).getBytes());
	  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, 'Abcd.1234');
  
	  // 2. Extraer clave privada y certificado
	  let keyPem, certPem;
		for (const safeContent of p12.safeContents) {
			for (const safeBag of safeContent.safeBags) {
				if (!keyPem && safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag && safeBag.key) {
					keyPem = forge.pki.privateKeyToPem(safeBag.key);
				} else if (!certPem && safeBag.type === forge.pki.oids.certBag && safeBag.cert) {
					certPem = forge.pki.certificateToPem(safeBag.cert);
				}
			}
		}
  
	  if (!keyPem || !certPem) {
		throw new Error('No se pudo extraer la clave privada o el certificado del archivo P12');
	  }
  
	  // 3. Crear la instancia para firmar el XML
	  const sig = new SignedXml({
		privateKey: keyPem,
		publicCert: certPem
	  });
  
	  sig.signingKey = keyPem;
  
	  // Configurar el keyInfoProvider
	  sig.keyInfoProvider = {
		getKeyInfo: () => {
		  const certClean = certPem
			.replace(/-----BEGIN CERTIFICATE-----/g, '')
			.replace(/-----END CERTIFICATE-----/g, '')
			.replace(/\r?\n|\r/g, '');
		  return `<X509Data><X509Certificate>${certClean}</X509Certificate></X509Data>`;
		}
	  };
  
	  // 4. Verificar si el nodo 'UBLExtension' existe antes de firmar
	  if (!xmlSinFirmar.match(/<[^>]*UBLExtension[^>]*>/)) {
		console.error("Advertencia: No se encontró el nodo 'UBLExtension'. Verifica el XML de entrada.");
	  }
  
	  // 5. Agregar referencia para firmar el nodo <UBLExtension>
	  sig.addReference({
		xpath: "//*[local-name()='ExtensionContent']",
		digestAlgorithm: "http://www.w3.org/2001/04/xmlenc#sha256",
		transforms: [
		  'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
		  'http://www.w3.org/2001/10/xml-exc-c14n#'
		]
	  });
  
	  sig.canonicalizationAlgorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
	  sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
  
	  // 6. Calcular la firma sobre el XML
	  sig.computeSignature(xmlSinFirmar);
  
	  // 7. Retornar XML firmado
	  return sig.getSignedXml();
	} catch (error) {
	  console.error("Error al firmar XML:", error.message);
	  throw error;
	}
  }

const firma = () => {

	// Leer el archivo .p12 (asegúrate de usar la ruta correcta)
	const p12Buffer = fs.readFileSync('uploads/p12/firma.p12');
	
	// Convertir el contenido a ASN.1
	const p12Asn1 = forge.asn1.fromDer(p12Buffer.toString('binary'));
	
	// Desempaquetar el certificado p12 (reemplaza 'tu-contraseña' por la contraseña real)
	const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, 'Abcd.1234');

	// Extraer la clave privada
	let privateKeyObj;
	p12.safeContents.forEach(safeContent => {
	safeContent.safeBags.forEach(safeBag => {
		if (safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag) {
		privateKeyObj = safeBag.key;
		}
	});
	});

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

	if (!privateKeyObj) {
	throw new Error('No se encontró la clave privada en el certificado .p12');
	}

	// Convertir la clave privada al formato PEM
	const privateKeyPem = forge.pki.privateKeyToPem(privateKeyObj);

	let data = {
		privateKeyPem,
		key,
		cert
	}

	return privateKeyPem;

}

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
	const extensionContentNode = doc.getElementsByTagName('UBLExtensions')[1];
	if (!extensionContentNode) {
		throw new Error("No se encontró el nodo 'ext:UBLExtensions' en el XML.");
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


// EXPORT
module.exports = {
    sendElectronica
};