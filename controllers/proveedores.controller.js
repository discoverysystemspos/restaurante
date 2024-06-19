const { response } = require('express');

const Proveedor = require('../models/proveedores.model');


/** =====================================================================
 *  GET PROVEEDORES
=========================================================================*/
const getProveedores = async(req, res = response) => {

    try {

        const desde = Number(req.query.desde) || 0;

        const [proveedores, total] = await Promise.all([

            Proveedor.find()
            .skip(desde)
            .limit(10),

            Proveedor.countDocuments()
        ]);

        res.json({
            ok: true,
            proveedores,
            total
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente de nuevo'
        });

    }

};
/** =====================================================================
 *  GET PROVEEDORES
=========================================================================*/
/** =====================================================================
 *  CREATE CLIENT
=========================================================================*/
const createProveedor = async(req, res = response) => {

    const cedula = req.body.cedula;

    try {

        // VALIDATE CEDULA
        const validarCedula = await Proveedor.findOne({ cedula });
        if (validarCedula) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con este numero de NIT ó Cedula de ciudadania'
            });
        }

        // SAVE Proveedor
        const proveedor = new Proveedor(req.body);
        await proveedor.save();

        res.json({
            ok: true,
            proveedor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};
/** =====================================================================
 *  CREATE PROVEEDOR
=========================================================================*/

/** =====================================================================
 *  UPDATE PROVEEDOR
=========================================================================*/
const updateProveedor = async(req, res = response) => {

    const provid = req.params.id;

    try {

        // SEARCH CLIENT
        const proveedorDB = await Proveedor.findById({ _id: provid });
        if (!proveedorDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun usuario con este ID'
            });
        }
        // SEARCH CLIENT

        // VALIDATE CEDULA
        const { cedula, ...campos } = req.body;
        if (proveedorDB.cedula !== cedula) {
            const validarCedula = await Proveedor.findOne({ cedula });
            if (validarCedula) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un proveedor con este numero de identificación'
                });
            }
        }

        // UPDATE
        campos.cedula = cedula;
        const proveedorUpdate = await Proveedor.findByIdAndUpdate(provid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            proveedor: proveedorUpdate
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

// /** =====================================================================
//  *  UPDATE CLIENT
// =========================================================================*/

// /** =====================================================================
//  *  DELETE CLIENT
// =========================================================================*/
// const deleteClient = async(req, res = response) => {

//     const cid = req.params.id;

//     try {

//         // SEARCH CLIENT
//         const clientDB = await Client.findById({ _id: cid });
//         if (!clientDB) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'No existe ningun usuario con este ID'
//             });
//         }
//         // SEARCH CLIENT
//         await Client.findByIdAndDelete({ _id: cid });

//         res.json({
//             ok: true,
//             msg: 'Cliente eliminado con exito'
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
//  *  DELETE CLIENT
// =========================================================================*/



// EXPORTS
module.exports = {
    getProveedores,
    createProveedor,
    updateProveedor
};