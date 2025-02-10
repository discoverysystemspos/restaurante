/** =====================================================================
 *  TURNOS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getMovimientos, getMovimientosDate, createMovimiento, getMovimientosQuery } = require('../controllers/movimientos.controller');

const router = Router();

/** =====================================================================
 *  GET MOVIMIENTOS 
=========================================================================*/
router.get('/', validarJWT, getMovimientos);

/** =====================================================================
 *  GET MOVIMIENTOS FOR BY DATE
=========================================================================*/
router.get('/date/', validarJWT, getMovimientosDate);

/** =====================================================================
 *  POST QUERY MOVIMIENTO
=========================================================================*/
router.post('/query', validarJWT, getMovimientosQuery);

/** =====================================================================
 *  CREATE MOVIMIENTO
=========================================================================*/
router.post('/', validarJWT, createMovimiento);

// EXPORTS
module.exports = router;