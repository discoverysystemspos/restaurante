/** =====================================================================
 *  PARQUEO ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getOneParqueo, getParqueos, createParqueo, updateParqueo } = require('../controllers/parqueo.controller');

const router = Router();

/** =====================================================================
 *  GET PARQUEO
=========================================================================*/
router.post('/query', getParqueos);

/** =====================================================================
 *  GET PARQUEO
=========================================================================*/
router.post('/car/', getOneParqueo);

/** =====================================================================
 *  CREATE PARQUEO
=========================================================================*/
router.post('/', [
        validarJWT,
        check('placa', 'La placa es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createParqueo
);

/** =====================================================================
 *  UPDATE PARQUEO
=========================================================================*/
router.put('/:id', validarJWT, updateParqueo);

// EXPORTS
module.exports = router;