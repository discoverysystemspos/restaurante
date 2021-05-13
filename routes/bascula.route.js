/** =====================================================================
 *  BASCULA ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getPeso } = require('../controllers/bascula.controller');

const router = Router();

/** =====================================================================
 *  GET BASCULA
=========================================================================*/
router.get('/', validarJWT, getPeso);
/** =====================================================================
 *  GET BASCULA
=========================================================================*/

// EXPORTS
module.exports = router;