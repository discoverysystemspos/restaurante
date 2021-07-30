const { response } = require('express');

// MODELS
const Pedido = require('../models/pedidos.model');

/** =====================================================================
 *  GET PEDIDO
=========================================================================*/
const getPedidos = async(req, res = response) => {

    try {

        const desde = Number(req.query.desde) || 0;

        const [pedidos, total] = await Promise.all([

            Pedido.find()
            .populate('client', 'name cedula phone email address city tip')
            .populate('products.product', 'name')
            .populate('user', 'name')
            .sort({ pedido: -1 })
            .skip(desde)
            .limit(50),

            Pedido.countDocuments()
        ]);

        res.json({
            ok: true,
            pedidos,
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
 *  GET PEDIDO
=========================================================================*/

/** =====================================================================
 *  POST PEDIDO
=========================================================================*/
const postPedidos = async(req, res = response) => {

    try {

        const client = req.cid;

        const pedido = new Pedido(req.body);

        pedido.client = client;

        await pedido.save();

        const pedidoNew = await Pedido.findById(pedido._id)
            .populate('client', 'name cedula phone email address city tip')
            .populate('products.product', 'name code type')
            .populate('user', 'name');

        res.json({
            ok: true,
            pedido: pedidoNew
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
 *  POST PEDIDO
=========================================================================*/



// MODULE EXPORTS
module.exports = {
    getPedidos,
    postPedidos
}