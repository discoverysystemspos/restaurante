const { response } = require('express');

// HERLPERS
const { soldProduct, returnStock } = require('./products-stock');

// MODELS
const Invoice = require('../models/invoices.model');
const Product = require('../models/products.model');

/** =====================================================================
 *  CREATE INVOICE ONLINE
=========================================================================*/
const createInvoiceOnline = async(pedido) => {

    try {

        let factura = [];        

        let cost = 0;
        let iva = 0;

        for (let i = 0; i < pedido.products.length; i++) {
            
            let product = await Product.findById(pedido.products[i].product)
            .populate('kit.product', 'name')
            .populate('department', 'name');

            cost += (pedido.products[i].qty * product.cost);
            
        }        
                
        factura.user = '60da36c1f6beed066c105b3b';
        factura.venta = 'Online';
        factura.pedido = pedido._id;
        factura.type = 'credito';
        factura.cost = cost;
        factura.iva = iva;
        factura.products = pedido.products;
        factura.client = pedido.client._id;
        factura.amount = pedido.amount;
        factura.nota = pedido.comentario;
        factura.base = pedido.amount;
        factura.credito = true;
        factura.mesa = '61d5469da90ac6e7973167a3';
        factura.mesero = '60da36c1f6beed066c105b3b';

        console.log('factura: ', factura);

        const invoice = new Invoice(factura);

        await invoice.save();

        soldProduct(invoice.products, invoice.invoice, factura.user, invoice);

        

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente Venta online'
        });

    }

};

// EXPORTS
module.exports = {
    createInvoiceOnline
}