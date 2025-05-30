const { response } = require('express');

const Product = require('../models/products.model');
const Department = require('../models/departments.model');
const LogProducts = require('../models/log.products.model');
const { expirateProduct } = require('../helpers/products-stock');

/** =====================================================================
 *  GET PRODUCTS QUERY
=========================================================================*/
const getProductsQuery = async(req, res = response) => {

    try {

        const {desde, hasta, sort, ...query} = req.body;

        const [products, total] = await Promise.all([
            Product.find(query)
            .populate('cajero', 'name')
            .populate('invoice')
            .populate('taxid')
            .skip(desde)
            .limit(hasta)
            .sort(sort),
            Product.countDocuments(query)
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

                    products = await Product.find({ department: department, out: valor, status: true })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
                        .sort({ out: -1 })
                        .skip(desde)
                        .limit(1000);

                } else {

                    products = await Product.find({ out: valor, status: true })
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
                            status: true,
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
                            status: true,
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

                    products = await Product.find({ department: department, out: valor, status: true })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
                        .sort({ sold: -1 })
                        .skip(desde)
                        .limit(limite);

                } else {

                    products = await Product.find({ status: true })
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

                    products = await Product.find({ department: department, status: true })
                        .populate('kit.product', 'name')
                        .populate('department', 'name')
                        .populate('taxid', 'name valor')
                        .skip(desde)
                        .limit(1000);

                } else {

                    products = await Product.find({ status: true })
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

        const products = await Product.find({ status: true, out: false });

        let costo = 0;
        let precio = 0;
        let inventario = 0;
        
        for (let i = 0; i < products.length; i++) {
            
            const product = products[i];

            if (product !== 'Paquete') {                
                inventario += product.inventario;
                costo += (product.inventario * product.cost);
                precio += (product.inventario * product.price);
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
 *  GET PRODUTS DELETES
=========================================================================*/
const getProductsDeletes = async(req, res = response) => {

    try {

        const [products, total] = await Promise.all([
            Product.find({ status: false })
            .populate('kit.product', 'name')
            .populate('department', 'name')
            .populate('taxid', 'name valor'),
            Product.countDocuments()
        ])

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
 *  GET PRODUTS DELETES
=========================================================================*/

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

        let product = await Product.findOne({ code, status: true })
            .populate('kit.product', 'name')
            .populate('taxid', 'name valor')
            .populate('department', 'name');

        if (!product) {
            product = await Product.findOne({ sku: code, status: true })
                .populate('kit.product', 'name')
                .populate('taxid', 'name valor')
                .populate('department', 'name');
        }

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

        const products = await Product.find({}, 'code sku name type cost inventario gain price wholesale department stock bought sold returned damaged fecha');

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
 *  CREATE PRODUCT EXCEL
=========================================================================*/
const createProductExcel = async(req, res = response) => {

    try {

        let products = req.body.products;

        if (products.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Lista de productos vacias, verifique he intene nuevamente'
            });
        }

        let i = 0;

        for (const producto of products) {

            // VALIDATE CODE
            const validateCode = await Product.findOne({ code: producto.code });
            if (!validateCode) {

                // SAVE PRODUCT
                const product = new Product(producto);
                product.inventario = producto.stock;

                await product.save();
                i++;
            }

        }

        res.json({
            ok: true,
            total: i
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

            let camExp = new Date(campos.expiration);
            let dbExp = new Date(productDB.expiration);
            let hoy = new Date(Date.now());

            if (camExp.getTime() > dbExp.getTime() ||
                dbExp.getTime() > hoy.getTime() ||
                camExp.getTime() > hoy.getTime()
            ) {
                campos.vencido = false;
            } else {
                campos.vencido = true;
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

        let products = req.body.products;

        if (products.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Lista de productos vacias, verifique he intene nuevamente'
            });
        }

        let i = 0;

        for (const producto of products) {

            // const { agregar, code, department, ...campos } = req.body;

            // OBTENER GANANCIA
            let gain = 0;
            let porcent = 0;

            if (producto.cost && producto.price) {
                porcent = (producto.cost * 100) / producto.price;

                gain = (porcent - 100) * -1;
                gain = Math.round(gain * 100) / 100;

                producto.gain = gain;
            }

            // OBTENER GANANCIA

            // EXPIRATION
            if (producto.expiration) {
                producto.expiration = new Date(producto.expiration);
            }

            const productDB = await Product.findOne({ code: producto.code })
                .populate('department', 'name');
            if (productDB) {

                // COMPROBAR SI CAMBIO LA FECHA DE VENCIMIENTO
                if (producto.expiration) {
                    if (Date.parse(producto.expiration) > Date.parse(productDB.expiration)) {
                        producto.vencido = false;
                    }
                }

                // COMPROBAR SI VIENE DEÄRTAMENTO
                let departamento = '';

                if (productDB.department) {
                    departamento = productDB.department.name;
                }

                if (producto.department) {
                    const depart = await Department.findById({ _id: producto.department });
                    departamento = depart.name;
                    producto.department = depart._id;
                }

                // COMPROBAR SI EL PRODUCTO SE AGOTA
                if (producto.agregar > 0) {
                    producto.inventario = producto.agregar + productDB.inventario;
                    producto.bought = producto.agregar + productDB.bought;

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
                        qty: producto.agregar,
                        stock: producto.inventario,
                        cajero: user
                    }

                    let logProducts = new LogProducts(log);
                    await logProducts.save();
                    // GUARDAR EN EL LOG

                    // VERIFICAMOS SI EL PRODUCTO ESTA AGOTADO O BAJO DE INVENTARIO
                    if (producto.inventario > 0) {
                        producto.out = false;

                        if (producto.inventario > productDB.min) {
                            producto.low = false;
                        } else {
                            producto.low = true;
                        }

                    } else {
                        producto.out = true;
                        producto.low = false;
                    }

                    if (productDB.type === 'Paquete') {
                        producto.out = false;
                        producto.low = false;
                    }

                }

                await Product.findByIdAndUpdate(productDB._id, producto, { new: true, useFindAndModify: false });
                i++;
            }


        }

        res.json({
            ok: true,
            total: i
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
 *  RESET INVENTARY PRODUCTS
=========================================================================*/
const resetInv = async(req, res = response) => {

        try {
            let number = 0;

            const product = await Product.find();

            for (const producto of product) {

                let update = {
                    inventario: 0,
                    stock: 0,
                    bought: 0,
                    sold: 0,
                    returned: 0,
                    damaged: 0,
                    out: false
                }

                const productUpdate = await Product.findByIdAndUpdate(producto._id, update, { new: true, useFindAndModify: false });

                number++;
            }

            res.json({
                ok: true,
                number
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
     *  RESET INVENTARY PRODUCTS
    =========================================================================*/

const ajustarInventario = async(req, res = response) => {

    try {

        const pid = req.params.id;
        const user = req.uid;

        const { cantidad, bought, damaged, type } = req.body;

        const productDB = await Product.findById({ _id: pid }).populate('department', 'name');

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
            cajero: user,
            department: productDB.department._id,
            departamento: productDB.department.name
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
    ivaAllProducts,
    getProductsDeletes,
    resetInv,
    createProductExcel,
    getProductsQuery
};