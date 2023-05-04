const { response } = require('express');

const Dataico = require('../models/dataico.model');

/** =====================================================================
 *  GET DATAICO
=========================================================================*/
const getDataico = async(req, res = response) => {

    try {

        const dataico = await Dataico.findOne();

        res.json({
            ok: true,
            dataico
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
 *  GET DATAICO
=========================================================================*/

/** =====================================================================
 *  CREATE DATA DATAICO
=========================================================================*/
const createDataico = async(req, res = response) => {

    try {

        // VALIDATE PARAMS DATAICO
        const validate = await Dataico.countDocuments();
        if (validate > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes configurado la información de dataico'
            });
        }

        // SAVE DEPARTMENT
        const dataico = new Dataico(req.body);
        await dataico.save();

        res.json({
            ok: true,
            dataico
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
 *  CREATE DATA DATAICO
=========================================================================*/
/** =====================================================================
 *  UPDATE DATAICO
=========================================================================*/
const updateDataico = async(req, res = response) => {

    const datid = req.params.id;

    try {

        // SEARCH DEPARTMENT
        const dataicoDB = await Banco.findById({ _id: datid });
        if (!dataicoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Error con el ID'
            });
        }
        // SEARCH DEPARTMENT

        // VALIDATE DEPARTMENT
        const {...campos } = req.body;


        // UPDATE
        const dataicoUpdate = await Dataico.findByIdAndUpdate(datid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            dataico: dataicoUpdate
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
 *  UPDATE DATAICO
=========================================================================*/



// EXPORTS
module.exports = {
    getDataico,
    createDataico,
    updateDataico,
};