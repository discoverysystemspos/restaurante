const { response } = require('express');

const Banco = require('../models/bancos.model');

/** =====================================================================
 *  GET BANCOS
=========================================================================*/
const getBancos = async(req, res = response) => {

    try {

        const [bancos, total] = await Promise.all([
            Banco.find(),
            Banco.countDocuments()
        ]);

        res.json({
            ok: true,
            bancos,
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
 *  GET BANCOS
=========================================================================*/

/** =====================================================================
 *  GET BANCO ID
=========================================================================*/
const getBancoId = async(req, res = response) => {

    const baid = req.params.id;

    try {

        const banco = await Banco.findById(baid);
        if (!banco) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun banco con este ID'
            });
        }

        res.json({
            ok: true,
            banco
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
 *  GET BANCO ID
=========================================================================*/

/** =====================================================================
 *  CREATE BANCO
=========================================================================*/
const createBanco = async(req, res = response) => {

    const name = req.body.name;

    try {

        // VALIDATE NAME
        const validateBanco = await Banco.findOne({ name });
        if (validateBanco) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un banco con este nombre'
            });
        }

        // SAVE DEPARTMENT
        const banco = new Banco(req.body);
        await banco.save();

        res.json({
            ok: true,
            banco
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
 *  CREATE BANCO
=========================================================================*/
/** =====================================================================
 *  UPDATE BANCO
=========================================================================*/
const updateBanco = async(req, res = response) => {

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
 *  UPDATE BANCO
=========================================================================*/

/** =====================================================================
 *  DELETE BANCO
=========================================================================*/
const deleteBanco = async(req, res = response) => {

    const baid = req.params.id;

    try {

        // SEARCH CAJA
        const bancoDB = await Banco.findById(baid);
        if (!bancoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun banco con este ID'
            });
        }
        // SEARCH CAJA

        // CHANGE STATUS
        if (bancoDB.status === true) {
            bancoDB.status = false;
        } else {
            bancoDB.status = true;
        }
        // CHANGE STATUS

        const bancoUpdate = await Banco.findByIdAndUpdate(baid, bancoDB, { new: true, useFindAndModify: false });

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
 *  DELETE DEPARTMENT
=========================================================================*/

// EXPORTS
module.exports = {
    getBancos,
    createBanco,
    updateBanco,
    deleteBanco,
    getBancoId
};