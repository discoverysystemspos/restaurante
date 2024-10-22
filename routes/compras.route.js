/** =====================================================================
 *  PARQUEO ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getCompras, getComprasId, createCompras, updateCompras } = require('../controllers/compras.controller');

const router = Router();

/** =====================================================================
 *  GET COMPRA
=========================================================================*/
router.post('/query', getCompras);

/** =====================================================================
 *  GET COMPRA ID
=========================================================================*/
router.get('/one/:id', getComprasId);

/** =====================================================================
 *  CREATE PARQUEO
=========================================================================*/
router.post('/', [
        validarJWT,
        validarCampos
    ],
    createCompras
);

/** =====================================================================
 *  UPDATE PARQUEO
=========================================================================*/
router.put('/:id', validarJWT, updateCompras);

// EXPORTS
module.exports = router;