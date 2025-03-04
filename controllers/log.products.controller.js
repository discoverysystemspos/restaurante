const { response } = require('express');

const LogProducts = require('../models/log.products.model');

/** =====================================================================
 *  POST QUERY LOG PRODUCTS
=========================================================================*/
const getLogProductsQuery = async(req, res = response) => {

    try {

        const { desde, hasta, sort, ...query } = req.body;

        const [products, total] = await Promise.all([
            LogProducts.find(query)
            .populate('cajero', 'name')
            .populate('invoice')
            .skip(desde)
            .limit(hasta)
            .sort(sort),
            LogProducts.countDocuments(query)
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
 *  GET LOG PRODUCTS
=========================================================================*/
const getLogProducts = async(req, res = response) => {

    try {

        const desde = Number(req.query.desde) || 0;
        const limite = Number(req.query.limite) || 10;

        const [products, total] = await Promise.all([
            LogProducts.find()
            .populate('cajero', 'name')
            .populate('invoice')
            .skip(desde)
            .limit(limite)
            .sort({ 'fecha': -1 }),
            LogProducts.countDocuments()
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

};
/** =====================================================================
 *  GET LOG PRODUCTS
=========================================================================*/

/** =====================================================================
 *  GET LOG PRODUCTS DATE
=========================================================================*/
const getLogDate = async(req, res = response) => {

    try {

        const initial = req.query.initial;
        const end = req.query.end;
        const departamento = req.query.query;

        const products = await LogProducts.find({
                departamento,
                $and: [{ fecha: { $gte: new Date(initial), $lt: new Date(end) } }]
            })
            .populate('cajero', 'name')
            .populate('invoice')
            .sort({ 'fecha': -1 });

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
 *  GET LOG PRODUCTS DATE
=========================================================================*/

/** =====================================================================
 *  GET LOG PRODUCT ONE
=========================================================================*/
const getOneProducLog = async(req, res = response) => {

    try {

        const initial = req.query.initial;
        const end = req.query.end;
        const fecha = req.query.fecha || 'false';

        const desde = Number(req.query.desde) || 0;
        const limite = Number(req.query.limite) || 10;
        const code = req.params.code

        let products;
        let total;

        switch (fecha) {
            case 'false':

                products = await LogProducts.find({ code })
                    .populate('cajero', 'name')
                    .populate('invoice')
                    .sort({ 'fecha': -1 })
                    .skip(desde)
                    .limit(limite);

                break;

            case 'true':

                products = await LogProducts.find({
                        code,
                        $and: [{ fecha: { $gte: new Date(initial), $lt: new Date(end) } }]
                    })
                    .populate('cajero', 'name')
                    .populate('invoice')
                    .sort({ 'fecha': -1 });


                break;

            default:
                break;
        }

        total = products.length;

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
 *  GET LOG PRODUCT ONE
=========================================================================*/


// EXPORTS
module.exports = {
    getLogProducts,
    getLogDate,
    getOneProducLog,
    getLogProductsQuery
};