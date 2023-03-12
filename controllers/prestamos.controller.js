const { response } = require('express');

const Prestamo = require('../models/prestamos.model');

/** =====================================================================
 *  GET PRESTAMOS
=========================================================================*/
const getPrestamos = async(req, res = response) => {

    try {

        const desde = Number(req.query.desde) || 0;
        const hasta = Number(req.query.hasta) || 0;
        const status = Boolean(req.query.status) || true;
        const completo = Boolean(req.query.completo) || false;

        const [prestamos, total] = await Promise.all([
            Prestamo.find({ status, completo })
            .populate('client')
            .limit(hasta)
            .skip(desde),
            Prestamo.countDocuments()
        ]);

        res.json({
            ok: true,
            prestamos,
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
 *  GET PRESTAMOS
=========================================================================*/

/** =====================================================================
 *  GET PRESTAMO ID
=========================================================================*/
const getPrestamoId = async(req, res = response) => {

    const presid = req.params.id;

    try {

        const prestamo = await Prestamo.findById(presid).populate('client');
        if (!prestamo) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun prestamo con este ID'
            });
        }

        res.json({
            ok: true,
            prestamo
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
 *  GET PRESTAMO ID
=========================================================================*/

/** =====================================================================
 *  GET PRESTAMO DATE
=========================================================================*/
const getPrestamosDates = async(req, res = response) => {

    try {

        const dia = Number(req.params.fecha);

        const prestamos = await Prestamo.find({ vence: { $lte: dia }, status: true, completo: false })
            .populate('client');


        res.json({
            ok: true,
            prestamos
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
 *  GET PRESTAMO DATE
=========================================================================*/

/** =====================================================================
 *  CREATE PRESTAMO
=========================================================================*/
const createPrestamo = async(req, res = response) => {

    try {

        // SAVE DEPARTMENT
        const prestamo = new Prestamo(req.body);
        await prestamo.save();

        const prestamoNew = await Prestamo.findById(prestamo._id).populate('client');

        res.json({
            ok: true,
            prestamo: prestamoNew
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
 *  CREATE PRESTAMO
=========================================================================*/
/** =====================================================================
 *  UPDATE PRESTAMO
=========================================================================*/
const updatePrestamo = async(req, res = response) => {

    const presid = req.params.id;

    try {

        // SEARCH DEPARTMENT
        const prestamoDB = await Prestamo.findById({ _id: presid });
        if (!prestamoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun prestamo con este ID'
            });
        }
        // SEARCH DEPARTMENT

        // VALIDATE DEPARTMENT
        const {...campos } = req.body;

        // UPDATE
        const prestamoUpdate = await Prestamo.findByIdAndUpdate(presid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            prestamo: prestamoUpdate
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
 *  UPDATE PRESTAMO
=========================================================================*/

/** =====================================================================
 *  DELETE PRESTAMO
=========================================================================*/
const deletePrestamo = async(req, res = response) => {

    const presid = req.params.id;

    try {

        // SEARCH CAJA
        const prestamoDB = await Prestamo.findById(presid);
        if (!prestamoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun prestamo con este ID'
            });
        }
        // SEARCH CAJA

        // CHANGE STATUS
        if (prestamoDB.status === true) {
            prestamoDB.status = false;
        } else {
            prestamoDB.status = true;
        }
        // CHANGE STATUS

        const prestamoUpdate = await Prestamo.findByIdAndUpdate(baid, prestamoDB, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            prestamo: prestamoUpdate
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
    getPrestamos,
    createPrestamo,
    updatePrestamo,
    deletePrestamo,
    getPrestamoId,
    getPrestamosDates
};