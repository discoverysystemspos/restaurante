const { response } = require('express');

const https = require("https");

const Invoice = require('../models/invoices.model');
const Dataico = require('../models/dataico.model');



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

        const dataicoDB = await Dataico.find();
        const dataico = dataicoDB[0];

        invoiceNew.invoice.number = Number(dataico.hasta + 1).toString();

        // POST DATAICO
        const responseOne = await fetch(`https://api.dataico.com/dataico_api/v2/invoices`, {
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

        const invoiceOne = await responseOne.json();

        let numero = invoiceOne.errors[0]['error'].toString().split("'")[3];
        // let numero = error.split("'")[3]
        invoiceNew.invoice.number = numero;

        // OLD
        // const number = await Invoice.countDocuments({ electronica: true, prefix: prefix, send: true });
        // invoiceNew.invoice.number = (number + 1) + desde;

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

        const status = await response.status;
        const invoice = await response.json();

        if (Number(status) !== 201 || !invoice.cufe) {
            await Invoice.findByIdAndUpdate(factura, { electronica: true, send: false }, { new: true, useFindAndModify: false });
        } else {
            await Invoice.findByIdAndUpdate(factura, { pdf_url: invoice.pdf_url, cufe: invoice.cufe, uuid: invoice.uuid, number: invoice.number, electronica: true, prefix: prefix, send: true }, { new: true, useFindAndModify: false });
        }

        res.json({
            ok: true,
            invoice,
            status
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