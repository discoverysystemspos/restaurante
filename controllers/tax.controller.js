const { response } = require('express');

const Tax = require('../models/tax.model');

/** =====================================================================
 *  GET TAXES
=========================================================================*/
const getTaxes = async(req, res = response) => {

    try {

        const [taxes, total] = await Promise.all([
            Tax.find(),
            Tax.countDocuments()
        ]);

        res.json({
            ok: true,
            taxes,
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
 *  GET TAXES
=========================================================================*/

/** =====================================================================
 *  GET TAX ID
=========================================================================*/
const getTaxId = async(req, res = response) => {

    const taxid = req.params.id;

    try {

        const tax = await Tax.findById(taxid);
        if (!tax) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun impuesto con este ID'
            });
        }

        res.json({
            ok: true,
            tax
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
 *  GET TAX ID
=========================================================================*/

/** =====================================================================
 *  CREATE TAX
=========================================================================*/
const createTax = async(req, res = response) => {

    const name = req.body.name;

    try {

        // VALIDATE NAME
        const validateTax = await Tax.findOne({ name });
        if (validateTax) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un impuesto con este nombre'
            });
        }

        // SAVE DEPARTMENT
        const tax = new Tax(req.body);
        await tax.save();

        res.json({
            ok: true,
            tax
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
 *  CREATE TAX
=========================================================================*/
/** =====================================================================
 *  UPDATE TAX
=========================================================================*/
const updateTax = async(req, res = response) => {

    const taxid = req.params.id;

    try {

        // SEARCH DEPARTMENT
        const taxDB = await Tax.findById({ _id: taxid });
        if (!taxDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun impuesto con este ID'
            });
        }
        // SEARCH DEPARTMENT

        // VALIDATE DEPARTMENT
        const { name, ...campos } = req.body;
        if (taxDB.name !== name) {
            const cajaDepartment = await Tax.findOne({ name });
            if (cajaDepartment) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un impuesto con este nombre'
                });
            }
        }

        // UPDATE
        campos.name = name;
        const taxUpdate = await Tax.findByIdAndUpdate(taxid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            tax: taxUpdate
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
 *  UPDATE TAX
=========================================================================*/

/** =====================================================================
 *  DELETE TAX
=========================================================================*/
const deleteTax = async(req, res = response) => {

    const taxid = req.params.id;

    try {

        // SEARCH CAJA
        const taxDB = await Tax.findById({ _id: taxid });
        if (!taxDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun impuesto con este ID'
            });
        }
        // SEARCH CAJA

        // CHANGE STATUS
        if (taxDB.status === true) {
            taxDB.status = false;
        } else {
            taxDB.status = true;
        }
        // CHANGE STATUS

        const taxUpdate = await Tax.findByIdAndUpdate(taxid, taxDB, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            tax: taxUpdate
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
    getTaxes,
    createTax,
    updateTax,
    deleteTax,
    getTaxId
};