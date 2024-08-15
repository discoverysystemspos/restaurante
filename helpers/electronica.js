const soap = require('soap');
const { response } = require('express');

const Dsig = require('pkcs12-xml');
const fs = require('fs');
const forge = require('node-forge');
const { DOMParser } = require('xmldom');
const { SignedXml } = require('xml-crypto');

// MODELS
const Invoice = require('../models/invoices.model');
const Datos = require('../models/datos.model');
const Dataico = require('../models/dataico.model');


const { searchCity } = require('./searchCity');

const sendElectronica = async(invoice, res = response) => {

    const datos = await Datos.findOne({ status: true });
    const data = await Dataico.findOne();

    const { ciudad, departamento } = await searchCity(data.city, data.department);

    let dian = {
        id: '907d7c98-e72e-45ef-bb71-47d61c32b9ac',
        clave: 'fc8eac422eba16e22ffd8c6f94b3f40a6e38162c',
        test: '4e87ae6d-1b90-4f61-95a0-9dea876eac68',
        pin: '98765',
        url: 'https://vpfe-hab.dian.gov.co/WcfDianCustomerServices.svc?wsdl',
        fechaI: '3/14/2019',
        fechaT: '3/14/ 2019',
        prefijo: 'SETP',
        resolucion: '18760000001',
        cedual: '88243048',
        nit: '882430486',
        desde: '990000000',
        hasta: '995000000',
        fechaD: '2019-01-19',
        fechaH: '2030-01-19',
        number: '0001',
        fecha: invoice.fecha.toString()
    }

    let numberI = await Invoice.countDocuments({ prefix: dian.prefijo, send: true, electronica: true });

    numberI++;

    if (numberI > Number(dian.hasta)) {
        return { ok: false, msg: 'Ha llegado al limite de facturas en esta resolucion' };
    }

    dian.number = numberI.toString();

    let qrCode = `<QRCode>
						NroFactura=${dian.prefijo}${dian.number}
						NitFacturador=${dian.nit}
						NitAdquiriente=${invoice.client.cedula}
						FechaFactura=${dian.fecha}
						ValorTotalFactura=${invoice.amount}
						CUFE=941cf36af62dbbc06f105d2a80e9bfe683a90e84960eae4d351cc3afbe8f848c26c39bac4fbc80fa254824c6369ea694
						URL=https://catalogo-vpfe-hab.dian.gov.co/Document/FindDocument?documentKey=941cf36af62dbbc06f105d2a80e9bfe683a90e84960eae4d351cc3afbe8f848c26c39bac4fbc80fa254824c6369ea694&amp;partitionKey=co|06|94&amp;emissionDate=20190620
					</QRCode>`

    let firm = await firma();

    const url = 'https://vpfe-hab.dian.gov.co/WcfDianCustomerServices.svc?wsdl';
    const _headXML = headXML();
    const _ublExtentionXML = ublExtentionXML(firm, dian);
    const _versionXML = versionXML();
    const _accountingSuplierParty = accountingSuplierParty(datos, data, ciudad, departamento);
    const _accountingCustomerParty = accountingCustomerParty();
    const _payTotalLegal = payTotalLegal();
    const _totalTributos = totalTributos();
    const _invoiceLine = invoiceLine();
    const _footerXML = footerXML();

    let XML = `${_headXML.toString()}${_ublExtentionXML.toString()}${_versionXML.toString()}${_accountingSuplierParty.toString()}${_accountingCustomerParty.toString()}${_payTotalLegal.toString()}${_totalTributos.toString()}${_invoiceLine.toString()}${_footerXML.toString()}`

    // Escribir el archivo XML
    fs.writeFile('uploads/xml/signed.xml', XML, (err) => {
        if (err) {
            console.error('Error al escribir el archivo', err);
        } else {
            console.log('Archivo XML guardado con éxito');
        }
    });

    res.json({
        ok: true,
        msg: 'Archivo Firmado'
    });
    // Crear el cliente SOAP
    //  soap.createClient(url, (err, client) => {
    //      if (err) {
    //          console.error('Error al crear el cliente SOAP:', err);
    //          return;
    //      }

    //      // Llamar a un método del servicio SOAP
    //      client.exampleMethod({ xml: xmlData }, (err, result) => {
    //          if (err) {
    //              console.error('Error al llamar al método SOAP:', err);
    //              return;
    //          }

    //          console.log('Respuesta del servidor:', result);
    //      });
    //  });


};

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

