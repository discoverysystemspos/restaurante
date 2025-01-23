/** =====================================================================
 *  PISO ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getQueryPisos, createPiso, updatePiso, getPisoId, deletePiso } = require('../controllers/pisos.controller');

const router = Router();

/** =====================================================================
 *  GET PISO
=========================================================================*/
router.get('/:id', validarJWT, getPisoId);

/** =====================================================================
 *  GET PISO
=========================================================================*/
router.post('/query', validarJWT, getQueryPisos);

/** =====================================================================
 *  CREATE PISO
=========================================================================*/
router.post('/', [
        validarJWT,
        check('name', 'El nombre del piso es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createPiso
);

/** =====================================================================
 *  UPDATE PISO
=========================================================================*/
router.put('/:id', validarJWT, updatePiso);

/** =====================================================================
 *  UPDATE PISO
=========================================================================*/
router.delete('/:id', validarJWT, deletePiso);

// EXPORTS
module.exports = router;