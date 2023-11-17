const { response } = require('express');

const Car = require('../models/cars.model');

/** =====================================================================
 *  GET CARS
=========================================================================*/
const getCars = async(req, res = response) => {

    try {

        let { desde, hasta, sort, ...query } = req.body;

        const [cars, total] = await Promise.all([
            Car.find(query)
            .skip(desde)
            .limit(hasta)
            .sort(sort),
            Car.countDocuments(query)
        ]);

        res.json({
            ok: true,
            cars,
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
 *  GET ONE CAR
=========================================================================*/
const getOneCar = async(req, res = response) => {

    try {
        const placa = req.params.placa;

        // VALIDATE CAR
        const carDB = await Car.findOne({ placa });
        if (!carDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un vehiculo con esta placa'
            });
        }

        res.json({
            ok: true,
            car: carDB
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
 *  CREATE CAR
=========================================================================*/
const createCar = async(req, res = response) => {


    try {

        const placa = req.body.name;

        // VALIDATE Typeparq
        const validatePlaca = await Car.findOne({ placa });
        if (validatePlaca) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un vehiculo con esta placa'
            });
        }

        // SAVE Typeparq
        const car = new Car(req.body);
        await car.save();

        res.json({
            ok: true,
            car
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
 *  UPDATE CAR
=========================================================================*/
const updateCar = async(req, res = response) => {

    try {

        const carid = req.params.id;

        // SEARCH CAR
        const carDB = await Car.findById({ _id: carid });
        if (!carDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun vehiculo con este ID'
            });
        }
        // SEARCH CAR

        // VALIDATE CAR
        const { placa, ...campos } = req.body;
        if (carDB.placa !== placa) {
            const validatePlaca = await Car.findOne({ placa });
            if (validatePlaca) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un vehiculo con esta placa'
                });
            }
            campos.placa = placa;
        }

        // UPDATE
        const carUpdate = await Car.findByIdAndUpdate(carid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            car: carUpdate
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
    getCars,
    createCar,
    updateCar,
    getOneCar
};