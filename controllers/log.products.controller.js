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


// EXPORTS
module.exports = {
    getLogProducts
};