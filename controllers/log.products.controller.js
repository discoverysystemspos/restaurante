const { response } = require('express');

const LogProducts = require('../models/log.products.model');

/** =====================================================================
 *  GET LOG PRODUCTS
=========================================================================*/
const getLogProducts = async(req, res = response) => {

    try {

        const [products, total] = await Promise.all([
            LogProducts.find()
            .populate('cajero', 'name'),
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