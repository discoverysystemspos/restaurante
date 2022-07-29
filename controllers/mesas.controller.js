const { response } = require('express');

const Mesas = require('../models/mesas.model');

/** =====================================================================
 *  GET MESA
=========================================================================*/
const getMesas = async(req, res = response) => {

    try {

        const [mesas, total] = await Promise.all([
            Mesas.find()
            .populate('mesero', 'name')
            .populate('cliente', 'name'),
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
 *  GET MESA COMANDA
=========================================================================*/
const getMesasComanda = async(req, res = response) => {

    try {

        const mid = req.params.mid;

        const [mesas, total] = await Promise.all([
            Mesas.find({ disponible: false })
            .populate('mesero', 'name')
            .populate('cliente', 'name')
            .populate('carrito.product', 'name cost comanda tipo inventario tax impuesto')
            .populate('comanda.product', 'name cost comanda tipo')
            .sort({ fecha: -1 }),
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
            .populate('carrito.product', 'name cost comanda tipo inventario tax impuesto')
            .populate('comanda.product', 'name cost comanda tipo')
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

        // FECHAS
        inicial = new Date();
        campos.fecha = new Date();

        // UPDATE
        const mesaUpdate = await Mesas.findByIdAndUpdate(mid, campos, { new: true, useFindAndModify: false })
            .populate('carrito.product', 'name cost comanda tipo inventario tax impuesto')
            .populate('comanda.product', 'name cost comanda tipo')
            .populate('cliente', 'name cedula phone email address city cid')
            .populate('mesero', 'name');

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
/** =====================================================================
 *  UPDATE NOTA MESA
=========================================================================*/
const updateNota = async(req, res = response) => {

    try {
        const mid = req.params.id;
        const add = req.query.add;

        // SEARCH MESA
        const mesaDB = await Mesas.findById({ _id: mid });
        if (!mesaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna mesa con este ID'
            });
        }
        // SEARCH MESA

        // AGREGAR NOTA

        if (add === 'true') {
            const {...campos } = req.body;
            mesaDB.nota.push({
                nota: campos.nota,
                date: campos.date
            });

            const mesaUpdate = await Mesas.findByIdAndUpdate(mid, mesaDB, { new: true, useFindAndModify: false })
                .populate('carrito.product', 'name cost comanda tipo inventario tax impuesto')
                .populate('cliente', 'name cedula phone email address city cid')
                .populate('mesero', 'name');

            res.json({
                ok: true,
                mesa: mesaUpdate

            });

        } else {

            const nota = req.body.nota;

            const mesaUpdate = await Mesas.findByIdAndUpdate(mid, { nota }, { new: true, useFindAndModify: false })
                .populate('carrito.product', 'name cost comanda tipo inventario tax impuesto')
                .populate('cliente', 'name cedula phone email address city cid')
                .populate('mesero', 'name');

            res.json({
                ok: true,
                mesa: mesaUpdate

            });

        }

        // UPDATE


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }
};
/** =====================================================================
 *  UPDATE NOTA MESA
=========================================================================*/
/** =====================================================================
 *  UPDATE MENU
=========================================================================*/
const updateMenu = async(req, res = response) => {

    try {

        const mid = req.params.id;
        const menu = req.params.menu;

        const mesaDB = await Mesas.findById({ _id: mid });
        if (!mesaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna mesa con este ID'
            });
        }

        // ACTUALIZAMOS
        const mesaUpdate = await Mesas.findByIdAndUpdate(mid, { menu }, { new: true, useFindAndModify: false })
            .populate('carrito.product', 'name cost comanda tipo inventario tax impuesto')
            .populate('cliente', 'name cedula phone email address city cid')
            .populate('mesero', 'name');



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
 *  UPDATE MENU
=========================================================================*/


/** =====================================================================
 *  DELETE DEPARTMENT
=========================================================================*/
const deleteIngrediente = async(req, res = response) => {

    const mid = req.params.id;
    const comanda = req.params.comanda;
    const ingID = req.params.ingrediente;

    console.log(mid);
    console.log(ingID);
    console.log(comanda);

    try {

        // const mesaUpdate = await Mesas.findOneAndUpdate( mid, 
        //     { comanda: 
        //         { ingredientes: 
        //             { $pull: 
        //                 { _id: { $gte: ingID } }
        //             }
        //         } 
        //     });

        // { ingredientes: { $pull: { _id: { $gte: ingID } }}}

        const mesaUpdate = await Mesas.findOneAndUpdate(mid,

            {
                $pull:

                {
                    comanda:

                    {
                        ingredientes:

                        { _id: { $lte: ingID } }

                    }
                }
            },

            { new: true });

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
 *  DELETE DEPARTMENT
=========================================================================*/

// EXPORTS
module.exports = {
    getMesas,
    createMesas,
    getMesaId,
    updateMesa,
    getMesasComanda,
    updateNota,
    deleteIngrediente,
    updateMenu
};