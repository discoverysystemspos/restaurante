// MODELS
const Product = require('../models/products.model');
const LogProducts = require('../models/log.products.model');

/** =====================================================================
 *  UPDATE STOCK 
=========================================================================*/
const soldProduct = async(products, invoice, user, invoices, pedido = false) => {

    try {


        let factura = `Factura #${invoice}`

        if (!products) {
            return false;
        }

        for (let i = 0; i < products.length; i++) {

            let id = products[i].product;


            const product = await Product.findById(id)
                .populate('department', 'name');

            // SI ES DIFERENTE A UN KIT
            if (product.type !== 'Paquete') {

                // SI NO SE HA VENDIDO
                if (!product.sold) {
                    product.sold = 0;
                }

                // ACTUALIZAMOS
                product.sold += products[i].qty;
                product.inventario -= products[i].qty;

                // COMPROBAR SI EL PRODUCTO SE AGOTA
                const stock = (product.stock + product.returned + product.bought) - (product.sold + product.damaged);

                if (product.inventario > 0) {

                    product.out = false;

                    if (product.inventario < product.min) {
                        product.low = true;
                    } else {
                        product.low = false;
                    }

                } else {
                    product.out = true;
                }
                // COMPROBAR SI EL PRODUCTO SE AGOTA

                await Product.findByIdAndUpdate(id, product, { new: true, useFindAndModify: false });

                let habia = product.inventario + products[i].qty;

                if (!pedido) {

                    let log = {
                        code: product.code,
                        name: product.name,
                        description: factura,
                        type: 'Salida',
                        befored: habia,
                        qty: products[i].qty,
                        stock: product.inventario,
                        cajero: user,
                        invoice: invoices,
                        turno: invoices.turno,
                        // department: product.department._id,
                        monto: (products[i].price * products[i].qty),
                        departamento: product.department.name
                    }

                    const logProducts = new LogProducts(log);

                    await logProducts.save();
                }


            } else {

                const kits = product.kit

                // ACTUALIZAMOS
                product.sold += products[i].qty;
                product.inventario -= products[i].qty;

                // COMPROBAR SI EL PRODUCTO SE AGOTA
                const stock = (product.stock + product.returned + product.bought) - (product.sold + product.damaged);

                let habia = product.inventario + products[i].qty;

                let log = {
                    code: product.code,
                    name: product.name,
                    description: factura,
                    type: 'Salida',
                    befored: habia,
                    qty: products[i].qty,
                    monto: (products[i].price * products[i].qty),
                    stock: product.inventario,
                    cajero: user,
                    invoice: invoices,
                    turno: invoices.turno,
                    department: product.department._id,
                    departamento: product.department.name
                }

                const logProducts = new LogProducts(log);

                await logProducts.save();

                for (let i = 0; i < kits.length; i++) {

                    let id = kits[i].product;

                    const productKit = await Product.findById(id)
                        .populate('department', 'name');

                    // SI NO SE HA VENDIDO
                    if (!productKit.sold) {
                        productKit.sold = 0;
                    }

                    // ACTUALIZAMOS
                    productKit.sold += log.qty * kits[i].qty;
                    productKit.inventario -= log.qty * kits[i].qty;
                    const productUpdate = await Product.findByIdAndUpdate(id, productKit, { new: true, useFindAndModify: false });

                    let habiaK = productKit.inventario + (log.qty * kits[i].qty);

                    let logK = {
                        code: productKit.code,
                        name: productKit.name,
                        description: factura,
                        type: 'Salida',
                        befored: habiaK,
                        qty: (log.qty * kits[i].qty),
                        monto: (productKit.price * kits[i].qty),
                        stock: productKit.inventario,
                        cajero: user,
                        invoice: invoices,
                        turno: invoices.turno,
                        department: productKit.department._id,
                        departamento: productKit.department.name
                    }

                    const logProductsK = new LogProducts(logK);

                    await logProductsK.save();

                }

            }

        }

        return true;
    } catch (error) {

        console.log(error);
        return false;
    }


};
/** =====================================================================
 *  UPDATE STOCK
=========================================================================*/
/** =====================================================================
 *  UPDATE STOCK COMPRAS
=========================================================================*/
const compraUpdate = async(compra) => {

    try {

        for (let i = 0; i < compra.products.length; i++) {
            const item = compra.products[i];

            const productDB = await Product.findById(item.product).populate('department', 'name');

            productDB.inventario += item.qty;

            if (item.price !== productDB.price) {
                productDB.price = item.price;
            }

            if (item.cost !== productDB.cost) {
                productDB.cost = item.cost;
            }

            if (item.wholesale && item.wholesale !== productDB.wholesale) {
                productDB.wholesale = item.wholesale;
            }

            // VERIFICAMOS SI EL PRODUCTO ESTA AGOTADO O BAJO DE INVENTARIO
            if (productDB.inventario > 0) {
                productDB.out = false;

                if (productDB.inventario > productDB.min) {
                    productDB.low = false;
                } else {
                    productDB.low = true;
                }

            } else {
                productDB.out = true;
                productDB.low = false;
            }

            // ACTUALIZAR GANANCIA
            if (item.cost && item.price) {
                let porcent = (item.cost * 100) / item.price;

                let gain = (porcent - 100) * -1;
                gain = Math.round(gain * 100) / 100;

                productDB.gain = gain.toFixed(0);
            }

            await productDB.save();

            let log = {
                code: productDB.code,
                name: productDB.name,
                description: `compra #${compra.invoice}`,
                type: 'Agrego',
                befored: productDB.inventario - item.qty,
                qty: item.qty,
                monto: (item.price * item.qty),
                stock: productDB.inventario,
                cajero: compra.user,
                compra: compra._id,
                department: productDB.department._id,
                departamento: productDB.department.name
            }

            const logProducts = new LogProducts(log);

            await logProducts.save();


        }


    } catch (error) {
        console.log(error);
        return false;
    }

};

