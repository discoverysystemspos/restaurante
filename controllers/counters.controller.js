const { response } = require('express');

const Counter = require('../models/counters.model');

/** =====================================================================
 *  GET COUNTER
=========================================================================*/
const getCounter = async(req, res = response) => {

    try {

        const field = req.params.field;

        const counter = await Counter.findOne({ field });

        res.json({
            ok: true,
            counter
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
 *  GET COUNTER
=========================================================================*/
/** =====================================================================
 *  UPDATE COUNTER
=========================================================================*/
const updateCounter = async(req, res = response) => {

    const baid = req.params.id;

    try {

        // SEARCH DEPARTMENT
        const bancoDB = await Banco.findById({ _id: baid });
        if (!bancoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun banco con este ID'
            });
        }
        // SEARCH DEPARTMENT

        // VALIDATE DEPARTMENT
        const { name, ...campos } = req.body;

        if (bancoDB.name !== name) {
            const bancoValidate = await Banco.findOne({ name });
            if (bancoValidate) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un banco con este nombre'
                });
            }
        }

        // UPDATE
        campos.name = name;
        const bancoUpdate = await Banco.findByIdAndUpdate(baid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            banco: bancoUpdate
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
 *  UPDATE COUNTER
=========================================================================*/

// EXPORTS
module.exports = {
    getCounter,
    updateCounter,
};