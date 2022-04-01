const { response } = require('express');

const Product = require('../models/products.model');
const LogProducts = require('../models/log.products.model');
const { expirateProduct } = require('../helpers/products-stock');

/** =====================================================================
 *  GET PRODUCTS
=========================================================================*/
const getProducts = async(req, res = response) => {

    try {

        const tipo = req.query.tipo || 'none';
        const department = req.query.departamento || 'none';
        const valor = req.query.valor || 'false';
        const initial = req.query.initial || '01/01/2001';
        const end = req.query.end || new Date();
        const desde = Number(req.query.desde) || 0;
        const limite = Number(req.query.limite) || 10;
        const status = req.query.status || false;

        let products;
        switch (tipo) {
            case 'agotados':

                if (department !== 'none') {

                    products = await Product.find({ department: department, out: valor })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .sort({ out: -1 })
                        .skip(desde)
                        .limit(1000);

                } else {

                    products = await Product.find({ out: valor })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .sort({ out: -1 })
                        .skip(desde)
                        .limit(1000);
                }


                break;
            case 'vencidos':

                if (department !== 'none') {

                    products = await Product.find({
                            department: department,
                            $and: [{ expiration: { $gte: new Date(initial), $lt: new Date(end) } }]
                        })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .skip(desde)
                        .limit(limite);

                } else {

                    products = await Product.find({
                            $and: [{ expiration: { $gte: new Date(initial), $lt: new Date(end) } }],
                        })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .skip(desde)
                        .limit(limite);
                }

                // products = expirateProduct(productos);
                for (let i = 0; i < products.length; i++) {

                    if (!products[i].vencido) {

                        products[i].vencido = true;

                        // ACTUALIZAMOS
                        const productUpdate = await Product.findByIdAndUpdate(products[i]._id, products[i], { new: true, useFindAndModify: false });

                    }
                }

                break;
            case 'top':

                if (department !== 'none') {

                    products = await Product.find({ department: department, out: valor })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .sort({ sold: -1 })
                        .skip(desde)
                        .limit(limite);

                } else {

                    products = await Product.find()
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .sort({ sold: -1 })
                        .skip(desde)
                        .limit(limite);
                }

                break;
            case 'none':

                if (department !== 'none') {

                    products = await Product.find({ department: department })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .skip(desde)
                        .limit(1000);

                } else {

                    products = await Product.find()
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .skip(desde)
                        .limit(limite);


                }


                break;

            default:
                break;
        }

        const total = await Product.countDocuments();

        res.json({
            ok: true,
            products,
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
 *  GET PRODUCTS
=========================================================================*/
/** =====================================================================
 *  GET TOTAL COST PRODUCTS   
=========================================================================*/
const getCostProducts = async(req, res = response) => {

    try {

        const product = await Product.find({ status: true, out: false });

        let costo = 0;
        let precio = 0;
        let inventario = 0;

        for (let i = 0; i < product.length; i++) {

            if (product[i].type !== 'Paquete') {

                const stock = ((product[i].stock + product[i].returned + product[i].bought) - (product[i].sold + product[i].damaged));

                inventario += stock;
                costo += (stock * product[i].cost);
                precio += (stock * product[i].price);
            }

        }

        res.json({
            ok: true,
            costo,
            precio,
            inventario

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
 *  GET PRODUTS FOR ID
=========================================================================*/
const oneProduct = async(req, res = response) => {

    const id = req.params.id;

    try {

        const product = await Product.findById(id)
            .populate('kit.product', 'name')
            .populate('department', 'name');

        res.json({
            ok: true,
            product
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
 *  GET PRODUCTS BY CODE
=========================================================================*/
const codeProduct = async(req, res = response) => {

    try {

        const code = new RegExp(req.params.code, 'i');

        const product = await Product.findOne({
                $or: [
                    { code: code }
                ],
                status: true
            })
            .populate('kit.product', 'name')
            .populate('department', 'name');

        res.json({
            ok: true,
            product
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
 *  GET PRODUCTS BY CATEGORY
=========================================================================*/
const departmentProduct = async(req, res = response) => {

    const department = req.params.department;
    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.hasta) || 1000;

    try {

        // data = await User.find({ name: regex });
        [products, total] = await Promise.all([
            Product.find({ department: department, status: true })
            .populate('kit.product', 'name')
            .populate('department', 'name')
            .skip(desde)
            .limit(hasta),
            Product.countDocuments()
        ]);

        res.json({
            ok: true,
            products,
            total
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
 *  GET PRODUCTS EXCEL
=========================================================================*/
const productsExcel = async(req, res = response) => {

    try {

        const products = await Product.find({}, 'code name type cost inventario gain price wholesale department stock bought sold returned damaged fecha');


        for (let i = 0; i < products.length; i++) {

            let stock = 0;
            if (products.type !== 'Paquete') {
                stock = ((products[i].stock + products[i].returned + products[i].bought) - (products[i].sold + products[i].damaged));
            } else {
                stock = 0;
            }
            products[i].inventario = stock


        }

        res.json({
            ok: true,
            products
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
 *  CREATE PRODUCT
=========================================================================*/
const createProduct = async(req, res = response) => {

    const { code, name } = req.body;

    try {

        // VALIDATE CODE
        const validateCode = await Product.findOne({ code });
        if (validateCode) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un producto con este codigo de barras'
            });
        }

        // VALIDATE NAME
        // const validateName = await Product.findOne({ name });
        // if (validateName) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'Ya existe un producto con este nombre'
        //     });
        // }

        // SAVE PRODUCT
        const product = new Product(req.body);
        product.inventario = product.stock;

        await product.save();

        res.json({
            ok: true,
            product
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
 *  CREATE PRODUCT
=========================================================================*/

/** =====================================================================
 *  UPDATE PRODUCT
=========================================================================*/
const updateProduct = async(req, res = response) => {

    const pid = req.params.id;

    const user = req.uid;
    const inventario = req.query.inventario || false;

    try {

        // SEARCH PRODUCT
        const productDB = await Product.findById({ _id: pid });
        if (!productDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun producto con este ID'
            });
        }
        // SEARCH PRODUCT

        // VALIDATE CODE && NAME
        const { code, name, ...campos } = req.body;

        // CODE
        if (String(productDB.code) !== String(code)) {
            const validateCode = await Product.findOne({ code });
            if (validateCode) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un producto con este codigo de barras'
                });
            }
        }

        // NAME
        if (productDB.name !== name) {
            const validateName = await Product.findOne({ name });
            if (validateName) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un producto con este nombre'
                });
            }
        }

        // COMPROBAR SI CAMBIO LA FECHA DE VENCIMIENTO
        if (campos.expiration) {
            if (Date.parse(campos.expiration) > Date.parse(productDB.expiration)) {
                campos.vencido = false;
            }
        }

        // COMPROBAR SI EL PRODUCTO SE AGOTA//
        const stock = (productDB.stock + (campos.returned || 0) + (campos.bought || 0)) - ((campos.sold || 0) + (campos.damaged || 0));

        if (stock > 0) {

            campos.out = false;

            if (stock < campos.min) {
                campos.low = true;
            } else {
                campos.low = false;
            }

        } else {
            campos.out = true;
        }

        if (productDB.type === 'Paquete') {
            campos.out = false;
            campos.low = false;
        }
        // COMPROBAR SI EL PRODUCTO SE AGOTA

        // UPDATE
        campos.code = code;
        campos.name = name;
        const productUpdate = await Product.findByIdAndUpdate(pid, campos, { new: true, useFindAndModify: false });

        // COMPROBAR SI ES UNA COMPRA O RETORNO
        if (campos.bought || campos.damaged) {

            if (campos.bought !== productDB.bought) {

                let change = campos.bought - productDB.bought;

                let habia = stock - change;

                let description = 'Compra';

                let log = {
                    code: productDB.code,
                    name: productDB.name,
                    description,
                    type: 'Agrego',
                    befored: habia,
                    qty: change,
                    stock: stock,
                    cajero: user
                }

                let logProducts = new LogProducts(log);

                await logProducts.save();

            } else if (campos.damaged !== productDB.damaged) {

                let change = campos.damaged - productDB.damaged;

                let habia = stock + change;

                let description = 'Dañados o Perdidos';

                let log = {
                    code: productDB.code,
                    name: productDB.name,
                    description,
                    type: 'Elimino',
                    befored: habia,
                    qty: change,
                    stock: stock,
                    cajero: user
                }

                let logProducts = new LogProducts(log);

                await logProducts.save();

            }
        }

        res.json({
            ok: true,
            product: productUpdate
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
 *  UPDATE PRODUCT
=========================================================================*/
/** =====================================================================
 *  DELETE PRODUCT
=========================================================================*/
const deleteProduct = async(req, res = response) => {

    const _id = req.params.id;

    try {

        // SEARCH PRODUCT
        const productDB = await Product.findById({ _id });
        if (!productDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun producto con este ID'
            });
        }
        // SEARCH PRODUCT

        // CHANGE STATUS
        if (productDB.status === true) {
            productDB.status = false;
        } else {
            productDB.status = true;
        }
        // CHANGE STATUS

        const productUpdate = await Product.findByIdAndUpdate(_id, productDB, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            product: productUpdate
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
 *  DELETE PRODUCT
=========================================================================*/



// EXPORTS
module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    oneProduct,
    codeProduct,
    departmentProduct,
    getCostProducts,
    productsExcel
};