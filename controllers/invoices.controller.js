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
            .populate('client', 'name cedula phone email address city tip')
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
 *  GET INVOICE TURN
=========================================================================*/
const getInvoicesTurn = async(req, res = response) => {

    try {

        const turno = req.query.turno;
        const credito = req.query.credito || false;
        const status = req.query.status || true;
        const creditos = req.query.creditos || false;

        let invoices;

        if (creditos) {
            invoices = await Invoice.find({ turno, status, credito })
                .populate('client', 'name cedula phone email address city tip')
                .populate('products.product', 'name')
                .populate('user', 'name')
                .populate('mesero', 'name')
                .populate('mesa', 'name');
        } else {
            invoices = await Invoice.find({ turno, status })
                .populate('client', 'name cedula phone email address city tip')
                .populate('products.product', 'name')
                .populate('user', 'name')
                .populate('mesero', 'name')
                .populate('mesa', 'name');
        }

        let total = 0;
        let montos = 0;
        let costos = 0;
        let efectivo = 0;
        let tarjeta = 0;
        let credit = 0;
        let vales = 0;
        let transferencia = 0;
        let payments = [];

        if (invoices.length === 0 || invoices === null) {
            return res.status(200).json({
                ok: true,
                invoices,
                total,
                montos,
                costos,
                efectivo,
                tarjeta,
                credit,
                vales,
                transferencia
            });

        }

        invoices.forEach(invoice => {

            if (invoice.base) {
                montos += invoice.base;
                costos += invoice.cost;
            } else {
                montos += invoice.amount;
                costos += invoice.cost;
            }


            payments = invoice.payments;

            for (let i = 0; i < payments.length; i++) {

                if (payments[i].type === 'efectivo') {
                    efectivo += payments[i].amount;
                } else if (payments[i].type === 'transferencia') {
                    transferencia += payments[i].amount;
                } else if (payments[i].type === 'tarjeta') {
                    tarjeta += payments[i].amount;
                } else if (payments[i].type === 'credito') {
                    credit += payments[i].amount;
                } else if (payments[i].type === 'vales') {
                    vales += payments[i].amount;
                }

            }

        });

        res.json({
            ok: true,
            invoices,
            total: invoices.length,
            montos,
            costos,
            efectivo,
            tarjeta,
            transferencia,
            credit,
            vales
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
 *  GET INVOICE TURN
=========================================================================*/

/** =====================================================================
 *  GET INVOICE DATE INITIAL AND DATE END
=========================================================================*/
const getInvoicesAll = async(req, res = response) => {

        const initial = req.query.initial;
        const end = req.query.end;
        const status = req.query.status || true;
        const mesa = req.query.user || 'none';
        const credito = req.query.credito || false;

        try {

            let invoices;

            if (mesa === 'none') {

                invoices = await Invoice.find({
                        $and: [{ fecha: { $gte: new Date(initial), $lt: new Date(end) } }],
                        status,
                        credito
                    })
                    .populate('client', 'name cedula phone email address city tip')
                    .populate('products.product', 'name')
                    .populate('user', 'name')
                    .populate('mesero', 'name')
                    .populate('mesa', 'name')
                    .sort({ invoice: -1 });
            } else {

                invoices = await Invoice.find({
                        $and: [{ fecha: { $gte: new Date(initial), $lt: new Date(end) } }],
                        status,
                        credito,
                        mesa
                    })
                    .populate('client', 'name cedula phone email address city tip')
                    .populate('products.product', 'name')
                    .populate('user', 'name')
                    .populate('mesero', 'name')
                    .populate('mesa', 'name')
                    .sort({ invoice: -1 });
            }

            let montos = 0;
            let costos = 0;

            invoices.forEach(invoice => {

                if (!invoice.base) {
                    invoice.base = invoice.amount;
                }

                montos += invoice.base;
                costos += invoice.cost;
            });

            res.json({
                ok: true,
                invoices,
                montos,
                costos
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
     *  GET INVOICE DATE INITIAL AND DATE END
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
            .populate('client', 'name cedula phone email address city tip')
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
            .populate('client', 'name cedula phone email address city tip')
            .populate('products.product', 'name code type tax impuesto')
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
 *  GET INVOICE CREDIT CLIENT
=========================================================================*/
const getInvoiceCreditClient = async(req, res = response) => {

    const client = req.params.client;
    const credito = req.params.credito;

    try {

        const invoice = await Invoice.find({ client, credito })
            .populate('client', 'name cedula phone email address city tip')
            .populate('products.product', 'name code type tax impuesto')
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
 *  GET INVOICE CREDIT CLIENT
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
/** =====================================================================
 *  CREATE INVOICE
=========================================================================*/
/** =====================================================================
 *  UPDATE PAYMENTS INVOICE
=========================================================================*/
const updateInvoice = async(req, res = response) => {

    const id = req.params.id;
    const abono = req.query.abono;

    try {

        // SEARCH INVOICE
        const invoiceDB = await Invoice.findById(id);
        if (!invoiceDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ninguna factura con este ID'
            });
        }
        // SEARCH INVOICE

        const {...campos } = req.body;
        const invoiceUpdate = await Invoice.findByIdAndUpdate(id, campos, { new: true, useFindAndModify: false });

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

    const user = req.uid;

    try {

        const id = req.params.id;

        const invoice = await Invoice.findById(id);

        // CHANGE STATUS
        if (invoice.status === true) {
            invoice.status = false;

            if (invoice.credito) {
                invoice.credito = false;
            }

        } else {
            return res.status(400).json({
                ok: false,
                msg: 'Esta factura ya a sido devuelta'
            });
        }
        // CHANGE STATUS

        const invoiceUpdate = await Invoice.findByIdAndUpdate(id, invoice, { new: true, useFindAndModify: false });

        returnStock(invoice.products, invoice.invoice, user);

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
/** =====================================================================
 *  DELETE PRODUCT INVOICE
=========================================================================*/
const deleteProductInvoice = async(req, res = response) => {

        const _id = req.params.id;
        const factura = req.params.factura;
        const user = req.uid;

        try {

            // SEARCH PRODUCT
            const invoiceDB = await Invoice.findById({ _id: factura });
            if (!invoiceDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No existe ninguna factura con este ID'
                });
            }

            // COMPROBAR SI ES EL ULTIMO PRODUCTO
            if (invoiceDB.products.length < 2) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No puedes eliminar el ultimo producto de la factura, si deseas cancelar la factura dar click en cancelar factura'
                });
            }

            const tempArr = invoiceDB.products.filter(record => {
                return record.id === _id;
            })

            returnStock(tempArr, invoiceDB.invoice, user);

            let index = invoiceDB.products.indexOf(tempArr[0]);

            let monto = (tempArr[0].qty * tempArr[0].price);

            invoiceDB.amount -= monto;

            invoiceDB.products.splice(index, 1);

            const invoiceUpdate = await Invoice.findByIdAndUpdate(factura, invoiceDB, { new: true, useFindAndModify: false })
                .populate('client', 'name cedula phone email address city tip')
                .populate('products.product', 'name code type')
                .populate('mesero', 'name')
                .populate('mesa', 'name')
                .populate('user', 'name');

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
     *  DELETE PRODUCT INVOICE
    =========================================================================*/

/** =====================================================================
 *  UPDATE PRODUCT QTY
=========================================================================*/
const updateProductQty = async(req, res = response) => {

    const _id = req.params.id;

    const factura = req.params.factura;

    const qty = req.params.qty;
    const user = req.uid;

    try {

        // SEARCH PRODUCT
        const invoiceDB = await Invoice.findById({ _id: factura });
        if (!invoiceDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna factura con este ID'
            });
        }

        const tempArr = invoiceDB.products.filter(record => {
            return record.id === _id;
        })

        tempArr[0].qty -= qty;

        let index = invoiceDB.products.indexOf(tempArr[0]);

        invoiceDB.products.splice(index, 1);

        invoiceDB.products.push(tempArr[0]);

        let monto = (qty * tempArr[0].price);

        invoiceDB.amount -= monto;

        const invoiceUpdate = await Invoice.findByIdAndUpdate(factura, invoiceDB, { new: true, useFindAndModify: false })
            .populate('client', 'name cedula phone email address city tip')
            .populate('products.product', 'name code type')
            .populate('mesero', 'name')
            .populate('mesa', 'name')
            .populate('user', 'name');

        // DEVOLVER PRODUCTO
        proDev = tempArr;
        proDev[0].qty = qty;

        returnStock(proDev, invoiceDB.invoice, user);

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
 *  UPDATE PRODUCT QTY
=========================================================================*/

// EXPORTS
module.exports = {
    getInvoices,
    createInvoice,
    getInvoiceId,
    getInvoicesDate,
    returnInvoice,
    updateInvoice,
    deleteProductInvoice,
    getInvoicesAll,
    updateProductQty,
    getInvoicesTurn,
    getInvoiceCreditClient
};