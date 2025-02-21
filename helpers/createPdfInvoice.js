const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const fonts = {
    Roboto: {
        normal: path.join(__dirname, 'fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, 'fonts/Roboto-Bold.ttf'),
        italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, 'fonts/Roboto-BoldItalic.ttf')
    }
};

const printer = new PdfPrinter(fonts);

async function createInvoicePDF(invoice, empresa, filePath) {

    let logoBase64 = null;
    let totalPagos = 0;

    for (const paid of invoice.payments) {
        totalPagos += paid.amount;        
    }

    for (const paid of invoice.paymentsCredit) {
        totalPagos += paid.amount;        
    }

    if (empresa.logo) {
        logoBase64 = await convertWebPToBase64(path.join(__dirname, `../uploads/logo/${empresa.logo}`));        
    }

    let departamento_ciudad = '';

    if (invoice.client) {
        departamento_ciudad = `${(invoice.client.city)? invoice.client.city : ''} ${(invoice.client.city && invoice.client.department)? ' - ': ''}  ${(invoice.client.department)? invoice.client.department : ''}`
    }

    const docDefinition = {
        content: [
            // Encabezado con logo e información de la empresa
            {
                columns: [
                    { text: '', width: '*' },
                    logoBase64
                        ? { image: logoBase64, width: 100, alignment: 'center' }
                        : { text: '', width: '20%' }, // Si no hay logo, se mantiene el formato
                    { text: '', width: '*' }
                ],
                margin: [0, 0, 0, 20]
            },
            {
                columns: [
                    {
                        text: [
                            { text: 'Cliente: ', bold: true }, invoice.client ? invoice.client.name : 'Consumidor Final', '\n',
                            { text: 'Nit/CC: ', bold: true }, invoice.client ? invoice.client.cedula : '22222222', '\n',
                            { text: 'Telefono: ', bold: true }, invoice.client ? invoice.client.phone : '', '\n',
                            { text: 'Dirección: ', bold: true }, invoice.client ? invoice.client.address : empresa.address, '\n',
                            departamento_ciudad,'\n',
                        ],
                        width: '50%'
                    },
                    {
                        alignment: 'right',
                        width: '50%',
                        stack: [
                            { text: empresa.name, bold: true },
                            empresa.header
                        ].filter(Boolean) // Elimina valores nulos
                    }
                ],
                margin: [0, 0, 0, 10]
            },
            
            // Número de factura y Fecha
            {
                columns: [
                    { text: `Factura # ${invoice.invoice}`, style: 'header'},
                    { 
                        alignment: 'right',
                        width: '50%',
                        text: [
                            {text: `Fecha:`, bold: true}, `${formatDate(invoice.fecha) }` 
                        ],
                        
                    }                 
                ],
                margin: [0, 0, 0, 2]
            },
            // { text: `Factura # ${invoice.invoice}`, style: 'header' },
            // { text: `Fecha: ${formatDate(invoice.fecha)}`, margin: [0, 0, 0, 5] },
            
            // Tabla de productos
            {
                table: {
                    widths: ['15%', '35%', '10%', '15%', '10%', '15%'],
                    body: [
                        [{ text: 'Código', bold: true }, { text: 'Descripción', bold: true }, { text: 'Cant.', bold: true },
                         { text: 'Precio U', bold: true }, { text: 'IVA', bold: true }, { text: 'Total', bold: true }],
                        ...invoice.products.map(item => [
                            item.product.code,
                            item.product.name,
                            item.qty,
                            formatCurrency(item.price),
                            `${item.product.taxid ? item.product.taxid.valor : 0}%`,
                            formatCurrency(item.price * item.qty * (1 + (item.product.taxid ? item.product.taxid.valor / 100 : 0)))
                        ])
                    ]
                },
                margin: [0, 2, 0, 1]
            },
            
            // Totales
            {
                columns: [
                    { text: [
                            {text: `Nota: `, bold: true}, `${invoice.nota || 'Sin nota'}` 
                        ], 
                        width: '50%' 
                    },
                    {
                        table: {
                            widths: ['50%', '50%'],
                            body: [
                                [{ text: 'Subtotal', bold: true }, formatCurrency(invoice.base)],
                                [{ text: 'IVA', bold: true }, formatCurrency(invoice.iva)],
                                [{ text: 'Total', bold: true }, formatCurrency(invoice.amount)]
                            ]
                        },
                        alignment: 'right',
                        width: '50%'
                    }
                ],
                margin: [0, 0, 0, 20]
            },
            { text: [
                    {text: `Historial de pagos: `, bold: true} 
                ], 
                width: '50%' 
            },
            {
                table: {
                    widths: ['30%', '30%', '40%'],
                    body: [
                        [{ text: 'Descripcion', bold: true }, { text: 'Tipo', bold: true }, { text: 'Monto', bold: true }],
                        ...invoice.payments.map(paid => [
                            paid.description || 'Sin descripción',
                            paid.type,
                            formatCurrency(paid.amount)
                        ]),
                        ...invoice.paymentsCredit.map(paid => [
                            `${paid.description || 'Sin descripción'} \n ${new Date(paid.fecha).getDate()}/${new Date(paid.fecha).getMonth() + 1 }/${new Date(paid.fecha).getFullYear()}`,
                            paid.type,
                            formatCurrency(paid.amount)
                        ]),
                        [{ text: '', bold: true }, { text: 'Resta', bold: true }, { text: formatCurrency((invoice.amount - totalPagos)) , bold: true }]
                    ]
                },
                margin: [0, 2, 0, 1]
            }
        ],
        styles: {
            header: {
                fontSize: 14,
                bold: true
            }
        }
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.end();
}

async function convertWebPToBase64(imagePath) {
    try {
        const buffer = await sharp(imagePath).toFormat('png').toBuffer();
        return `data:image/png;base64,${buffer.toString('base64')}`;
    } catch (error) {
        console.error('Error al convertir la imagen WebP a Base64:', error);
        return null;
    }
}

function formatCurrency(value) {
    value = Number(value);
    return `$${value.toFixed(2)}`;
}

function formatDate(date) {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

module.exports = { createInvoicePDF };
