// MODELS
const Product = require('../models/products.model');
const LogProducts = require('../models/log.products.model');

/** =====================================================================
 *  UPDATE STOCK 
=========================================================================*/
const soldProduct = async(products, invoice, user) => {

    try {


        let factura = `Factura #${invoice}`

        if (!products) {
            return false;
        }

        for (let i = 0; i < products.length; i++) {

            let id = products[i].product;

            const product = await Product.findById(id);

            // SI ES DIFERENTE A UN KIT
            if (product.type !== 'Paquete') {

                // SI NO SE HA VENDIDO
                if (!product.sold) {
                    product.sold = 0;
                }

                // ACTUALIZAMOS
                product.sold += products[i].qty;

                // COMPROBAR SI EL PRODUCTO SE AGOTA
                const stock = (product.stock + product.returned + product.bought) - (product.sold + product.damaged);

                if (stock > 0) {

                    product.out = false;

                    if (stock < product.min) {
                        product.low = true;
                    } else {
                        product.low = false;
                    }

                } else {
                    product.out = true;
                }
                // COMPROBAR SI EL PRODUCTO SE AGOTA

                const productUpdate = await Product.findByIdAndUpdate(id, product, { new: true, useFindAndModify: false });

                let habia = stock + products[i].qty;

                let log = {
                    code: product.code,
                    name: product.name,
                    description: factura,
                    type: 'Salida',
                    befored: habia,
                    qty: products[i].qty,
                    stock: stock,
                    cajero: user
                }

                const logProducts = new LogProducts(log);

                await logProducts.save();

            } else {

                const kits = product.kit

                // ACTUALIZAMOS
                product.sold += products[i].qty;

                // COMPROBAR SI EL PRODUCTO SE AGOTA
                const stock = (product.stock + product.returned + product.bought) - (product.sold + product.damaged);

                let habia = stock + products[i].qty;

                let log = {
                    code: product.code,
                    name: product.name,
                    description: factura,
                    type: 'Salida',
                    befored: habia,
                    qty: products[i].qty,
                    stock: stock,
                    cajero: user
                }

                const logProducts = new LogProducts(log);

                await logProducts.save();

                for (let i = 0; i < kits.length; i++) {

                    let id = kits[i].product;

                    const productKit = await Product.findById(id);

                    // SI NO SE HA VENDIDO
                    if (!productKit.sold) {
                        productKit.sold = 0;
                    }

                    // ACTUALIZAMOS
                    productKit.sold += log.qty * kits[i].qty;
                    const productUpdate = await Product.findByIdAndUpdate(id, productKit, { new: true, useFindAndModify: false });

                }

            }

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }


};
/** =====================================================================
 *  UPDATE STOCK
=========================================================================*/
/** =====================================================================
 *  RETURN STOCK
=========================================================================*/
const returnStock = async(products, invoice, user) => {

        try {


            if (!products) {
                return false;
            }

            let factura = `Factura #${invoice}`

            for (let i = 0; i < products.length; i++) {

                let id = products[i].product;

                const product = await Product.findById(id);

                // SI ES DIFERENTE A UN KIT
                if (product.type !== 'Paquete') {

                    // SI NO SE HA VENDIDO
                    if (!product.returned) {
                        product.returned = 0;
                    }

                    product.returned += products[i].qty;

                    // COMPROBAR SI EL PRODUCTO SE AGOTA
                    const stock = (product.stock + product.returned + product.bought) - (product.sold + product.damaged);

                    if (stock > 0) {

                        product.out = false;

                        if (stock < product.min) {
                            product.low = true;
                        } else {
                            product.low = false;
                        }

                    } else {
                        product.out = true;
                    }
                    // COMPROBAR SI EL PRODUCTO SE AGOTA


                    // ACTUALIZAMOS
                    const productUpdate = await Product.findByIdAndUpdate(id, product, { new: true, useFindAndModify: false });

                    let habia = stock - products[i].qty;

                    let log = {
                        code: product.code,
                        name: product.name,
                        description: factura,
                        type: 'Devolución',
                        befored: habia,
                        qty: products[i].qty,
                        stock: stock,
                        cajero: user
                    }

                    const logProducts = new LogProducts(log);

                    await logProducts.save();

                } else {

                    const kits = product.kit

                    // ACTUALIZAMOS
                    product.returned += products[i].qty;

                    // COMPROBAR SI EL PRODUCTO SE AGOTA
                    const stock = (product.stock + product.returned + product.bought) - (product.sold + product.damaged);

                    let habia = stock + products[i].qty;

                    let log = {
                        code: product.code,
                        name: product.name,
                        description: factura,
                        type: 'Salida',
                        befored: habia,
                        qty: products[i].qty,
                        stock: stock,
                        cajero: user
                    }

                    const logProducts = new LogProducts(log);

                    await logProducts.save();

                    for (let i = 0; i < kits.length; i++) {

                        let id = kits[i].product;

                        const productKit = await Product.findById(id);

                        // SI NO SE HA VENDIDO
                        if (!productKit.sold) {
                            productKit.sold = 0;
                        }

                        // ACTUALIZAMOS
                        productKit.sold += log.qty * kits[i].qty;
                        const productUpdate = await Product.findByIdAndUpdate(id, productKit, { new: true, useFindAndModify: false });

                    }


                    // --------------------------------------------------------------------------

                    const kits = product.kit

                    product.returned += products[i].qty;

                    for (let i = 0; i < kits.length; i++) {

                        let id = kits[i].product;

                        const productKit = await Product.findById(id);

                        // SI NO SE HA VENDIDO
                        if (!productKit.returned) {
                            productKit.returned = 0;
                        }

                        // ACTUALIZAMOS
                        productKit.returned += products[i].qty * kits[i].qty;

                        const productUpdate = await Product.findByIdAndUpdate(id, productKit, { new: true, useFindAndModify: false });

                    }

                }

            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error inesperado, porfavor intente nuevamente'
            });
        }


    }
    /** =====================================================================
     *  RETURN STOCK
    =========================================================================*/

// EXPORT
module.exports = {
    soldProduct,
    returnStock
};