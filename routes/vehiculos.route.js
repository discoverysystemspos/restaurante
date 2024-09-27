/** =====================================================================
 *  VEHICULO ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getVehiculoQuery, createVehiculo, vehiculoUpdate } = require('../controllers/vehiculos.controller');

const router = Router();

/** =====================================================================
 *  GET VEHICULOS
=========================================================================*/
router.post('/query', validarJWT, getVehiculoQuery);

/** =====================================================================
 *  CREATE VEHICULO
=========================================================================*/
router.post('/', [
        validarJWT,
        check('placa', 'La placa del vehiculo es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createVehiculo
);

/** =====================================================================
 *  UPDATE VEHICULO
=========================================================================*/
router.put('/:id', validarJWT, vehiculoUpdate);

// EXPORTS
module.exports = router;