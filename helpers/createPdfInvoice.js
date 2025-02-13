const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

const fonts = {
    Roboto: {
        normal: path.join(__dirname, 'fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, 'fonts/Roboto-Bold.ttf'),
        italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, 'fonts/Roboto-BoldItalic.ttf')
    }
};

const printer = new PdfPrinter(fonts);

function createInvoicePDF(invoice, empresa, filePath) {

    let departamento_ciudad = '';

    if (invoice.client) {
        departamento_ciudad = `${(invoice.client.city)? invoice.client.city : ''} ${(invoice.client.city && invoice.client.department)? ' - ': ''}  ${(invoice.client.department)? invoice.client.department : ''}`
    }

    const docDefinition = {
        content: [
            // Encabezado con logo e información de la empresa
            {
                // Logo centrado
                columns: [
                    { text: '', width: '*' },
                    {
                        image: path.join(__dirname, `../uploads/logo/${empresa.logo}`),
                        width: 75,
                        alignment: 'center'
                    },
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
                    { text: '', width: '50%' },
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
                margin: [0, 0, 0, 0]
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

function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}

function formatDate(date) {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

module.exports = { createInvoicePDF };
