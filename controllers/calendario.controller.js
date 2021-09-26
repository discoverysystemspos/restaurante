const { response } = require('express');

const Calendario = require('../models/calendario.model');

/** =====================================================================
 *  GET CALENDARIO
=========================================================================*/
const getCalendario = async(req, res = response) => {

    try {

        const [calendarios, total] = await Promise.all([
            Calendario.find()
            .populate('user', 'name uid'),
            Calendario.countDocuments()
        ]);

        res.json({
            ok: true,
            calendarios,
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
 *  GET CALENDARIO
=========================================================================*/

/** =====================================================================
 *  CREATE CALENDARIO
=========================================================================*/
const createCalendario = async(req, res = response) => {

    const user = req.uid;

    try {


        // SAVE CATEGORIA
        const calendario = new Calendario(req.body);
        calendario.user = user;
        await calendario.save();

        res.json({
            ok: true,
            calendario
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
 *  CREATE CALENDARIO
=========================================================================*/
/** =====================================================================
 *  UPDATE CALENDARIO
=========================================================================*/
// const updateCategoria = async(req, res = response) => {

//     const catid = req.params.id;

//     try {

//         // SEARCH CATEGORIA
//         const categoriaDB = await Categoria.findById({ _id: catid });
//         if (!categoriaDB) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'No existe ninguna categoria con este ID'
//             });
//         }
//         // SEARCH CATEGORIA

//         // VALIDATE CATEGORIA
//         const { name, ...campos } = req.body;
//         if (categoriaDB.name !== name) {

//             const validateCategoria = await Categoria.findOne({ name });
//             if (validateCategoria) {
//                 return res.status(400).json({
//                     ok: false,
//                     msg: 'Ya existe una categoria con este nombre'
//                 });
//             }
//         }

//         // UPDATE
//         campos.name = name;
//         const categoriaUpdate = await Categoria.findByIdAndUpdate(catid, campos, { new: true, useFindAndModify: false });

//         res.json({
//             ok: true,
//             categoria: categoriaUpdate
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             msg: 'Error inesperado, porfavor intente nuevamente'
//         });
//     }

// };
// /** =====================================================================
//  *  UPDATE CALENDARIO
// =========================================================================*/

/** =====================================================================
 *  DELETE CALENDARIO
=========================================================================*/
const deleteCalendario = async(req, res = response) => {

    const _id = req.params.id;

    try {

        // SEARCH PRODUCT
        const calendarioDB = await Calendario.findById({ _id });
        if (!calendarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun evento con este ID'
            });
        }
        // SEARCH PRODUCT
        await Calendario.findByIdAndDelete({ _id });

        res.json({
            ok: true,
            msg: 'El evento se ha eliminado con exito!'
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
 *  DELETE CALENDARIO
=========================================================================*/

// EXPORTS
module.exports = {
    getCalendario,
    createCalendario,
    deleteCalendario
};