const headXML = () => {
    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?><Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:sts="dian:gov:co:facturaelectronica:Structures-2-1" xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" xmlns:xades141="http://uri.etsi.org/01903/v1.4.1#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2     http://docs.oasis-open.org/ubl/os-UBL-2.1/xsd/maindoc/UBL-Invoice-2.1.xsd">`;
}

const ublExtentionXML = (firma, dian, qrCode) => {

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
								${dian.fechaD}
							</StartDate>
							<EndDate>
								${dian.fechaH}
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
						<ProviderID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="4" schemeName="31">
							${dian.nit}
						</ProviderID>
						<SoftwareID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)">
							${dian.id}
                  </SoftwareID>
               </SoftwareProvider>
               <SoftwareSecurityCode schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)">
						${dian.clave}
					</SoftwareSecurityCode>
					<AuthorizationProvider>
						<AuthorizationProviderID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="4" schemeName="31">
							${dian.nit}
						</AuthorizationProviderID>
					</AuthorizationProvider>

               ${qrCode}

				</DianExtensions>
			</ExtensionContent>
		</UBLExtension>

      ${firma}
		
	</UBLExtensions>`
}

const versionXML = () => {

    return `<cbc:UBLVersionID>UBL 2.1</cbc:UBLVersionID>
    <cbc:CustomizationID>05</cbc:CustomizationID>
    <cbc:ProfileID>DIAN 2.1</cbc:ProfileID>
    <cbc:ProfileExecutionID>2</cbc:ProfileExecutionID>
    <cbc:ID>${dian.prefijo}${dian.number}</cbc:ID>
    <cbc:UUID schemeID="2" schemeName="CUFE-SHA384">941cf36af62dbbc06f105d2a80e9bfe683a90e84960eae4d351cc3afbe8f848c26c39bac4fbc80fa254824c6369ea694</cbc:UUID>
    <cbc:IssueDate>2019-06-20</cbc:IssueDate>
    <cbc:IssueTime>09:15:23-05:00</cbc:IssueTime>
    <cbc:InvoiceTypeCode>01</cbc:InvoiceTypeCode>
    <cbc:Note>${dian.prefijo}${dian.number}${dian.fecha}:0012600.06012424.01040.00030.0014024.07900508908900108281fc8eac422eba16e22ffd8c6f94b3f40a6e38162c2</cbc:Note>
    <cbc:DocumentCurrencyCode listAgencyID="6" listAgencyName="United Nations Economic Commission for Europe" listID="ISO 4217 Alpha">COP</cbc:DocumentCurrencyCode>
    <cbc:LineCountNumeric>2</cbc:LineCountNumeric>

    <cac:InvoicePeriod>
      <cbc:StartDate>${dian.fechaD}</cbc:StartDate>
      <cbc:EndDate>${dian.fechaH}</cbc:EndDate>
   </cac:InvoicePeriod>`;
}

const accountingSuplierParty = (datos, data, ciudad, departamento) => {

    return `<cac:AccountingSupplierParty>
    <cbc:AdditionalAccountID>1</cbc:AdditionalAccountID>
    <cac:Party>
       <cac:PartyName>
          <cbc:Name>${datos.name}</cbc:Name>
       </cac:PartyName>
       <cac:PartyName>
          <cbc:Name>${datos.name}</cbc:Name>
       </cac:PartyName>
       <cac:PartyName>
          <cbc:Name>DIAN</cbc:Name>
       </cac:PartyName>
       <cac:PhysicalLocation>
          <cac:Address>
             <cbc:ID>${data.department}${data.city}</cbc:ID>
             <cbc:CityName>${ciudad} </cbc:CityName>
             <cbc:CountrySubentity>${departamento}</cbc:CountrySubentity>
             <cbc:CountrySubentityCode>${data.department}</cbc:CountrySubentityCode>
             <cac:AddressLine>
                <cbc:Line> ${datos.address}</cbc:Line>
             </cac:AddressLine>
             <cac:Country>
                <cbc:IdentificationCode>CO</cbc:IdentificationCode>
                <cbc:Name languageID="es">Colombia</cbc:Name>
             </cac:Country>
          </cac:Address>
       </cac:PhysicalLocation>

       <cac:PartyTaxScheme>
          <cbc:RegistrationName>${datos.name}</cbc:RegistrationName>
          <cbc:CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="4" schemeName="31">800197268</cbc:CompanyID>
          <cbc:TaxLevelCode listName="05">O-99</cbc:TaxLevelCode>
          <cac:RegistrationAddress>
             <cbc:ID>11001</cbc:ID>
             <cbc:CityName>Bogotá, D.c. </cbc:CityName>
             <cbc:CountrySubentity>Bogotá</cbc:CountrySubentity>
             <cbc:CountrySubentityCode>11</cbc:CountrySubentityCode>
             <cac:AddressLine>
                <cbc:Line>Av. Jiménez #7 - 13</cbc:Line>
             </cac:AddressLine>
             <cac:Country>
                <cbc:IdentificationCode>CO</cbc:IdentificationCode>
                <cbc:Name languageID="es">Colombia</cbc:Name>
             </cac:Country>
          </cac:RegistrationAddress>
          <cac:TaxScheme>
             <cbc:ID>01</cbc:ID>
             <cbc:Name>IVA</cbc:Name>
          </cac:TaxScheme>
       </cac:PartyTaxScheme>
       <cac:PartyLegalEntity>
          <cbc:RegistrationName>DIAN</cbc:RegistrationName>
          <cbc:CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="9" schemeName="31">800197268</cbc:CompanyID>
          <cac:CorporateRegistrationScheme>
             <cbc:ID>SETP</cbc:ID>
             <cbc:Name>10181</cbc:Name>
          </cac:CorporateRegistrationScheme>
       </cac:PartyLegalEntity>
       <cac:Contact>
          <cbc:Name>Eric Valencia</cbc:Name>
          <cbc:Telephone>6111111</cbc:Telephone>
          <cbc:ElectronicMail>eric.valencia@ket.co</cbc:ElectronicMail>
          <cbc:Note>Test descripcion contacto</cbc:Note>
       </cac:Contact>
    </cac:Party>
 </cac:AccountingSupplierParty>`

}

const accountingCustomerParty = () => {

    return `<cac:AccountingCustomerParty>
    <cbc:AdditionalAccountID>1</cbc:AdditionalAccountID>
    <cac:Party>

       <cac:PartyName>
          <cbc:Name>OPTICAS GMO COLOMBIA S A S</cbc:Name>
       </cac:PartyName>

       <cac:PhysicalLocation>
          <cac:Address>
             <cbc:ID>11001</cbc:ID>
             <cbc:CityName>Bogotá, D.c. </cbc:CityName>
             <cbc:CountrySubentity>Bogotá</cbc:CountrySubentity>
             <cbc:CountrySubentityCode>11</cbc:CountrySubentityCode>
             <cac:AddressLine>
                <cbc:Line>CARRERA 8 No 20-14/40</cbc:Line>
             </cac:AddressLine>
             <cac:Country>
                <cbc:IdentificationCode>CO</cbc:IdentificationCode>
                <cbc:Name languageID="es">Colombia</cbc:Name>
             </cac:Country>
          </cac:Address>
       </cac:PhysicalLocation>

       <cac:PartyTaxScheme>
          <cbc:RegistrationName>OPTICAS GMO COLOMBIA S A S</cbc:RegistrationName>
          <cbc:CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="3" schemeName="31">900108281</cbc:CompanyID>
          <cbc:TaxLevelCode listName="04">O-99</cbc:TaxLevelCode>
          <cac:RegistrationAddress>
             <cbc:ID>11001</cbc:ID>
             <cbc:CityName>Bogotá, D.c. </cbc:CityName>
             <cbc:CountrySubentity>Bogotá</cbc:CountrySubentity>
             <cbc:CountrySubentityCode>11</cbc:CountrySubentityCode>
             <cac:AddressLine>
                <cbc:Line>CR 9 A N0 99 - 07 OF 802</cbc:Line>
             </cac:AddressLine>
             <cac:Country>
                <cbc:IdentificationCode>CO</cbc:IdentificationCode>
                <cbc:Name languageID="es">Colombia</cbc:Name>
             </cac:Country>
          </cac:RegistrationAddress>
          <cac:TaxScheme>
             <cbc:ID>01</cbc:ID>
             <cbc:Name>IVA</cbc:Name>
          </cac:TaxScheme>
       </cac:PartyTaxScheme>
       <cac:PartyLegalEntity>
          <cbc:RegistrationName>OPTICAS GMO COLOMBIA S A S</cbc:RegistrationName>
          <cbc:CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="3" schemeName="31">900108281</cbc:CompanyID>
          <cac:CorporateRegistrationScheme>
             <cbc:Name>90518</cbc:Name>
          </cac:CorporateRegistrationScheme>
       </cac:PartyLegalEntity>
       <cac:Contact>
          <cbc:Name>Diana Cruz</cbc:Name>
          <cbc:Telephone>31031031089</cbc:Telephone>
          <cbc:ElectronicMail>dcruz@empresa.org</cbc:ElectronicMail>
       </cac:Contact>
    </cac:Party>
 </cac:AccountingCustomerParty>`

}

const payTotalLegal = () => {

    return `<cac:TaxRepresentativeParty>
    <cac:PartyIdentification>
       <cbc:ID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="4" schemeName="31">989123123</cbc:ID>
    </cac:PartyIdentification>
 </cac:TaxRepresentativeParty>

 <cac:Delivery>
    <cac:DeliveryAddress>
       <cbc:ID>11001</cbc:ID>
       <cbc:CityName>Bogotá, D.c. </cbc:CityName>
       <cbc:CountrySubentity>Bogotá, D.c. 11</cbc:CountrySubentity>
       <cbc:CountrySubentityCode>11</cbc:CountrySubentityCode>
       <cac:AddressLine>
          <cbc:Line>CARRERA 8 No 20-14/40</cbc:Line>
       </cac:AddressLine>
       <cac:Country>
          <cbc:IdentificationCode>CO</cbc:IdentificationCode>
          <cbc:Name languageID="es">Colombia</cbc:Name>
       </cac:Country>
    </cac:DeliveryAddress>
    <cac:DeliveryParty>
       <cac:PartyName>
          <cbc:Name>Empresa de transporte</cbc:Name>
       </cac:PartyName>
       <cac:PhysicalLocation>
          <cac:Address>
             <cbc:ID>11001</cbc:ID>
             <cbc:CityName>Bogotá, D.c. </cbc:CityName>
             <cbc:CountrySubentity>Bogotá</cbc:CountrySubentity>
             <cbc:CountrySubentityCode>11</cbc:CountrySubentityCode>
             <cac:AddressLine>
                <cbc:Line>Av.  #17 - 193</cbc:Line>
             </cac:AddressLine>
             <cac:Country>
                <cbc:IdentificationCode>CO</cbc:IdentificationCode>
                <cbc:Name languageID="es">Colombia</cbc:Name>
             </cac:Country>
          </cac:Address>
       </cac:PhysicalLocation>
       <cac:PartyTaxScheme>
          <cbc:RegistrationName>Empresa de transporte</cbc:RegistrationName>
          <cbc:CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="1" schemeName="31">981223983</cbc:CompanyID>
          <cbc:TaxLevelCode listName="04">O-99</cbc:TaxLevelCode>
          <cac:TaxScheme>
             <cbc:ID>01</cbc:ID>
             <cbc:Name>IVA</cbc:Name>
          </cac:TaxScheme>
       </cac:PartyTaxScheme>
       <cac:PartyLegalEntity>
          <cbc:RegistrationName>Empresa de transporte</cbc:RegistrationName>
          <cbc:CompanyID schemeAgencyID="195" schemeAgencyName="CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)" schemeID="1" schemeName="31">981223983</cbc:CompanyID>
          <cac:CorporateRegistrationScheme>
             <cbc:Name>75433</cbc:Name>
          </cac:CorporateRegistrationScheme>
       </cac:PartyLegalEntity>
       <cac:Contact>
          <cbc:Name>Eric Van Boxsom</cbc:Name>
          <cbc:Telephone>9712311</cbc:Telephone>
          <cbc:Telefax>12431241</cbc:Telefax>
          <cbc:ElectronicMail>eric.vanboxsom@gosocket.net</cbc:ElectronicMail>
          <cbc:Note>Test descripcion contacto</cbc:Note>
       </cac:Contact>
    </cac:DeliveryParty>
 </cac:Delivery>
 
 <cac:DeliveryTerms>
    <cbc:SpecialTerms>Portes Pagados</cbc:SpecialTerms>
    <cbc:LossRiskResponsibilityCode>CFR</cbc:LossRiskResponsibilityCode>
    <cbc:LossRisk>Costo y Flete</cbc:LossRisk>
 </cac:DeliveryTerms>
 
 <cac:PaymentMeans>
    <cbc:ID>2</cbc:ID>
    <cbc:PaymentMeansCode>41</cbc:PaymentMeansCode>
    <cbc:PaymentDueDate>2019-06-30</cbc:PaymentDueDate>
    <cbc:PaymentID>1234</cbc:PaymentID>
 </cac:PaymentMeans>

 <cac:PrepaidPayment>
    <cbc:ID>SFR3123856</cbc:ID>
    <cbc:PaidAmount currencyID="COP">1000.00</cbc:PaidAmount>
    <cbc:ReceivedDate>2018-09-29</cbc:ReceivedDate>
    <cbc:PaidDate>2018-09-29</cbc:PaidDate>
    <cbc:InstructionID>Prepago recibido</cbc:InstructionID>
 </cac:PrepaidPayment>`

}

const totalTributos = () => {

    return `<cac:TaxTotal>      
    <cbc:TaxAmount currencyID="COP">2424.01</cbc:TaxAmount>
    <cac:TaxSubtotal>
       <cbc:TaxableAmount currencyID="COP">12600.06</cbc:TaxableAmount>
       <cbc:TaxAmount currencyID="COP">2394.01</cbc:TaxAmount>
       <cac:TaxCategory>
          <cbc:Percent>19.00</cbc:Percent>
          <cac:TaxScheme>
             <cbc:ID>01</cbc:ID>
             <cbc:Name>IVA</cbc:Name>
          </cac:TaxScheme>
       </cac:TaxCategory>
    </cac:TaxSubtotal>

    <cac:TaxSubtotal>
       <cbc:TaxableAmount currencyID="COP">187.50</cbc:TaxableAmount>
       <cbc:TaxAmount currencyID="COP">30.00</cbc:TaxAmount>
       <cac:TaxCategory>
          <cbc:Percent>16.00</cbc:Percent>
          <cac:TaxScheme>
             <cbc:ID>01</cbc:ID>
             <cbc:Name>IVA</cbc:Name>
          </cac:TaxScheme>
       </cac:TaxCategory>
    </cac:TaxSubtotal>

 </cac:TaxTotal>

 <cac:TaxTotal>
    
    <cbc:TaxAmount currencyID="COP">0.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
       <cbc:TaxableAmount currencyID="COP">0.00</cbc:TaxableAmount>
       <cbc:TaxAmount currencyID="COP">0.00</cbc:TaxAmount>
       <cac:TaxCategory>
          <cbc:Percent>0.00</cbc:Percent>
          <cac:TaxScheme>
             <cbc:ID>03</cbc:ID>
             <cbc:Name>ICA</cbc:Name>
          </cac:TaxScheme>
       </cac:TaxCategory>
    </cac:TaxSubtotal>

 </cac:TaxTotal>

 <cac:TaxTotal>
    
    <cbc:TaxAmount currencyID="COP">0.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
       <cbc:TaxableAmount currencyID="COP">0.00</cbc:TaxableAmount>
       <cbc:TaxAmount currencyID="COP">0.00</cbc:TaxAmount>
       <cac:TaxCategory>
          <cbc:Percent>0.00</cbc:Percent>
          <cac:TaxScheme>
             <cbc:ID>04</cbc:ID>
             <cbc:Name>INC</cbc:Name>
          </cac:TaxScheme>
       </cac:TaxCategory>
    </cac:TaxSubtotal>

 </cac:TaxTotal>`

}

const invoiceLine = () => {

    return `<cac:InvoiceLine>
      <cbc:ID>1</cbc:ID>
      <cbc:InvoicedQuantity unitCode="EA">1.000000</cbc:InvoicedQuantity>
      <cbc:LineExtensionAmount currencyID="COP">12600.06</cbc:LineExtensionAmount>
      <cbc:FreeOfChargeIndicator>false</cbc:FreeOfChargeIndicator>

      <cac:Delivery>
         <cac:DeliveryLocation>
            <cbc:ID schemeID="999" schemeName="EAN">613124312412</cbc:ID>
         </cac:DeliveryLocation>
      </cac:Delivery>

      <cac:AllowanceCharge>
         <cbc:ID>1</cbc:ID>
         <cbc:ChargeIndicator>false</cbc:ChargeIndicator>
         <cbc:AllowanceChargeReason>Descuento por cliente frecuente</cbc:AllowanceChargeReason>
         <cbc:MultiplierFactorNumeric>33.33</cbc:MultiplierFactorNumeric>
         <cbc:Amount currencyID="COP">6299.94</cbc:Amount>
         <cbc:BaseAmount currencyID="COP">18900.00</cbc:BaseAmount>
      </cac:AllowanceCharge>

      <cac:TaxTotal>
         <cbc:TaxAmount currencyID="COP">2394.01</cbc:TaxAmount>
         <cac:TaxSubtotal>
            <cbc:TaxableAmount currencyID="COP">12600.06</cbc:TaxableAmount>
            <cbc:TaxAmount currencyID="COP">2394.01</cbc:TaxAmount>
            <cac:TaxCategory>
               <cbc:Percent>19.00</cbc:Percent>
               <cac:TaxScheme>
                  <cbc:ID>01</cbc:ID>
                  <cbc:Name>IVA</cbc:Name>
               </cac:TaxScheme>
            </cac:TaxCategory>
         </cac:TaxSubtotal>
      </cac:TaxTotal>
      <cac:Item>
         <cbc:Description>AV OASYS -2.25 (8.4) LENTE DE CONTATO</cbc:Description>
         <cac:SellersItemIdentification>
            <cbc:ID>AOHV84-225</cbc:ID>
         </cac:SellersItemIdentification>
         <cac:AdditionalItemIdentification>
            <cbc:ID schemeID="999" schemeName="EAN13">6543542313534</cbc:ID>
         </cac:AdditionalItemIdentification>
      </cac:Item>
      <cac:Price>
         <cbc:PriceAmount currencyID="COP">18900.00</cbc:PriceAmount>
         <cbc:BaseQuantity unitCode="EA">1.000000</cbc:BaseQuantity>
      </cac:Price>
   </cac:InvoiceLine>
   <cac:InvoiceLine>
      <cbc:ID>2</cbc:ID>
      <cbc:InvoicedQuantity unitCode="NIU">1.000000</cbc:InvoicedQuantity>
      <cbc:LineExtensionAmount currencyID="COP">0.00</cbc:LineExtensionAmount>
      <cbc:FreeOfChargeIndicator>true</cbc:FreeOfChargeIndicator>
      <cac:DocumentReference>
         <cbc:ID>TST1543623</cbc:ID>
         <cbc:IssueDate>2019-03-02</cbc:IssueDate>
         <cbc:DocumentTypeCode>1001-A</cbc:DocumentTypeCode>
         <cbc:DocumentType>Bienes Propios</cbc:DocumentType>
      </cac:DocumentReference>
      <cac:DocumentReference>
         <cbc:ID>GR8713461</cbc:ID>
         <cbc:IssueDate>2019-03-02</cbc:IssueDate>
         <cbc:DocumentTypeCode>AR</cbc:DocumentTypeCode>
      </cac:DocumentReference>
      <cac:PricingReference>
         <cac:AlternativeConditionPrice>
            <cbc:PriceAmount currencyID="COP">100.00</cbc:PriceAmount>
            <cbc:PriceTypeCode>03</cbc:PriceTypeCode>
            <cbc:PriceType>Otro valor</cbc:PriceType>
         </cac:AlternativeConditionPrice>
      </cac:PricingReference>
      <cac:Delivery>
         <cac:DeliveryLocation>
            <cbc:ID schemeID="999" schemeName="EAN">613124312412</cbc:ID>
         </cac:DeliveryLocation>
      </cac:Delivery>
      <cac:TaxTotal>
         <cbc:TaxAmount currencyID="COP">30.00</cbc:TaxAmount>
         <cac:TaxSubtotal>
            <cbc:TaxableAmount currencyID="COP">187.50</cbc:TaxableAmount>
            <cbc:TaxAmount currencyID="COP">30.00</cbc:TaxAmount>
            <cac:TaxCategory>
               <cbc:Percent>16.00</cbc:Percent>
               <cac:TaxScheme>
                  <cbc:ID>01</cbc:ID>
                  <cbc:Name>IVA</cbc:Name>
               </cac:TaxScheme>
            </cac:TaxCategory>
         </cac:TaxSubtotal>
      </cac:TaxTotal>
      <cac:Item>
         <cbc:Description>Bolsa</cbc:Description>
         <cac:SellersItemIdentification>
            <cbc:ID>91412012412</cbc:ID>
         </cac:SellersItemIdentification>
         <cac:StandardItemIdentification>
            <cbc:ID schemeAgencyID="10" schemeID="001" schemeName="UNSPSC">18937100-7</cbc:ID>
         </cac:StandardItemIdentification>
      </cac:Item>
      <cac:Price>
         <cbc:PriceAmount currencyID="COP">0.00</cbc:PriceAmount>
         <cbc:BaseQuantity unitCode="NIU">1.000000</cbc:BaseQuantity>
      </cac:Price>
   </cac:InvoiceLine>`

}

const footerXML = () => { return "</Invoice>" }

// EXPORT
module.exports = {
    sendElectronica
};