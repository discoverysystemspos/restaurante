const { response } = require('express');

const Compra = require('../models/compras.model');
const { returnCompraUpdate } = require('../helpers/products-stock');

/** =====================================================================
 *  GET QUERY
=========================================================================*/
const getCompras = async(req, res = response) => {

    try {

        const { desde, hasta, sort, ...query } = req.body;

        const [compras, total] = await Promise.all([
            Compra.find(query)
            .skip(desde)
            .limit(hasta)
            .sort(sort)
            .populate('products')
            .populate('proveedor')
            .populate('user', 'name email'),
            Compra.countDocuments(query)
        ]);

        res.json({
            ok: true,
            compras,
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
 *  GET ONE ID
=========================================================================*/
const getComprasId = async(req, res = response) => {

    try {
        const comid = req.params.id;

        // VALIDATE CAR
        const compraDB = await Compra.findById(comid)
            .populate('products.product')
            .populate('proveedor')
            .populate('user', 'name email');

        if (!compraDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe factura de compra con este ID'
            });
        }

        res.json({
            ok: true,
            compra: compraDB
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
 *  CREATE
=========================================================================*/
const createCompras = async(req, res = response) => {

    try {

        const uid = req.uid;

        const compra = new Compra(req.body);
        compra.user = uid;

        await compra.save();

        await compraUpdate(compra);


        res.json({
            ok: true,
            compra
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
 *  UPDATE
=========================================================================*/
const updateCompras = async(req, res = response) => {

    try {

        const comid = req.params.id;

        // SEARCH PARQUEO
        const compraDB = await Compra.findById({ _id: comid });
        if (!compraDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe factura de compra con este ID'
            });
        }
        // SEARCH PARQUEO

        // VALIDATE PARQUEO
        const {...campos } = req.body;

        // UPDATE
        const compra = await Compra.findByIdAndUpdate(comid, campos, { new: true, useFindAndModify: false });


        res.json({
            ok: true,
            compra
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
 *  RETURN
=========================================================================*/
const returnCompra = async(req, res = response) => {

    try {

        const comid = req.params.id;        

        const compraDB = await Compra.findById({ _id: comid });
        if (!compraDB.status) {
            return res.status(400).json({
                ok: false,
                msg: 'esta factura de compra ya ha sido devuelta!'
            });
        }

        compraDB.status = false;
        compraDB.credito = false;

        await returnCompraUpdate(compraDB);

        await compraDB.save();

        res.json({
            ok: true,
            msg: 'La compra fue cancelada exitosamente!'
        });
        
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
    getCompras,
    createCompras,
    updateCompras,
    getComprasId,
    returnCompra
};