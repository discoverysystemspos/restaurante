const { response } = require('express');

const Parqueo = require('../models/parqueo.model');

/** =====================================================================
 *  GET PARQUEO
=========================================================================*/
const getParqueos = async(req, res = response) => {

    try {

        const { desde, hasta, sort, ...query } = req.body;

        const [parqueo, total] = await Promise.all([
            Parqueo.find(query)
            .skip(desde)
            .limit(hasta)
            .sort(sort),
            Parqueo.countDocuments(query)
        ]);

        res.json({
            ok: true,
            parqueo,
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
 *  GET ONE PARQUEO
=========================================================================*/
const getOneParqueo = async(req, res = response) => {

    try {
        const { placa, estado } = req.body;

        // VALIDATE CAR
        const parqueoDB = await Parqueo.findOne({ placa, estado });
        if (!parqueoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe vehiculo parqueado con esta placa'
            });
        }

        res.json({
            ok: true,
            parqueo: parqueoDB
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
 *  CREATE PARQUEO
=========================================================================*/
const createParqueo = async(req, res = response) => {

    try {

        const car = req.body.car;

        // VALIDATE PARQUEO
        const validateCar = await Parqueo.findOne({ car, estado: 'Parqueado' });
        if (validateCar) {
            return res.status(400).json({
                ok: false,
                msg: 'Este vehiculo ya esta parqueado'
            });
        }

        // SAVE PARQUEO
        const parqueo = new Parqueo(req.body);
        await parqueo.save();

        res.json({
            ok: true,
            parqueo
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
const updateParqueo = async(req, res = response) => {

    try {

        const parqid = req.params.id;

        // SEARCH PARQUEO
        const parqueoDB = await Parqueo.findById({ _id: parqid });
        if (!parqueoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun registro de parqueo con este ID'
            });
        }
        // SEARCH PARQUEO

        // VALIDATE PARQUEO
        const {...campos } = req.body;

        // UPDATE
        const parqueoUpdate = await Parqueo.findByIdAndUpdate(parqid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            parqueo: parqueoUpdate
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
    getParqueos,
    createParqueo,
    updateParqueo,
    getOneParqueo
};