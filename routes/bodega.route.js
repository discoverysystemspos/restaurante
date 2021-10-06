/** =====================================================================
 *  BODEGAS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getBodega, createBodega, updateBodega, deleteBodega } = require('../controllers/bodega.controller');

const router = Router();

/** =====================================================================
 *  GET BODEGAS
=========================================================================*/
router.get('/', getBodega);
/** =====================================================================
 *  GET BODEGAS
=========================================================================*/

/** =====================================================================
 *  CREATE BODEGAS
=========================================================================*/
router.post('/', [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createBodega
);
/** =====================================================================
 *  CREATE BODEGAS
=========================================================================*/

/** =====================================================================
 *  UPDATE BODEGAS
=========================================================================*/
router.put('/:id', [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateBodega
);
/** =====================================================================
 *  UPDATE BODEGAS
=========================================================================*/

/** =====================================================================
 *  DELETE BODEGAS
=========================================================================*/
router.delete('/:id', validarJWT, deleteBodega);
/** =====================================================================
 *  DELETE BODEGAS
=========================================================================*/

// EXPORTS
module.exports = router;