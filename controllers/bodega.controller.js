const { response } = require('express');

const Bodega = require('../models/bodega.model');

/** =====================================================================
 *  GET BODEGA
=========================================================================*/
const getBodega = async(req, res = response) => {

    try {

        const { desde, hasta, ...query } = req.body;

        const [bodegas, total] = await Promise.all([
            Bodega.find(query)
            .skip(desde)
            .limit(hasta),
            Bodega.countDocuments()
        ]);

        res.json({
            ok: true,
            bodegas,
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
 *  GET BODEGAS
=========================================================================*/

/** =====================================================================
 *  CREATE BODEGA
=========================================================================*/
const createBodega = async(req, res = response) => {

    const name = req.body.name;

    try {

        // VALIDATE BODEGA
        const validateBodega = await Bodega.findOne({ name });
        if (validateBodega) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una bodega con este nombre'
            });
        }

        // SAVE BODEGA
        const bodega = new Bodega(req.body);
        await bodega.save();

        res.json({
            ok: true,
            bodega
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
 *  CREATE BODEGA
=========================================================================*/
/** =====================================================================
 *  UPDATE BODEGA
=========================================================================*/
const updateBodega = async(req, res = response) => {

    const bid = req.params.id;

    try {

        // SEARCH BODEGA
        const bodegaDB = await Bodega.findById({ _id: bid });
        if (!bodegaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna bodega con este ID'
            });
        }
        // SEARCH BODEGA

        // VALIDATE BODEGA
        const { name, ...campos } = req.body;
        if (bodegaDB.name !== name) {

            const validateBodega = await Bodega.findOne({ name });
            if (validateBodega) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una bodega con este nombre'
                });
            }
        }

        // UPDATE
        campos.name = name;
        const bodegaUpdate = await Bodega.findByIdAndUpdate(bid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            bodega: bodegaUpdate
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
 *  UPDATE BODEGA
=========================================================================*/

/** =====================================================================
 *  DELETE BODEGA
=========================================================================*/
const deleteBodega = async(req, res = response) => {

    const bid = req.params.id;

    try {

        // SEARCH BODEGA
        const bodegaDB = await Bodega.findById({ _id: bid });
        if (!bodegaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna bodega con este ID'
            });
        }
        // SEARCH BODEGA

        // CHANGE STATUS
        if (bodegaDB.status === true) {
            bodegaDB.status = false;
        } else {
            bodegaDB.status = true;
        }
        // CHANGE STATUS

        const bodegaUpdate = await Bodega.findByIdAndUpdate(bid, bodegaDB, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            bodega: bodegaUpdate
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
 *  DELETE DEPARTMENT
=========================================================================*/

// EXPORTS
module.exports = {
    getBodega,
    createBodega,
    updateBodega,
    deleteBodega
};