const { response } = require('express');

const Mesas = require('../models/mesas.model');

/** =====================================================================
 *  GET MESA
=========================================================================*/
const getMesas = async(req, res = response) => {

    try {

        const [mesas, total] = await Promise.all([
            Mesas.find()
            .populate('mesero', 'name'),
            Mesas.countDocuments()
        ]);

        res.json({
            ok: true,
            mesas,
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
 *  GET MESA ID
=========================================================================*/
const getMesaId = async(req, res = response) => {

    const id = req.params.id;

    try {

        const mesa = await Mesas.findById(id)
            .populate('carrito.product', 'name')
            .populate('cliente', 'name cedula phone email address city cid')
            .populate('mesero', 'name');

        res.json({
            ok: true,
            mesa
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
 *  CREATE MESA
=========================================================================*/
const createMesas = async(req, res = response) => {

    const name = req.body.name;

    try {

        // VALIDATE DEPARTMENT
        const validateMesas = await Mesas.findOne({ name });
        if (validateMesas) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una mesa con este numero'
            });
        }

        // SAVE DEPARTMENT
        const mesa = new Mesas(req.body);
        await mesa.save();

        res.json({
            ok: true,
            mesa
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
 *  CREATE MESA
=========================================================================*/
/** =====================================================================
 *  UPDATE MESA
=========================================================================*/
const updateMesa = async(req, res = response) => {

    const mid = req.params.id;

    try {

        // SEARCH MESA
        const mesaDB = await Mesas.findById({ _id: mid });
        if (!mesaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna mesa con este ID'
            });
        }
        // SEARCH MESA

        // VALIDATE MESA
        const {...campos } = req.body;

        if (campos.carrito) {

            if (campos.carrito.length > 0) {
                campos.disponible = false;
            } else {
                campos.disponible = true;
            }
        }

        // UPDATE
        const mesaUpdate = await Mesas.findByIdAndUpdate(mid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            mesa: mesaUpdate
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
 *  UPDATE MESA
=========================================================================*/


// /** =====================================================================
//  *  DELETE DEPARTMENT
// =========================================================================*/
// const deleteDepartment = async(req, res = response) => {

//     const did = req.params.id;

//     try {

//         // SEARCH DEPARTMENT
//         const departmentDB = await Department.findById({ _id: did });
//         if (!departmentDB) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'No existe ningun usuario con este ID'
//             });
//         }
//         // SEARCH DEPARTMENT

//         // CHANGE STATUS
//         if (departmentDB.status === true) {
//             departmentDB.status = false;
//         } else {
//             departmentDB.status = true;
//         }
//         // CHANGE STATUS

//         const departmentUpdate = await Department.findByIdAndUpdate(did, departmentDB, { new: true, useFindAndModify: false });

//         res.json({
//             ok: true,
//             department: departmentUpdate
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
    getMesas,
    createMesas,
    getMesaId,
    updateMesa
};