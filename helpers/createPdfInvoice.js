const path = require('path');
const fs = require("fs");
const PDFDocument = require("pdfkit");

// layout: 'landscape'

function createInvoicePDF(invoice, empresa, path) {
    let doc = new PDFDocument({ size: "A4" });

    generateHeader(doc, empresa);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    // generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc, empresa) {
    if (empresa.logo) {

        doc
            .image(path.join(__dirname, `../uploads/logo/${empresa.logo}`), 50, 45, { width: 80 })
            .fontSize(10)
            .text(empresa.name, 200, 50, { align: "right" })
            .text(empresa.nit, 200, 65, { align: "right" })
            .text(empresa.address, 200, 80, { align: "right" })
            .text(empresa.phone, 200, 95, { align: "right" })
    } else {
        doc
            .fillColor("#444444")
            .fontSize(20)
            .text(empresa.name, 110, 57)
            .fontSize(10)
            .text(empresa.nit, 200, 65, { align: "right" })
            .text(empresa.address, 200, 80, { align: "right" })
            .text(empresa.phone, 200, 95, { align: "right" })

    }

    if (!empresa.impuesto) {
        doc
            .fontSize(10)
            .text('No responsable de IVA', { align: "right" })

    } else {

        if (empresa.responsable) {
            doc
                .fontSize(10)
                .text('Responsable de iva', { align: "right" })

        } else if (empresa.impuestoconsumo) {
            doc
                .fontSize(10)
                .text('Responsable nacional al consumo', { align: "right" })

        }
        doc
            .fontSize(10)
            .text(`Resolucion: ${empresa.resolucion}`, { align: "right" })
            .text(`Prefijo Pos: ${empresa.prefijopos}`, { align: "right" })


    }

}

function generateCustomerInformation(doc, invoice) {

    const customerInformationTop = 150;

    doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("# " + invoice.invoice, 50, customerInformationTop)
        .font("Helvetica")
        .text("Fecha:", 50, customerInformationTop + 15)
        .text(formatDate(new Date(invoice.fecha)), 150, customerInformationTop + 15)
        .text("Vendedor:", 50, customerInformationTop + 30)
        .text(invoice.mesero.name, 150, customerInformationTop + 30)
        .font("Helvetica-Bold")
        .text(`${invoice.client.name}`, 300, customerInformationTop)
        .font("Helvetica")
        .text(`${invoice.client.address}`, 300, customerInformationTop + 15)
        .text(
            invoice.client.city +
            ", " +
            invoice.client.department,
            300,
            customerInformationTop + 30
        )
        .moveDown();

    generateHr(doc, 215);
}

function generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 220;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Codigo",
        "Descripcion",
        "Cant",
        "Precio U",
        "IVA",
        "Val IVA",
        "Total"
    );
    generateHr(doc, invoiceTableTop + 10);
    doc.font("Helvetica");

    for (i = 0; i < invoice.products.length; i++) {
        const item = invoice.products[i];
        const position = invoiceTableTop + (i + 1) * 25;

        let valorIva = 0;
        if (item.product.tax) {
            valorIva = item.product.taxid.valor;
        }

        generateTableRow(
            doc,
            position,
            item.product.code,
            item.product.name,
            item.qty,
            formatCurrency(item.price),
            `${valorIva}%`,
            formatCurrency((valorIva) / 100),
            formatCurrency((item.price + (valorIva) / 100) * item.qty)
        );

        generateHr(doc, position + 15);
    }

    const subtotalPosition = invoiceTableTop + (i + 1) * 25;
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "",
        "",
        "Subtotal",
        "",
        formatCurrency(invoice.base)
    );

    const paidToDatePosition = subtotalPosition + 18;
    generateTableRow(
        doc,
        paidToDatePosition,
        "",
        "",
        "",
        "",
        "IVA",
        "",
        formatCurrency(invoice.iva)
    );

    const duePositionN = subtotalPosition + 31;
    generateTableRow(
        doc,
        duePositionN,
        "",
        "",
        "",
        "",
        "Total",
        "",
        formatCurrency(invoice.amount)
    );
    doc.font("Helvetica");
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Payment is due within 15 days. Thank you for your business.",
            50,
            780, { align: "center", width: 500 }
        );
}

function generateTableRow(
    doc,
    y,
    Codigo,
    Descripcion,
    Cant,
    Precio,
    IVA,
    Val,
    Total,
) {
    doc
        .fontSize(6)
        .text(Codigo, 50, y)
        .fontSize(8)
        .text(Descripcion, 110, y)
        .text(Cant, 320, y)
        .text(Precio, 350, y)
        .text(`${IVA}`, 400, y)
        .text(Val, 430, y)
        .text(Total, 0, y, { align: "right" });
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(530, y)
        .stroke();
}

function formatCurrency(cents) {
    return "$" + (cents).toFixed(0);
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return day + "/" + month + "/" + year;
}

module.exports = {
    createInvoicePDF
};