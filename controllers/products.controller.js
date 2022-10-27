const { response } = require('express');

const Product = require('../models/products.model');
const Department = require('../models/departments.model');
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
                        .populate('taxid', 'name valor')
                        .sort({ out: -1 })
                        .skip(desde)
                        .limit(1000);

                } else {

                    products = await Product.find({ out: valor })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
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
                        .populate('taxid', 'name valor')
                        .skip(desde)
                        .limit(limite);

                } else {

                    products = await Product.find({
                            $and: [{ expiration: { $gte: new Date(initial), $lt: new Date(end) } }],
                        })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
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
                        .populate('taxid', 'name valor')
                        .sort({ sold: -1 })
                        .skip(desde)
                        .limit(limite);

                } else {

                    products = await Product.find()
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
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
                        .populate('taxid', 'name valor')
                        .skip(desde)
                        .limit(1000);

                } else {

                    products = await Product.find()
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
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

                const stock = product[i].inventario;

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
            .populate('taxid', 'name valor');

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

        const product = await Product.findOne({ code, status: true })
            .populate('kit.product', 'name')
            .populate('taxid', 'name valor')
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
            .populate('taxid', 'name valor')
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

    const { code, taxid, ...newProduct } = req.body;

    try {

        // VALIDATE CODE
        const validateCode = await Product.findOne({ code });
        if (validateCode) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un producto con este codigo de barras'
            });
        }

        // SAVE PRODUCT
        const product = new Product(newProduct);
        product.inventario = product.stock;
        product.code = code;

        if (taxid !== '') {
            product.taxid = taxid;
        }

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
        const { code, name, taxid, ...campos } = req.body;

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

        if (productDB.type === 'Paquete') {
            campos.out = false;
            campos.low = false;
        }
        // COMPROBAR SI EL PRODUCTO SE AGOTA

        if (taxid) {
            campos.taxid = taxid;
        }

        // UPDATE
        campos.code = code;
        campos.name = name;
        const productUpdate = await Product.findByIdAndUpdate(pid, campos, { new: true, useFindAndModify: false });

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
 *  PUT EXCEL PRODUCT CODE
=========================================================================*/
const codeProductUpdate = async(req, res = response) => {

    try {

        const user = req.uid;

        const { agregar, code, department, ...campos } = req.body;

        const productDB = await Product.findOne({ code })
            .populate('department', 'name');
        if (!productDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun producto con este ID'
            });
        }

        // COMPROBAR SI CAMBIO LA FECHA DE VENCIMIENTO
        if (campos.expiration) {
            if (Date.parse(campos.expiration) > Date.parse(productDB.expiration)) {
                campos.vencido = false;
            }
        }

        // COMPROBAR SI VIENE DEÄRTAMENTO
        let departamento = '';

        if (productDB.department) {
            departamento = productDB.department.name;
        }

        if (department) {

            let depart = await Department.findById({ id: department });
            departamento = depart.name;
            campos.department = department;

        }

        // COMPROBAR SI EL PRODUCTO SE AGOTA
        if (agregar > 0) {
            campos.inventario = agregar + productDB.inventario;
            campos.bought = agregar + productDB.bought;

            // COMPROBAR SI ES UNA COMPRA O RETORNO 
            let habia = 0;
            let description = '';

            habia = productDB.inventario;
            description = 'Compra';

            // GUARDAR EN EL LOG
            let log = {
                code: productDB.code,
                name: productDB.name,
                description,
                type: 'Agrego',
                departamento,
                befored: habia,
                qty: agregar,
                stock: campos.inventario,
                cajero: user
            }

            let logProducts = new LogProducts(log);
            await logProducts.save();
            // GUARDAR EN EL LOG

            // VERIFICAMOS SI EL PRODUCTO ESTA AGOTADO O BAJO DE INVENTARIO
            if (campos.inventario > 0) {
                campos.out = false;

                if (campos.inventario > productDB.min) {
                    campos.low = false;
                } else {
                    campos.low = true;
                }

            } else {
                campos.out = true;
                campos.low = false;
            }

            if (productDB.type === 'Paquete') {
                campos.out = false;
                campos.low = false;
            }

        }

        const productUpdate = await Product.findByIdAndUpdate(productDB._id, campos, { new: true, useFindAndModify: false });

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
 *  AJUSTAR INVENTARIO
=========================================================================*/
const ajustarInventario = async(req, res = response) => {

    try {

        const pid = req.params.id;
        const user = req.uid;

        const { cantidad, bought, damaged, type } = req.body;

        const productDB = await Product.findById({ _id: pid });

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun producto con este ID'
            });
        }

        // COMPROBAR SI ES UNA COMPRA O RETORNO 
        let habia = 0;
        let description = '';

        if (type === 'Agrego') {

            habia = productDB.inventario;
            description = 'Compra';
            productDB.bought += bought;
            productDB.inventario += cantidad;

        } else if (type === 'Elimino') {

            habia = productDB.inventario;
            description = 'Dañados o Perdidos';
            productDB.damaged += damaged;
            productDB.inventario -= cantidad;
        }

        // GUARDAR EN EL LOG
        let log = {
            code: productDB.code,
            name: productDB.name,
            description,
            type,
            befored: habia,
            qty: cantidad,
            stock: productDB.inventario,
            cajero: user
        }

        let logProducts = new LogProducts(log);
        await logProducts.save();
        // GUARDAR EN EL LOG

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

        // AJUSTAMOS EL PRODUCTO
        const productUpdate = await Product.findByIdAndUpdate(pid, productDB, { new: true, useFindAndModify: false });



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
 *  AJUSTAR INVENTARIO
=========================================================================*/
/** =====================================================================
 *  AGREGAR IVA A TODOS
=========================================================================*/
const ivaAllProducts = async(req, res = response) => {

    try {

        const { taxid, tax } = req.body;
        const products = await Product.find();

        let total = 0;

        for (const product of products) {

            product.taxid = taxid;
            product.tax = tax;

            await Product.findByIdAndUpdate(product._id, product, { new: true, useFindAndModify: false });
            total++;
        }

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
 *  AGREGAR IVA A TODOS
=========================================================================*/
/** =====================================================================
 *  REPAIR INVENTARIO
=========================================================================*/
const repairInventario = async(req, res = response) => {

    try {

        const products = await Product.find();
        let cantidad = 0;
        for (const product of products) {

            let inventario = (product.stock + product.returned + product.bought) - (product.sold + product.damaged);

            product.inventario = inventario;

            // VERIFICAMOS SI EL PRODUCTO ESTA AGOTADO O BAJO DE INVENTARIO
            if (inventario > 0) {
                product.out = false;

                if (inventario > product.min) {
                    product.low = false;
                } else {
                    product.low = true;
                }

            } else {
                product.out = true;
                product.low = false;
            }

            // ACTUALIZAMOS EL PRODUCTO
            await Product.findByIdAndUpdate(product._id, product, { new: true, useFindAndModify: false });
            cantidad++;

        };

        res.json({
            ok: true,
            products: cantidad
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
 *  REPAIR INVENTARIO
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
    codeProductUpdate,
    departmentProduct,
    getCostProducts,
    productsExcel,
    repairInventario,
    ajustarInventario,
    ivaAllProducts
};