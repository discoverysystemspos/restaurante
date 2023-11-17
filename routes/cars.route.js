/** =====================================================================
 *  TYPEPARQ ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getCars, createCar, updateCar, getOneCar } = require('../controllers/cars.controller');

const router = Router();

/** =====================================================================
 *  GET CAR
=========================================================================*/
router.post('/query', getCars);

/** =====================================================================
 *  GET CAR
=========================================================================*/
router.get('/car/:placa', getOneCar);

/** =====================================================================
 *  CREATE CAR
=========================================================================*/
router.post('/', [
        validarJWT,
        check('placa', 'La placa es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createCar
);

/** =====================================================================
 *  UPDATE CAR
=========================================================================*/
router.put('/:id', validarJWT, updateCar);

// EXPORTS
module.exports = router;