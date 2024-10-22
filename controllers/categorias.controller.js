const { response } = require('express');

const Categoria = require('../models/categorias.model');

/** =====================================================================
 *  GET CATEGORIAS
=========================================================================*/
const getCategorias = async(req, res = response) => {

    try {

        const [categorias, total] = await Promise.all([
            Categoria.find()
            .populate('department.department', 'name did'),
            Categoria.countDocuments()
        ]);

        res.json({
            ok: true,
            categorias,
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
 *  GET CATEGORIAS
=========================================================================*/

/** =====================================================================
 *  CREATE CATEGORIAS
=========================================================================*/
const createCategoria = async(req, res = response) => {

    const name = req.body.name;

    try {

        // VALIDATE CATEGORIA
        const validateCategoria = await Categoria.findOne({ name });
        if (validateCategoria) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una categoria con este nombre'
            });
        }

        // SAVE CATEGORIA
        const categoria = new Categoria(req.body);
        await categoria.save();

        res.json({
            ok: true,
            categoria
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
 *  CREATE CATEGORIA
=========================================================================*/
/** =====================================================================
 *  UPDATE CATEGORIA
=========================================================================*/
const updateCategoria = async(req, res = response) => {

    const catid = req.params.id;

    try {

        // SEARCH CATEGORIA
        const categoriaDB = await Categoria.findById({ _id: catid });
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna categoria con este ID'
            });
        }
        // SEARCH CATEGORIA

        // VALIDATE CATEGORIA
        const { name, ...campos } = req.body;
        if (categoriaDB.name !== name) {

            const validateCategoria = await Categoria.findOne({ name });
            if (validateCategoria) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una categoria con este nombre'
                });
            }
        }

        // UPDATE
        campos.name = name;
        const categoriaUpdate = await Categoria.findByIdAndUpdate(catid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            categoria: categoriaUpdate
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
 *  UPDATE CATEGORIA
=========================================================================*/

/** =====================================================================
 *  DELETE CATEGORIA
=========================================================================*/
const deleteCategoria = async(req, res = response) => {

    const catid = req.params.id;

    try {

        // SEARCH CATEGORIA
        const categoriaDB = await Categoria.findById({ _id: catid });
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna categoria con este ID'
            });
        }
        // SEARCH CATEGORIA

        // CHANGE STATUS
        if (categoriaDB.status === true) {
            categoriaDB.status = false;
        } else {
            categoriaDB.status = true;
        }
        // CHANGE STATUS

        const categoriaUpdate = await Categoria.findByIdAndUpdate(catid, categoriaDB, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            categoria: categoriaUpdate
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
 *  DELETE CATEGORIA
=========================================================================*/

// EXPORTS
module.exports = {
    getCategorias,
    createCategoria,
    updateCategoria,
    deleteCategoria
};