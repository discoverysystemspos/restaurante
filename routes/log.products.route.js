/** =====================================================================
 *  LOG PRODUCTS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getLogProducts } = require('../controllers/log.products.controller');

const router = Router();

/** =====================================================================
 *  GET LOG PRODUCTS
=========================================================================*/
router.get('/', validarJWT, getLogProducts);
/** =====================================================================
 *  GET LOG PRODUCTS
=========================================================================*/


// EXPORTS
module.exports = router;