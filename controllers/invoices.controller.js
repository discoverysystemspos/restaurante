const { response } = require('express');

// HERLPERS
const { soldProduct, returnStock } = require('../helpers/products-stock');

// MODELS
const Invoice = require('../models/invoices.model');

/** =====================================================================
 *  GET INVOICE
=========================================================================*/
const getInvoices = async(req, res = response) => {

    try {

        const desde = Number(req.query.desde) || 0;

        const [invoices, total] = await Promise.all([

            Invoice.find()
            .populate('client', 'name cedula telefono email')
            .populate('products.product', 'name')
            .populate('user', 'name')
            .populate('mesero', 'name')
            .populate('mesa', 'name')
            .sort({ invoice: -1 })
            .skip(desde)
            .limit(50),

            Invoice.countDocuments()
        ]);


        res.json({
            ok: true,
            invoices,
            total
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });

    }

};
/** =====================================================================
 *  GET INVOICE
=========================================================================*/

/** =====================================================================
 *  GET INVOICE DATE 
=========================================================================*/
const getInvoicesDate = async(req, res = response) => {

    const fecha = req.params.fecha;

    try {

        const [invoices, total] = await Promise.all([
            Invoice.find({
                $expr: {
                    $and: [{
                            $eq: [{
                                    $year: "$fecha"
                                },
                                {
                                    $year: new Date(fecha)
                                }
                            ]
                        },
                        {
                            $eq: [{
                                    $month: "$fecha"
                                },
                                {
                                    $month: new Date(fecha)
                                }
                            ]
                        },
                        {
                            $eq: [{
                                    $dayOfMonth: "$fecha"
                                },
                                {
                                    $dayOfMonth: new Date(fecha)
                                }
                            ]
                        }
                    ]
                }
            })
            .populate('client', 'name cedula telefono email')
            .sort({ invoice: -1 }),
            Invoice.countDocuments()
        ]);

        res.json({
            ok: true,
            invoices,
            total
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};
/** =====================================================================
 *  GET INVOICE DATE
=========================================================================*/

/** =====================================================================
 *  GET INVOICE ID
=========================================================================*/
const getInvoiceId = async(req, res = response) => {

    const id = req.params.id;

    try {

        const invoice = await Invoice.findById(id)
            .populate('client', 'name cedula telefono email')
            .populate('products.product', 'name code type')
            .populate('mesero', 'name')
            .populate('mesa', 'name')
            .populate('user', 'name');

        if (!invoice) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna factura con este ID'
            });
        }

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
/** =====================================================================
 *  GET INVOICE ID
=========================================================================*/

/** =====================================================================
 *  CREATE INVOICE
=========================================================================*/
const createInvoice = async(req, res = response) => {

    const user = req.uid;
    const turno = req.params.turno;

    try {

        const invoice = new Invoice(req.body);

        invoice.user = user;

        await invoice.save();

        soldProduct(invoice.products);

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
/** =====================================================================
 *  CREATE INVOICE
=========================================================================*/
/** =====================================================================
 *  UPDATE PAYMENTS INVOICE
=========================================================================*/
const updateInvoice = async(req, res = response) => {

    const _id = req.params.id;

    try {

        // SEARCH INVOICE
        const invoiceDB = await Invoice.findById(_id);
        if (!invoiceDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ninguna factura con este ID'
            });
        }
        // SEARCH INVOICE

        const {...campos } = req.body;
        const invoiceUpdate = await Invoice.findByIdAndUpdate(_id, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            invoice: invoiceUpdate
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

}


/** =====================================================================
 *  UPDATE PAYMENTS INVOICE
=========================================================================*/

/** =====================================================================
 *  RETURN INVOICE
=========================================================================*/
const returnInvoice = async(req, res = response) => {

    try {

        const id = req.params.id;

        const invoice = await Invoice.findById(id);

        // CHANGE STATUS
        if (invoice.status === true) {
            invoice.status = false;
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'Esta factura ya a sido devuelta'
            });
        }
        // CHANGE STATUS

        const invoiceUpdate = await Invoice.findByIdAndUpdate(id, invoice, { new: true, useFindAndModify: false });

        returnStock(invoice.products);

        res.json({
            ok: true,
            invoice: invoiceUpdate
        });


    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });

    }


}

/** =====================================================================
 *  RETURN INVOICE
=========================================================================*/



// EXPORTS
module.exports = {
    getInvoices,
    createInvoice,
    getInvoiceId,
    getInvoicesDate,
    returnInvoice,
    updateInvoice
};