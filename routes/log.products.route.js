/** =====================================================================
 *  LOG PRODUCTS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getLogProducts, getLogDate, getOneProducLog } = require('../controllers/log.products.controller');

const router = Router();

/** =====================================================================
 *  GET LOG PRODUCTS
=========================================================================*/
router.get('/', validarJWT, getLogProducts);
/** =====================================================================
 *  GET LOG PRODUCTS
=========================================================================*/

/** =====================================================================
 *  GET LOG PRODUCTS DATE
=========================================================================*/
router.get('/query/date', validarJWT, getLogDate);
/** =====================================================================
 *  GET LOG PRODUCTS DATE
=========================================================================*/

/** =====================================================================
 *  GET LOG PRODUCT ONE
=========================================================================*/
router.get('/product/:code/date', validarJWT, getOneProducLog);
/** =====================================================================
 *  GET LOG PRODUCT ONE
=========================================================================*/


// EXPORTS
module.exports = router;