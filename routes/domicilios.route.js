/** =====================================================================
 *  PARQUEO ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getQueryDomicilio, createDomicilio, updateDomicilio } = require('../controllers/domicilios.controller');

const router = Router();

/** =====================================================================
 *  GET DOMICILIO QUERY
=========================================================================*/
router.post('/query', getQueryDomicilio);

/** =====================================================================
 *  CREATE DOMICILIO
=========================================================================*/
router.post('/', [
        validarJWT,
        validarCampos
    ],
    createDomicilio
);

/** =====================================================================
 *  UPDATE DOMICILIO
=========================================================================*/
router.put('/:id', validarJWT, updateDomicilio);

// EXPORTS
module.exports = router;