/** =====================================================================
 *  COUNTER ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getCounter, updateCounter } = require('../controllers/counters.controller');


const router = Router();

/** =====================================================================
 *  GET COUNTER
=========================================================================*/
router.get('/:field', validarJWT, getCounter);
/** =====================================================================
 *  GET COUNTER
=========================================================================*/

/** =====================================================================
 *  UPDATE COUNTER
=========================================================================*/
router.put('/:id', validarJWT, updateCounter);
/** =====================================================================
 *  UPDATE COUNTER
=========================================================================*/

// EXPORTS
module.exports = router;