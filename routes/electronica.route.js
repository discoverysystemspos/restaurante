/** =====================================================================
 *  BANCO ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { createInvoiceElectronic } = require('../controllers/electronica.controller');


const router = Router();

// /** =====================================================================
//  *  GET BANCOS
// =========================================================================*/
// router.get('/', validarJWT, getDataico);
// /** =====================================================================
//  *  GET BANCOS
// =========================================================================*/

/** =====================================================================
 *  CREATE BANCO
=========================================================================*/
router.post('/:token/:factura/:desde', validarJWT, createInvoiceElectronic);
/** =====================================================================
 *  CREATE BANCO
=========================================================================*/

// EXPORTS
module.exports = router;