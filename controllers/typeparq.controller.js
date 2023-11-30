const { response } = require('express');

const Typeparq = require('../models/typeparq.model');

/** =====================================================================
 *  GET Typeparq
=========================================================================*/
const getTypeparq = async(req, res = response) => {

    try {

        let { desde, hasta, sort, ...query } = req.body;

        const [typeparqs, total] = await Promise.all([
            Typeparq.find(query)
            .populate('tax')
            .skip(desde)
            .limit(hasta)
            .sort(sort),
            Typeparq.countDocuments(query)
        ]);

        res.json({
            ok: true,
            typeparqs,
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
 *  GET Typeparq
=========================================================================*/

/** =====================================================================
 *  CREATE Typeparq
=========================================================================*/
const createTypeparq = async(req, res = response) => {

    const name = req.body.name;

    try {

        // VALIDATE Typeparq
        const validateTypeparq = await Typeparq.findOne({ name });
        if (validateTypeparq) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una categoria de parqueo con este nombre'
            });
        }

        // SAVE Typeparq
        const typeparq = new Typeparq(req.body);
        await typeparq.save();

        const typeparqDB = await Typeparq.findById(typeparq._id)
            .populate('tax');

        typeparqDB.tpid = typeparq._id;

        res.json({
            ok: true,
            typeparq: typeparqDB
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
 *  CREATE Typeparq
=========================================================================*/
/** =====================================================================
 *  UPDATE Typeparq
=========================================================================*/
const updateTypeparq = async(req, res = response) => {

    const tpid = req.params.id;

    try {

        // SEARCH Typeparq
        const typeparqDB = await Typeparq.findById({ _id: tpid });
        if (!typeparqDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna categoria con este ID'
            });
        }
        // SEARCH Typeparq

        // VALIDATE Typeparq
        const { name, ...campos } = req.body;
        if (typeparqDB.name !== name) {
            const validateTypeparq = await Typeparq.findOne({ name });
            if (validateTypeparq) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un departamento con este nombre'
                });
            }
        }

        // UPDATE
        campos.name = name;
        await Typeparq.findByIdAndUpdate(tpid, campos, { new: true, useFindAndModify: false });

        const typeparq = await Typeparq.findById(tpid)
            .populate('tax');

        res.json({
            ok: true,
            typeparq
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
 *  UPDATE Typeparq
=========================================================================*/

// EXPORTS
module.exports = {
    getTypeparq,
    createTypeparq,
    updateTypeparq,
};