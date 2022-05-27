const { response } = require('express');

const LogProducts = require('../models/log.products.model');

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
        })


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


// EXPORTS
module.exports = {
    getLogProducts,
    getLogDate
};