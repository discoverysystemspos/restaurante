const { response } = require('express');

// HERLPERS
const { soldProduct, returnStock } = require('./products-stock');

// MODELS
const Invoice = require('../models/invoices.model');

/** =====================================================================
 *  CREATE INVOICE ONLINE
=========================================================================*/
const createInvoiceOnline = async(pedido) => {

    const user = req.uid;
    const turno = req.params.turno;

    try {

        const invoice = new Invoice(req.body);

        invoice.user = user;

        await invoice.save();

        soldProduct(invoice.products, invoice.invoice, user, invoice);

        const invoiceNew = await Invoice.findById(invoice._id)
            .populate('client', 'name cedula phone email address city tip')
            .populate('products.product', 'name code type')
            .populate('mesero', 'name')
            .populate('mesa', 'name')
            .populate('user', 'name');

        res.json({
            ok: true,
            invoice: invoiceNew
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });

    }

};

// EXPORTS
module.exports = {
    createInvoiceOnline
}