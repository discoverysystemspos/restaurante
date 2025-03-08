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

    numberI = 990000000;

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

	const { clave, certificado } = await extraerCertificadoYClave('uploads/p12/firma.p12', 'Abcd.1234');  

	let xml = await generarFacturaUBL(invoice, dian, datos);
	const xmlFirmado = firmarXML(xml, certificado, clave);

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

const extraerCertificadoYClave = async (rutaP12, password)  => {
	try {

		// Leer el archivo P12 como buffer
		const p12Buffer = await fs.readFileSync(rutaP12);		

		// Convertir el buffer a una cadena binaria para node-forge
		const p12Asn1 = forge.asn1.fromDer(p12Buffer.toString('binary'));
		// Procesar el archivo P12 usando la contraseña proporcionada
		const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password);
	
		let keyPem, certPem;
		// Recorrer los safeContents para extraer la clave y el certificado
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

		let certificado = certPem.replace(/-----BEGIN CERTIFICATE-----|-----END CERTIFICATE-----|\n/g, '')
	
		return { 
			clave: keyPem, 
			certificado : certificado.trim()
		};
		
	} catch (error) {
		console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
	}
}

function generarFacturaUBL(factura, dian, datos) {
    const xml = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('Invoice', { xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2' })
            .ele('ID').txt(dian.number).up()
            .ele('IssueDate').txt(dian.fecha).up()
            .ele('AccountingSupplierParty')
                .ele('Party')
                    .ele('PartyName')
                        .ele('Name').txt(datos.name).up()
                    .up()
                .up()
            .up()
            .ele('AccountingCustomerParty')
                .ele('Party')
                    .ele('PartyName')
                        .ele('Name').txt('Consumidor Final').up()
                    .up()
                .up()
            .up()
            .ele('LegalMonetaryTotal')
                .ele('LineExtensionAmount', { currencyID: 'COP' }).txt(factura.amount).up()
            .up()
        .end({ prettyPrint: true });

    return xml;
}

function firmarXML(xml, certificado, clavePrivada) {
    const doc = new DOMParser().parseFromString(xml);
    const signature = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('Signature', { xmlns: 'http://www.w3.org/2000/09/xmldsig#' })
            .ele('SignedInfo')
                .ele('CanonicalizationMethod', { Algorithm: 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315' }).up()
                .ele('SignatureMethod', { Algorithm: 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256' }).up()
                .ele('Reference', { URI: '' })
                    .ele('DigestMethod', { Algorithm: 'http://www.w3.org/2001/04/xmlenc#sha256' }).up()
                    .ele('DigestValue').txt(crypto.createHash('sha256').update(xml).digest('base64')).up()
                .up()
            .up()
            .ele('SignatureValue').txt('...').up()
            .ele('KeyInfo')
                .ele('X509Data')
                    .ele('X509Certificate').txt(certificado).up()
                .up()
            .up()
        .end({ prettyPrint: true });

    const signatureNode = new DOMParser().parseFromString(signature).documentElement;
    doc.documentElement.appendChild(signatureNode);

    return doc.toString();
}


// EXPORT
module.exports = {
    sendElectronica
};