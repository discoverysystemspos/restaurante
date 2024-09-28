const { response } = require('express');

const Vehiculo = require('../models/vehiculos.model');

/** =====================================================================
 *  POST VEHICULOS QUERY
=========================================================================*/
const getVehiculoQuery = async(req, res = response) => {

    try {

        let { desde, hasta, sort, ...query } = req.body;

        const [vehiculos, total] = await Promise.all([
            Vehiculo.find(query)
            .populate('client')
            .skip(desde)
            .limit(hasta)
            .sort(sort),
            Vehiculo.countDocuments(query)
        ])

        res.json({
            ok: true,
            vehiculos,
            total
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** =====================================================================
 *  POST VEHICULOS CREATE
=========================================================================*/
const createVehiculo = async(req, res = response) => {

    try {

        let {...vehiculo } = req.body;

        vehiculo.placa = vehiculo.placa.trim().toUpperCase();

        // VALIDA PLACA
        const validatePlaca = await Vehiculo.findOne({ placa: vehiculo.placa });
        if (validatePlaca) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un vehiculo registrado con este numero de placa'
            })
        }

        const newVehiculo = new Vehiculo(vehiculo);

        newVehiculo.save();

        res.json({
            ok: true,
            vehiculo: newVehiculo
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** =====================================================================
 *  PUT VEHICULOS UPDATE
=========================================================================*/
const vehiculoUpdate = async(req, res = response) => {

    try {

        const vid = req.params.id;

        // SEARCH VEHICULO
        const vehiculoDB = await Vehiculo.findById(vid);
        if (!vehiculoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun vehiculo con este ID'
            });
        }

        let {...campos } = req.body;

        // SETEAR A MAYUSCULAS VERIFICAR LA PLACA
        if (campos.placa) {
            campos.placa = campos.placa.trim().toUpperCase();

            if (campos.placa !== vehiculoDB.placa) {
                // VALIDA PLACA
                const validatePlaca = await Vehiculo.find({ placa: campos.placa });
                if (validatePlaca) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ya existe un vehiculo registrado con este numero de placa'
                    })
                }
            }
        }

        const vehiculoUp = await Vehiculo.findByIdAndUpdate(vid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            vehiculo: vehiculoUp
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

module.exports = {
    getVehiculoQuery,
    createVehiculo,
    vehiculoUpdate

}