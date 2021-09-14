/** =====================================================================
 *  CATEGORIAS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getCategorias, createCategoria, updateCategoria, deleteCategoria } = require('../controllers/categorias.controller');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER

const router = Router();

/** =====================================================================
 *  GET CATEGORIAS
=========================================================================*/
router.get('/', getCategorias);
/** =====================================================================
 *  GET CATEGORIAS
=========================================================================*/

/** =====================================================================
 *  CREATE CATEGORIAS
=========================================================================*/
router.post('/', [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createCategoria
);
/** =====================================================================
 *  CREATE CATEGORIAS
=========================================================================*/

/** =====================================================================
 *  UPDATE CATEGORIAS
=========================================================================*/
router.put('/:id', [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateCategoria
);
/** =====================================================================
 *  UPDATE CATEGORIAS
=========================================================================*/

/** =====================================================================
 *  DELETE CATEGORIAS
=========================================================================*/
router.delete('/:id', validarJWT, deleteCategoria);
/** =====================================================================
 *  DELETE CATEGORIAS
=========================================================================*/

// EXPORTS
module.exports = router;