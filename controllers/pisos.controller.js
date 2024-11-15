const { response } = require('express');

const ObjectId = require('mongoose').Types.ObjectId;

const Piso = require('../models/pisos.model');

/** =====================================================================
 *  POST QUERY
=========================================================================*/
const getQueryPisos = async(req, res = response) => {

    try {

        const { desde, hasta, sort, ...query } = req.body;

        const [pisos, total] = await Promise.all([
            Piso.find(query)
            .populate('mesas')
            .skip(desde)
            .limit(hasta)
            .sort(sort),
            Piso.countDocuments()
        ]);

        res.json({
            ok: true,
            pisos,
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
 *  GET ID
=========================================================================*/
const getPisoId = async(req, res = response) => {

    try {
        const piid = req.params.id;

        // VALIDAR ID
        if (!ObjectId.isValid(piid)) {
            return res.status(404).json({
                ok: false,
                msg: 'Error, el ID es incorrecto o no es valido'
            });
        }

        // VALIDATE
        const pisoDB = await Piso.findById(piid)
            .populate('mesas');

        if (!pisoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna piso con este ID'
            });
        }

        res.json({
            ok: true,
            piso: pisoDB
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
 *  CREATE
=========================================================================*/
const createPiso = async(req, res = response) => {
    
    try {
        const piso = new Piso(req.body);
        piso.name = piso.name.trim().toUpperCase();

        // VALIDATE
        const validatePiso = await Piso.findOne({ name: piso.name  });
        if (validatePiso) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un piso con este nombre'
            });
        }

        // SAVE       
        await piso.save();

        piso.piid = piso._id;

        res.json({
            ok: true,
            piso
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
 *  UPDATE
=========================================================================*/
const updatePiso = async(req, res = response) => {

    
    try {
        const piid = req.params.id;

        // VALIDAR ID
        if (!ObjectId.isValid(piid)) {
            return res.status(404).json({
                ok: false,
                msg: 'Error, el ID es incorrecto o no es valido'
            });
        }

        // SEARCH
        const pisoDB = await Piso.findById(piid);
        if (!pisoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun piso con este ID'
            });
        }
        // SEARCH

        // VALIDATE
        const { ...campos } = req.body;
        campos.name = campos.name.trim().toUpperCase();
        if (pisoDB.name !== campos.name ) {

            const validatePiso = await Piso.findOne({ name: campos.name  });
            if (validatePiso) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un piso con este nombre'
                });
            }
        }

        // UPDATE
        const piso = await Piso.findByIdAndUpdate(piid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            piso
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
 *  DELETE
=========================================================================*/
const deletePiso = async(req, res = response) => {
    try {

        const piid = req.params.id;
        // SEARCH
        const pisoDB = await Piso.findById(piid);
        if (!pisoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun piso con este ID'
            });
        }

        await Piso.findByIdAndDelete(piid);

        res.json({
            ok: true,
            msg: 'Se ha eliminado correctamente'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }
}

// EXPORTS
module.exports = {
    getQueryPisos,
    createPiso,
    updatePiso,
    getPisoId,
    deletePiso
};