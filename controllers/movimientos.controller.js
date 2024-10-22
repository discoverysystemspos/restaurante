const { response } = require('express');
const Movimiento = require('../models/movimientos.model');

/** =====================================================================
 *  GET MOVIMIENTOS
=========================================================================*/
const getMovimientos = async(req, res = response) => {

    try {

        const desde = Number(req.query.desde) || 0;
        const hasta = Number(req.query.limite) || 50;

        const [movimientos, total] = await Promise.all([
            Movimiento.find()
            .populate('user', 'name')
            .sort({ 'fecha': -1 })
            .skip(desde)
            .limit(hasta),
            Movimiento.countDocuments()
        ]);

        res.json({
            ok: true,
            movimientos,
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
 *  GET MOVIMIENTOS
=========================================================================*/
/** =====================================================================
 *  GET TURNOS 
=========================================================================*/
const getMovimientosDate = async(req, res = response) => {

    const initial = req.query.initial;
    const end = req.query.end;

    try {

        const [movimientos, total] = await Promise.all([

            Movimiento.find({
                $and: [{ fecha: { $gte: new Date(initial), $lt: new Date(end) } }]
            })
            .populate('user', 'name')
            .sort({ 'fecha': -1 }),
            Movimiento.countDocuments()
        ]);

        res.json({
            ok: true,
            movimientos,
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
 *  GET TURNO
=========================================================================*/

/** =====================================================================
 *  CREATE TURNO
=========================================================================*/
const createMovimiento = async(req, res = response) => {


    try {

        const uid = req.uid;

        const movimiento = new Movimiento(req.body);
        movimiento.user = uid;

        await movimiento.save();

        const movimientoDB = await Movimiento.findById(movimiento._id)
            .populate('user');

        res.json({
            ok: true,
            movimiento: movimientoDB
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
 *  CREATE TURNO
=========================================================================*/
/** =====================================================================
 *  UPDATE CAJA
=========================================================================*/
// const updateTurno = async(req, res = response) => {

//     const tid = req.params.id;
//     const uid = req.uid;

//     try {

//         // SEARCH DEPARTMENT
//         const turnoDB = await Turno.findById({ _id: tid });
//         if (!turnoDB) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'No existe ningun turno con este ID'
//             });
//         }
//         // SEARCH DEPARTMENT

//         // UPDATE
//         const {...campos } = req.body;
//         const turnoUpdate = await Turno.findByIdAndUpdate(tid, campos, { new: true, useFindAndModify: false });

//         // UPDATE TURN USER
//         const userDB = await User.findById(uid);
//         if (!userDB) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'Error, el usuario no existe!'
//             });
//         }

//         userDB.cerrada = campos.cerrado;
//         const userUpdate = await User.findByIdAndUpdate(uid, userDB, { new: true, useFindAndModify: true });


//         res.json({
//             ok: true,
//             turno: turnoUpdate
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             msg: 'Error inesperado, porfavor intente nuevamente'
//         });
//     }

// };

/** =====================================================================
 *  UPDATE CAJA
=========================================================================*/

/** =====================================================================
 *  DELETE CAJA
=========================================================================*/
// const deleteCaja = async(req, res = response) => {

//     const caid = req.params.id;

//     try {

//         // SEARCH CAJA
//         const cajaDB = await Caja.findById({ _id: caid });
//         if (!cajaDB) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'No existe ningun usuario con este ID'
//             });
//         }
//         // SEARCH CAJA

//         // CHANGE STATUS
//         if (cajaDB.status === true) {
//             cajaDB.status = false;
//         } else {
//             cajaDB.status = true;
//         }
//         // CHANGE STATUS

//         const cajaUpdate = await Caja.findByIdAndUpdate(caid, cajaDB, { new: true, useFindAndModify: false });

//         res.json({
//             ok: true,
//             caja: cajaUpdate
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             msg: 'Error inesperado, porfavor intente nuevamente'
//         });
//     }

// };


/** =====================================================================
 *  DELETE DEPARTMENT
=========================================================================*/

// EXPORTS
module.exports = {
    getMovimientos,
    getMovimientosDate,
    createMovimiento,
};