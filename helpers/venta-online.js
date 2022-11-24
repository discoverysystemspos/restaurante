const { response } = require('express');

// HERLPERS
const { soldProduct, returnStock } = require('./products-stock');

// MODELS
const Invoice = require('../models/invoices.model');
const Product = require('../models/products.model');
const Turno = require('../models/turnos.model');

/** =====================================================================
 *  CREATE INVOICE ONLINE
=========================================================================*/
const createInvoiceOnline = async(pedido, vendedor, mid) => {

    try {

        let usuario = vendedor;

        if (!vendedor || vendedor === '') {
            usuario = '606f22c91d266d0308d74964'
        }

        const turnoDB = await Turno.findOne({ cajero: usuario })
            .sort({ 'fecha': -1 })
            .populate('cajero', 'name')
            .populate('caja', 'name')
            .populate('sales.facturas', 'amount payments status type products cost');


        if (vendedor === '' || vendedor === null) {
            vendedor = usuario
        }

        let factura = [];

        let cost = 0;
        let iva = 0;

        for (let i = 0; i < pedido.products.length; i++) {

            let product = await Product.findById(pedido.products[i].product)
                .populate('kit.product', 'name')
                .populate('department', 'name');

            cost += (pedido.products[i].qty * product.cost);

        }

        factura.user = usuario;
        factura.venta = 'Online';
        factura.pedido = pedido._id;
        factura.type = 'credito';
        factura.cost = cost;
        factura.iva = iva;
        factura.products = pedido.products;
        factura.client = pedido.client;
        factura.amount = pedido.amount;
        factura.nota = pedido.comentario;
        factura.base = pedido.amount;
        factura.credito = true;
        factura.mesa = '63793379bea54503a3c75b18';
        factura.mesero = vendedor;

        if (mid !== '') {
            factura.mesa = mid;
        }

        if (turnoDB.cerrado === false) {
            factura.turno = turnoDB._id;
        }

        const invoice = new Invoice(factura);

        await invoice.save();

        soldProduct(invoice.products, invoice.invoice, factura.user, invoice);



    } catch (error) {

        console.log(error);
    }

};

// EXPORTS
module.exports = {
    createInvoiceOnline
}