/** =====================================================================
 *  PARQUEO ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getTraslados, getTrasladosId, createTraslado, updateTraslado } = require('../controllers/traslados.controller');

const router = Router();

/** =====================================================================
 *  GET COMPRA
=========================================================================*/
router.post('/query', getTraslados);

/** =====================================================================
 *  GET COMPRA ID
=========================================================================*/
router.get('/one/:id', getTrasladosId);

/** =====================================================================
 *  CREATE PARQUEO
=========================================================================*/
router.post('/', [
        validarJWT,
        validarCampos
    ],
    createTraslado
);

/** =====================================================================
 *  UPDATE PARQUEO
=========================================================================*/
router.put('/:id', validarJWT, updateTraslado);

// EXPORTS
module.exports = router;