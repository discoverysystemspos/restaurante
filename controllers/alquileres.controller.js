const { response } = require('express');

const Alquiler = require('../models/alquileres.model');

/** =====================================================================
 *  GET ALQUILERES
=========================================================================*/
const getAlquileres = async(req, res = response) => {

    const query = req.body;

    try {

        const [alquileres, total] = await Promise.all([
            Alquiler.find(query)
            .populate('client')
            .populate('items.product')
            .populate('user', 'name'),
            Alquiler.countDocuments()
        ]);

        res.json({
            ok: true,
            alquileres,
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
 *  GET ALQUILERES
=========================================================================*/

/** =====================================================================
 *  GET ALQUILER ID
=========================================================================*/
const getAlquilerId = async(req, res = response) => {

    const alid = req.params.id;

    try {

        const alquiler = await Alquiler.findById(alid)
            .populate('client')
            .populate('items.product')
            .populate('user', 'name');
        if (!alquiler) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun alquiler con este ID'
            });
        }

        res.json({
            ok: true,
            alquiler
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
 *  GET ALQUILER ID
=========================================================================*/

/** =====================================================================
 *  CREATE ALQUILER
=========================================================================*/
const createAlquiler = async(req, res = response) => {

    try {

        const user = req.uid;

        // SAVE DEPARTMENT
        const alquiler = new Alquiler(req.body);

        alquiler.user = user;
        await alquiler.save();

        const alquilerNew = await Alquiler.findById({ _id: alquiler._id })
            .populate('client')
            .populate('items.product')
            .populate('user', 'name');

        res.json({
            ok: true,
            alquiler: alquilerNew
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
 *  CREATE ALQUILER
=========================================================================*/
/** =====================================================================
 *  UPDATE ALQUILER
=========================================================================*/
const updateAlquiler = async(req, res = response) => {

    const alid = req.params.id;

    try {

        // SEARCH DEPARTMENT
        const alquilerDB = await Alquiler.findById({ _id: alid });
        if (!alquilerDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun alquiler con este ID'
            });
        }
        // SEARCH DEPARTMENT

        // VALIDATE DEPARTMENT
        const {...campos } = req.body;


        // UPDATE
        const alquilerUpdate = await Alquiler.findByIdAndUpdate(alid, campos, { new: true, useFindAndModify: false })
            .populate('client')
            .populate('items.product')
            .populate('user', 'name');

        res.json({
            ok: true,
            alquiler: alquilerUpdate
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
 *  UPDATE ALQUILER
=========================================================================*/

/** =====================================================================
 *  DELETE ALQUILER
=========================================================================*/
const deleteAlquiler = async(req, res = response) => {

    const alid = req.params.id;

    try {

        // SEARCH CAJA
        const alquilerDB = await Alquiler.findById(alid);
        if (!alquilerDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun alquiler con este ID'
            });
        }
        // SEARCH CAJA

        // CHANGE STATUS
        if (alquilerDB.status === true) {
            alquilerDB.status = false;
        } else {
            alquilerDB.status = true;
        }
        // CHANGE STATUS

        const alquilerUpdate = await Alquiler.findByIdAndUpdate(baid, alquilerDB, { new: true, useFindAndModify: false })
            .populate('client')
            .populate('items.product')
            .populate('user', 'name');

        res.json({
            ok: true,
            alquiler: alquilerUpdate
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
 *  DELETE ALQUILER
=========================================================================*/
// EXPORTS
module.exports = {
    getAlquileres,
    createAlquiler,
    updateAlquiler,
    deleteAlquiler,
    getAlquilerId
};