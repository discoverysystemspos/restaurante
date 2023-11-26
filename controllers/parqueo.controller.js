const { response } = require('express');

const Parqueo = require('../models/parqueo.model');
const Car = require('../models/cars.model');

/** =====================================================================
 *  GET PARQUEO
=========================================================================*/
const getParqueos = async(req, res = response) => {

    try {

        const { desde, hasta, sort, ...query } = req.body;

        const [parqueos, total] = await Promise.all([
            Parqueo.find(query)
            .skip(desde)
            .limit(hasta)
            .sort(sort)
            .populate({
                path: 'car',
                model: 'Cars',
                populate: {
                    path: 'typeparq',
                    model: 'Typeparqs',
                }
            })
            .populate('user', 'name email'),
            Parqueo.countDocuments(query)
        ]);

        res.json({
            ok: true,
            parqueos,
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
        const parqueoDB = await Parqueo.findOne({ placa, estado })
            .populate({
                path: 'car',
                model: 'Cars',
                populate: {
                    path: 'typeparq',
                    model: 'Typeparqs',
                }
            })
            .populate('user', 'name email');
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

        const uid = req.uid;

        let placa = req.body.placa.trim();

        const carDB = await Car.findOne({ placa });
        if (!carDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe vehiculo con esta placa'
            });
        }


        // VALIDATE PARQUEO
        const validateCar = await Parqueo.findOne({ car: carDB._id, estado: 'Parqueado' });
        if (validateCar) {
            return res.status(400).json({
                ok: false,
                msg: 'Este vehiculo ya esta parqueado'
            });
        }

        let ingreso = new Date().getTime();

        // SAVE PARQUEO
        const parqueo = new Parqueo({
            car: carDB._id,
            placa: carDB.placa,
            checkin: ingreso,
            user: uid,
        });

        await parqueo.save();

        const parqueDB = await Parqueo.findById(parqueo._id)
            .populate({
                path: 'car',
                model: 'Cars',
                populate: {
                    path: 'typeparq',
                    model: 'Typeparqs',
                }
            })
            .populate('user', 'name email');

        res.json({
            ok: true,
            parqueo: parqueDB
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