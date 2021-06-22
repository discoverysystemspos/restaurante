const { response } = require('express');

const Product = require('../models/products.model');
const LogProducts = require('../models/log.products.model');

/** =====================================================================
 *  GET PRODUCTS
=========================================================================*/
const getProducts = async(req, res = response) => {

    try {

        const desde = Number(req.query.desde) || 0;
        const tipo = req.query.tipo || 'none';
        const valor = req.query.valor || 'false';

        console.log(tipo);
        console.log(valor);

        let products;
        switch (tipo) {
            case 'agotados':

                products = await Product.find()
                    .populate('kit.product', 'name')
                    .populate('department', 'name')
                    .sort({ out: -1 })
                    .skip(desde)
                    .limit(10);

                break;
            case 'vencidos':

                products = await Product.find()
                    .populate('kit.product', 'name')
                    .populate('department', 'name')
                    .sort({ vencido: -1 })
                    .skip(desde)
                    .limit(10);

                break;
            case 'none':

                products = await Product.find()
                    .populate('kit.product', 'name')
                    .populate('department', 'name')
                    .skip(desde)
                    .limit(10);

                break;

            default:
                break;
        }

        // const [products, total] = await Promise.all([

        //     Product.find()
        //     .populate('kit.product', 'name')
        //     .populate('department', 'name')
        //     .skip(desde)
        //     .limit(10),

        //     Product.countDocuments()
        // ]);

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

        for (let i = 0; i < product.length; i++) {

            const stock = ((product[i].stock + product[i].returned + product[i].bought) - (product[i].sold + product[i].damaged));

            costo += (stock * product[i].cost);
            precio += (stock * product[i].price);

        }

        res.json({
            ok: true,
            costo,
            precio

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
 *  GET TOTAL COST PRODUCTS
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

        const code = req.params.code;

        const product = await Product.findOne({ code })
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

    try {

        // data = await User.find({ name: regex });
        [products, total] = await Promise.all([
            Product.find({ department: department })
            .populate('kit.product', 'name')
            .populate('department', 'name'),
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
        const validateName = await Product.findOne({ name });
        if (validateName) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un producto con este nombre'
            });
        }

        // SAVE PRODUCT
        const product = new Product(req.body);
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

        // COMPROBAR SI EL PRODUCTO SE AGOTA
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
        await Product.findByIdAndDelete({ _id });

        res.json({
            ok: true,
            msg: 'Product eliminado con exito'
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
    getCostProducts
};