const { response } = require('express');

const https = require("https");



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

        console.log("factura: ", factura);

        // POST DATAICO
        const invoice = await fetch(`https://api.dataico.com/dataico_api/v2/invoices`, {
            method: 'POST',
            body: JSON.stringify(invoiceNew),
            headers: {
                "auth-token": token,
            }
        }).then(response => {
            console.log(response);
            res.json({
                ok: true,
                response
            });

        }).catch(err => {
            console.log(err);
            res.json({
                ok: true,
                err
            });
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