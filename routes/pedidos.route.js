/** =====================================================================
 *  PEDIDOS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarClientJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getPedidos, postPedidos } = require('../controllers/pedidos.controller');

const router = Router();

/** =====================================================================
 *  GET PEDIDOS
=========================================================================*/
router.get('/', validarJWT, getPedidos);
/** =====================================================================
 *  GET PEDIDOS
=========================================================================*/

/** =====================================================================
 *  CREATE PEDIDOS
=========================================================================*/
router.post('/', [
        validarClientJWT,
        check('client', 'EL ID del cliente debe ser correcto').isMongoId(),
        check('products', 'No ha seleccionado ningun producto').not().isEmpty(),
        validarCampos
    ],
    postPedidos);
/** =====================================================================
*  CREATE PEDIDOS
=========================================================================*/

// EXPORT
module.exports = router;