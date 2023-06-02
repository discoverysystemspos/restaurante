const { response } = require('express');

const https = require("https");

const Invoice = require('../models/invoices.model');



const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));

/** =====================================================================
 *  CREATE DATA DATAICO
=========================================================================*/
const createInvoiceElectronic = async(req, res = response) => {

    try {

        const invoiceNew = req.body;

        const token = req.params.token;
        const factura = req.params.factura;
        const desde = Number(req.params.desde);
        const prefix = invoiceNew.invoice.numbering.prefix;
        const number = await Invoice.countDocuments({ electronica: true, prefix: prefix });

        invoiceNew.invoice.number = (number + 1) + desde;

        // POST DATAICO
        const response = await fetch(`https://api.dataico.com/dataico_api/v2/invoices`, {
            method: 'POST',
            body: JSON.stringify(invoiceNew),
            headers: {
                "auth-token": token,
            }
        }).catch(err => {
            console.log(err);
            res.json({
                ok: true,
                err
            });
        });

        const invoice = await response.json();
        await Invoice.findByIdAndUpdate(factura, { pdf_url: invoice.pdf_url, uuid: invoice.uuid, number: invoice.number, electronica: true, prefix: prefix }, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            invoice
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
    createInvoiceElectronic,
};