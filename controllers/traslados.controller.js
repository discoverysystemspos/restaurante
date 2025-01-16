const { response } = require('express');

const short = require('short-uuid');

const Traslado = require('../models/traslado.model');
const User = require('../models/users.model');

const { trasladoStock } = require('../helpers/products-stock');

/** =====================================================================
 *  GET TRASLADO
=========================================================================*/
const getTraslados = async(req, res = response) => {

    try {

        const { desde, hasta, sort, ...query } = req.body;

        const [traslados, total] = await Promise.all([
            Traslado.find(query)
            .populate('bodega')
            .skip(desde)
            .limit(hasta)
            .sort(sort),
            Traslado.countDocuments(query)
        ]);

        res.json({
            ok: true,
            traslados,
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
 *  GET ONE TRASLADO
=========================================================================*/
const getTrasladosId = async(req, res = response) => {

    try {
        const trasid = req.params.id;

        // VALIDATE CAR
        const trasladoDB = await Traslado.findById(trasid)
            .populate('bodega');

        if (!trasladoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun traslado de mercancia con este ID'
            });
        }

        res.json({
            ok: true,
            traslado: trasladoDB
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
 *  CREATE TRASLADO
=========================================================================*/
const createTraslado = async(req, res = response) => {

    try {

        const uid = req.uid;

        const user = await User.findById(uid);

        const traslado = new Traslado(req.body);
        
        if (traslado.type === 'Enviado' || !traslado.referencia) {
            traslado.user = user.name;
            traslado.referencia = short.generate();
        }

        await traslado.save();

        // TODO: DESCONTAR INVENTARIO ENVIADO
        if (traslado.type === 'Enviado') {
            await trasladoStock(traslado, uid);
        }

        res.json({
            ok: true,
            traslado
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
 *  UPDATE PARQUEO
=========================================================================*/
const updateTraslado = async(req, res = response) => {

    try {

        const trasid = req.params.id;

        // SEARCH PARQUEO
        const trasladoDB = await Traslado.findById({ _id: trasid });
        if (!trasladoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun traslado de mercancia con este ID'
            });
        }
        // SEARCH PARQUEO

        // VALIDATE PARQUEO
        const {...campos } = req.body;

        // UPDATE
        const traslado = await Traslado.findByIdAndUpdate(trasid, campos, { new: true, useFindAndModify: false });


        res.json({
            ok: true,
            traslado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

// EXPORTS
module.exports = {
    getTraslados,
    createTraslado,
    updateTraslado,
    getTrasladosId
};