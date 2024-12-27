/** =====================================================================
 *  COMPRAS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getCompras, getComprasId, createCompras, updateCompras, returnCompra } = require('../controllers/compras.controller');

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
 *  CREATE 
=========================================================================*/
router.post('/', [
        validarJWT,
        validarCampos
    ],
    createCompras
);

/** =====================================================================
 *  UPDATE
=========================================================================*/
router.put('/:id', validarJWT, updateCompras);

/** =====================================================================
 *  RETURN COMPRA
=========================================================================*/
router.delete('/:id', validarJWT, returnCompra);

// EXPORTS
module.exports = router;