/** =====================================================================
 *  UPDATE STOCK TRASLADO
=========================================================================*/
const trasladoStock = async(traslado) => {

    try {

        // VERIFICAR EL TIPO DE TRASLADO
        if (traslado.type === 'Enviado') {

            for (let i = 0; i < traslado.products.length; i++) {
                const product = traslado.prodcuts[i];

                const productDB = await Product.findOne({ code: product.code }).populate('department', 'name');

                productDB.inventario -= product.qty;

                // VERIFICAMOS SI EL PRODUCTO ESTA AGOTADO O BAJO DE INVENTARIO
                if (productDB.inventario > 0) {
                    productDB.out = false;

                    if (productDB.inventario > productDB.min) {
                        productDB.low = false;
                    } else {
                        productDB.low = true;
                    }

                } else {
                    productDB.out = true;
                    productDB.low = false;
                }

                let log = {
                    code: productDB.code,
                    name: productDB.name,
                    description: `Traslado #${traslado.referencia}`,
                    type: 'Traslado',
                    befored: productDB.inventario - product.qty,
                    qty: product.qty,
                    monto: (product.price * product.qty),
                    stock: productDB.inventario,
                    cajero: req.uid,
                    department: productDB.department._id,
                    departamento: productDB.department.name
                }

                const logProducts = new LogProducts(log);

                await logProducts.save();
            }

        }

    } catch (error) {
        console.log(error);
        return false;
    }

};
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
                    product.inventario += products[i].qty;

                    // COMPROBAR SI EL PRODUCTO SE AGOTA
                    const stock = product.inventario;

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
                        cajero: user,
                        department: product.department._id,
                        departamento: product.department.name
                    }

                    const logProducts = new LogProducts(log);

                    await logProducts.save();

                } else {

                    const kits = product.kit

                    // ACTUALIZAMOS
                    product.returned += products[i].qty;

                    // COMPROBAR SI EL PRODUCTO SE AGOTA
                    const stock = (product.stock + product.returned + product.bought) - (product.sold + product.damaged);

                    let habia = stock - products[i].qty;

                    let log = {
                        code: product.code,
                        name: product.name,
                        description: factura,
                        type: 'Devolución',
                        befored: habia,
                        qty: products[i].qty,
                        stock: stock,
                        cajero: user,
                        department: product.department._id,
                        departamento: product.department.name
                    }

                    const logProducts = new LogProducts(log);

                    await logProducts.save();

                    for (let i = 0; i < kits.length; i++) {

                        let id = kits[i].product;

                        const productKit = await Product.findById(id);

                        // SI NO SE HA VENDIDO
                        if (!productKit.returned) {
                            productKit.returned = 0;
                        }

                        // ACTUALIZAMOS
                        productKit.returned += log.qty * kits[i].qty;
                        productKit.inventario += log.qty * kits[i].qty;
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
const returnCompraUpdate = async(compra) => {

    try {

        for (const producto of compra.products) {            

            const productDB = await Product.findById(producto.product)

            productDB.inventario -= producto.qty;
            await productDB.save();            
        }

        return;
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

}

// EXPORT
module.exports = {
    soldProduct,
    returnStock,
    compraUpdate,
    trasladoStock,
    returnCompraUpdate
};