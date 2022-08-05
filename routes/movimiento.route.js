/** =====================================================================
 *  TURNOS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getMovimientos, getMovimientosDate, createMovimiento } = require('../controllers/movimientos.controller');

const router = Router();

/** =====================================================================
 *  GET TURNOS 
=========================================================================*/
router.get('/', validarJWT, getMovimientos);
/** =====================================================================
 *  GET TURNOS
=========================================================================*/

/** =====================================================================
 *  GET TURNOS FOR BY DATE
=========================================================================*/
router.get('/date/', validarJWT, getMovimientosDate);
/** =====================================================================
 *  GET TURNOS FOR BY DATE
=========================================================================*/

/** =====================================================================
 *  CREATE TURNO
=========================================================================*/
router.post('/', validarJWT, createMovimiento);
/** =====================================================================
 *  CREATE TURNO
=========================================================================*/

// EXPORTS
module.exports = router;