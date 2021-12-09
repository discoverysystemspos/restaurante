const { response } = require('express');
const { soldProduct } = require('../helpers/products-stock');

// MODELS
const Pedido = require('../models/pedidos.model');

/** =====================================================================
 *  GET PEDIDO
=========================================================================*/
const getPedidos = async(req, res = response) => {

    try {

        const desde = Number(req.query.desde) || 0;
        const hasta = Number(req.query.hasta) || 50;
        const status = req.query.status || true;

        const [pedidos, total] = await Promise.all([

            Pedido.find({ status })
            .populate('client', 'name cedula phone email address city tip')
            .populate('products.product', 'name code')
            .populate('user', 'name')
            .sort({ pedido: -1 })
            .skip(desde)
            .limit(hasta),

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
 *  GET PEDIDO CLIENT
=========================================================================*/
const getPedidosClient = async(req, res = response) => {

    try {

        const client = req.cid;

        const desde = Number(req.query.desde) || 0;

        const [pedidos, total] = await Promise.all([

            Pedido.find({ client })
            .populate('client', 'name cedula phone email address city tip')
            .populate('products.product', 'name code')
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
 *  GET PEDIDO CLIENT
=========================================================================*/

/** =====================================================================
 *  GET PEDIDO ONE
=========================================================================*/
const getPedidoOne = async(req, res = response) => {

    try {

        const id = req.params.id;

        const pedido = await Pedido.findById(id)
            .populate('client', 'name cedula phone email address city tip')
            .populate('products.product', 'name code')
            .populate('user', 'name');

        res.json({
            ok: true,
            pedido
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
 *  GET PEDIDO ONE
=========================================================================*/

/** =====================================================================
 *  POST PEDIDO
=========================================================================*/
const postPedidos = async(req, res = response) => {

    try {

        const client = req.cid;

        const pedido = new Pedido(req.body);

        const referencia = req.body.referencia;

        pedido.client = client;

        // ACTUALIZAR INVENTARIO
        soldProduct(pedido.products, pedido.pedido, client, pedido, true)

        // VALIDATE CODE
        const validateReference = await Pedido.findOne({ referencia });
        if (validateReference) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un pedido con esta referencia de pago'
            });
        }

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


};

/** =====================================================================
 *  POST PEDIDO
=========================================================================*/
/** =====================================================================
 *  PUT PEDIDO
=========================================================================*/
const UpdateStatusPedido = async(req, res = response) => {

    try {

        const id = req.params.id;

        // SEARCH PEDIDO
        const pedidoDB = await Pedido.findById(id);
        if (!pedidoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun pedido con este ID'
            });
        }
        // SEARCH PEDIDO

        const {...campos } = req.body;
        const pedidoUpdate = await Pedido.findByIdAndUpdate(id, campos, { new: true, useFindAndModify: false })
            .populate('client', 'name cedula phone email address city tip')
            .populate('products.product', 'name code')
            .populate('user', 'name');

        res.json({
            ok: true,
            pedido: pedidoUpdate
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
 *  PUT PEDIDO
=========================================================================*/

// MODULE EXPORTS
module.exports = {
    getPedidos,
    postPedidos,
    getPedidosClient,
    getPedidoOne,
    UpdateStatusPedido
}