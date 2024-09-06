const { response } = require('express');

const path = require('path');
const fs = require("fs");

// HERLPERS
const { soldProduct, returnStock } = require('../helpers/products-stock');
const { createInvoicePDF } = require("../helpers/createPdfInvoice");

// MODELS
const Invoice = require('../models/invoices.model');
const Product = require('../models/products.model');
const Turno = require('../models/turnos.model');
const Datos = require('../models/datos.model');
const { sendElectronica } = require('../helpers/electronica');

/** =====================================================================
 *  COUNT INVOICE
=========================================================================*/
const getCountInvoicesElectronic = async(req, res = response) => {

    try {

        const total = await Invoice.countDocuments({ electronica: true })

        res.json({
            ok: true,
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
const getInvoices = async(req, res = response) => {

    try {

        const desde = Number(req.query.desde) || 0;

        const [invoices, total] = await Promise.all([

            Invoice.find()
            .populate('client')
            .populate({
                path: 'products.product',
                model: 'Product',
                populate: {
                    path: 'taxid',
                    model: 'Tax',
                }
            })
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
 *  GET INVOICE
=========================================================================*/
const getInvoicesCredito = async(req, res = response) => {

    try {

        const desde = Number(req.query.desde) || 0;

        const [invoices, total] = await Promise.all([

            Invoice.find({ credito: true, status: true })
            .populate('client')
            .populate({
                path: 'products.product',
                model: 'Product',
                populate: {
                    path: 'taxid',
                    model: 'Tax',
                }
            })
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
        const credits = req.query.creditos || false;

        let invoices;

        if (credits) {
            invoices = await Invoice.find({ turno, status, credito })
                .populate('client')
                .populate('products.product', 'name taxid tax department')
                .populate('user', 'name')
                .populate('mesero', 'name')
                .populate('mesa', 'name');
        } else {
            invoices = await Invoice.find({ turno, status })
                .populate('client')
                .populate('products.product', 'name taxid tax department')
                .populate('user', 'name')
                .populate('mesero', 'name')
                .populate('mesa', 'name');
        }

        let total = 0;
        let montos = 0;
        let propinas = 0;
        let costos = 0;
        let iva = 0;
        let efectivo = 0;
        let tarjeta = 0;
        let credit = 0;
        let creditos = 0;
        let vales = 0;
        let devolucion = 0;
        let transferencia = 0;
        let payments = [];

        if (invoices.length === 0 || invoices === null) {
            return res.status(200).json({
                ok: true,
                invoices,
                total,
                montos,
                costos,
                iva,
                efectivo,
                tarjeta,
                credit,
                vales,
                propinas,
                transferencia,
                devolucion
            });

        }

        invoices.forEach(invoice => {

            // if (!invoice.credit || !invoice.credito) {

            // if (invoice.base) {

            //     if (invoice.descuento) {
            //         let des = invoice.porcentaje / 100;
            //         montos += invoice.base - (invoice.base * des);
            //     } else {
            //         montos += invoice.base;
            //     }

            //     costos += invoice.cost;
            // } else {
            //     montos += invoice.amount;
            //     costos += invoice.cost;
            // }

            //     if (!invoice.base) {
            //         invoice.base = invoice.amount;
            //     }

            //     if (invoice.credito || invoice.credit) {
            //         creditos += invoice.amount;
            //     }

            //     montos += invoice.amount;
            //     costos += invoice.cost;
            //     iva += invoice.iva;
            // }

            if (!invoice.base) {
                invoice.base = invoice.amount;
            }

            montos += invoice.amount;
            costos += invoice.cost;
            iva += invoice.iva;

            if (invoice.credito || invoice.credit) {
                creditos += invoice.amount;
                costos -= invoice.cost;
            }

            propinas += invoice.tip;
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
                } else if (payments[i].type === 'devolucion') {
                    devolucion += payments[i].amount;
                }

            }

        });

        res.json({
            ok: true,
            invoices,
            total: invoices.length,
            montos,
            costos,
            iva,
            efectivo,
            tarjeta,
            transferencia,
            credit,
            creditos,
            propinas,
            vales,
            devolucion
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
                .populate('client')
                .populate({
                    path: 'products.product',
                    model: 'Product',
                    populate: {
                        path: 'taxid',
                        model: 'Tax',
                    }
                })
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
                .populate('client')
                .populate({
                    path: 'products.product',
                    model: 'Product',
                    populate: {
                        path: 'taxid',
                        model: 'Tax',
                    }
                })
                .populate('user', 'name')
                .populate('mesero', 'name')
                .populate('mesa', 'name')
                .sort({ invoice: -1 });
        }

        let montos = 0;
        let costos = 0;
        let iva = 0;
        let creditos = 0;

        invoices.forEach(invoice => {

            if (!invoice.base) {
                invoice.base = invoice.amount;
            }

            if (invoice.credito || invoice.credit) {
                creditos += invoice.amount;
            }

            montos += invoice.amount;
            costos += invoice.cost;
            iva += invoice.iva;
        });

        res.json({
            ok: true,
            invoices,
            montos,
            costos,
            creditos,
            iva
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
            .populate('client')
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
            .populate('client')
            // .populate('products.product', 'name taxid code type tax impuesto')
            .populate({
                path: 'products.product',
                model: 'Product',
                populate: {
                    path: 'taxid',
                    model: 'Tax',
                }
            })
            .populate('mesero', 'name')
            .populate('mesa', 'name')
            .populate('devolucion.product')
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
            .populate('client')
            .populate({
                path: 'products.product',
                model: 'Product',
                populate: {
                    path: 'taxid',
                    model: 'Tax',
                }
            })
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
 *  GET INVOICE CREDIT CAJERO MESA
=========================================================================*/
const getInvoiceCreditCajeroMesa = async(req, res = response) => {

    const mesa = req.params.mesa;

    try {

        let invoices;

        if (mesa === 'none') {

            invoices = await Invoice.find({ credito: true })
                .populate('client')
                .populate('products.product', 'name taxid code type tax impuesto')
                .populate('mesero', 'name')
                .populate('mesa', 'name')
                .populate('user', 'name');

        } else {

            invoices = await Invoice.find({ mesa, credito: true })
                .populate('client')
                .populate('products.product', 'name taxid code type tax impuesto')
                .populate('mesero', 'name')
                .populate('mesa', 'name')
                .populate('user', 'name');

            if (!invoices) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No existe ninguna factura con este ID'
                });
            }
        }


        res.json({
            ok: true,
            invoices,
            total: invoices.length
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
 *  GET INVOICE CREDIT CAJERO MESA
=========================================================================*/

/** =====================================================================
 *  GET INVOICE VENCIDAS
=========================================================================*/
const getInvoiceVenida = async(req, res = response) => {

    try {

        const fechaActual = new Date(req.params.fecha);

        const invoices = await Invoice.find({
                $and: [{ fechaCredito: { $gte: new Date('10/10/2020'), $lt: fechaActual } }],
                credito: true
            })
            .populate('client')
            .populate({
                path: 'products.product',
                model: 'Product',
                populate: {
                    path: 'taxid',
                    model: 'Tax',
                }
            })
            .populate('user', 'name')
            .populate('mesero', 'name')
            .populate('mesa', 'name')
            .sort({ invoice: -1 });

        await invoices.map((factura) => {

            if (!factura.vencida) {
                factura.vencida = true;
                factura.save();
            }

        });

        res.json({
            ok: true,
            invoices
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
 *  GET INVOICE VENCIDAS
=========================================================================*/

/** =====================================================================
 *  CREATE INVOICE
=========================================================================*/
const createInvoice = async(req, res = response) => {

    const user = req.uid;
    const turno = req.params.turno;

    try {

        const { client, ...factura } = req.body;

        if (client != '') {
            factura.client = client;
        } else {
            factura.ocasional = true
        }

        const invoice = new Invoice(factura);
        invoice.user = user;

        if (invoice.credito) {
            invoice.credit = true;
        }


        await invoice.save();

        const sold = await soldProduct(invoice.products, invoice.invoice, user, invoice);

        if (!sold) {

            return res.status(500).json({
                ok: false,
                msg: 'Este producto no tiene asignado un departamento'
            });

        }

        const invoiceNew = await Invoice.findById(invoice._id)
            .populate('client')
            // .populate('products.product', 'name taxid code type')
            .populate({
                path: 'products.product',
                model: 'Product',
                populate: {
                    path: 'taxid',
                    model: 'Tax',
                }
            })
            .populate('mesero', 'name')
            .populate('mesa', 'name')
            .populate('user', 'name');


        // if (invoiceNew.electronica) {
        //     const sendDian = await sendElectronica(invoiceNew);
        // }

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
 *  POST QUERY INVOICE
=========================================================================*/
const postQueryInvoice = async(req, res = response) => {

    try {

        const query = req.body;

        const invoices = await Invoice.find(query)
            .populate('client')
            .populate({
                path: 'products.product',
                model: 'Product',
                populate: {
                    path: 'taxid',
                    model: 'Tax',
                }
            })
            .populate('user', 'name')
            .populate('mesero', 'name')
            .populate('mesa', 'name')
            .sort({ invoice: -1 });

        let montos = 0;
        let costos = 0;
        let iva = 0;

        invoices.forEach(invoice => {

            if (!invoice.base) {
                invoice.base = invoice.amount;
            }

            montos += invoice.base;
            costos += invoice.cost;
            iva += invoice.iva;
        });

        res.json({
            ok: true,
            invoices,
            montos,
            costos,
            iva
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
 *  POST QUERY INVOICE
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

        await Invoice.findByIdAndUpdate(id, invoice, { new: true, useFindAndModify: false });

        returnStock(invoice.products, invoice.invoice, user);

        if (invoice.fechaCredito) {

            for (const abo of invoice.paymentsCredit) {

                const turnoID = abo.turno;
                await Turno.updateOne({ _id: turnoID }, { $pull: { abonos: { factura: id } } });

            }

        }

        const invoiceDB = await Invoice.findById(id);

        res.json({
            ok: true,
            invoice: invoiceDB
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
            invoiceDB.base -= monto;

            invoiceDB.products.splice(index, 1);

            const invoiceUpdate = await Invoice.findByIdAndUpdate(factura, invoiceDB, { new: true, useFindAndModify: false })
                .populate('client')
                .populate('products.product', 'name taxid code type')
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
        invoiceDB.base -= monto;

        const invoiceUpdate = await Invoice.findByIdAndUpdate(factura, invoiceDB, { new: true, useFindAndModify: false })
            .populate('client')
            .populate('products.product', 'name taxid code type')
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

};
/** =====================================================================
 *  UPDATE PRODUCT QTY
=========================================================================*/
/** =====================================================================
 *  INVOICE PDF
=========================================================================*/
const invoicePDF = async(req, res = response) => {
    try {

        const iid = req.params.id;

        const datos = await Datos.findOne({ status: true });

        const invoiceDB = await Invoice.findById(iid)
            .populate('client')
            // .populate('products.product', 'name taxid code type tax impuesto')
            .populate({
                path: 'products.product',
                model: 'Product',
                populate: {
                    path: 'taxid',
                    model: 'Tax',
                }
            })
            .populate('mesero', 'name')
            .populate('mesa', 'name')
            .populate('devolucion.product')
            .populate('user', 'name');

        const invoice = {
            shipping: {
                name: "John Doe",
                address: "1234 Main Street",
                city: "San Francisco",
                state: "CA",
                country: "US",
                postal_code: 94111
            },
            items: [{
                    item: "TC 100",
                    description: "Toner Cartridge",
                    quantity: 2,
                    amount: 6000
                },
                {
                    item: "USB_EXT",
                    description: "USB Cable Extender",
                    quantity: 1,
                    amount: 2000
                }
            ],
            subtotal: 8000,
            paid: 0,
            invoice_nr: 1234
        };

        const pathPDf = path.join(__dirname, `../uploads/pdf/factura.pdf`);

        await createInvoicePDF(invoiceDB, datos, pathPDf);

        setTimeout(() => {

            if (fs.existsSync(pathPDf)) {
                res.sendFile(pathPDf);
            } else {
                res.json({
                    ok: false,
                    msg: 'No se ha generado el PDF del preventivo!'
                });
            }

        }, 2000);

        if (!invoice) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna factura con este ID'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }
}

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
    getInvoiceCreditClient,
    getInvoiceVenida,
    getInvoicesCredito,
    getInvoiceCreditCajeroMesa,
    postQueryInvoice,
    getCountInvoicesElectronic,
    invoicePDF
};