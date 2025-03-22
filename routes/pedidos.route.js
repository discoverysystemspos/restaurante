/** =====================================================================
 *  PEDIDOS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarClientJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getPedidos, postPedidos, getPedidosClient, getPedidoOne, UpdateStatusPedido, postFeedBack, postPedidosLocal } = require('../controllers/pedidos.controller');

const router = Router();

/** =====================================================================
 *  GET PEDIDOS
=========================================================================*/
router.get('/', validarJWT, getPedidos);
/** =====================================================================
 *  GET PEDIDOS
=========================================================================*/

/** =====================================================================
 *  GET PEDIDOS CLIENT
=========================================================================*/
router.get('/client', validarClientJWT, getPedidosClient);
/** =====================================================================
 *  GET PEDIDOS CLIENT 
=========================================================================*/

/** =====================================================================
 *  GET PEDIDOS CLIENT
=========================================================================*/
router.get('/one/:id', validarJWT, getPedidoOne);
/** =====================================================================
 *  GET PEDIDOS CLIENT
=========================================================================*/

/** =====================================================================
 *  CREATE PEDIDOS
=========================================================================*/
router.post('/', [
        validarClientJWT,
        validarJWT,
        check('products', 'No ha seleccionado ningun producto').not().isEmpty(),
        validarCampos
    ],
    postPedidos);

/** =====================================================================
 *  CREATE PEDIDOS LOCAL
=========================================================================*/
router.post('/local', [
        validarClientJWT,
        validarJWT,
        check('products', 'No ha seleccionado ningun producto').not().isEmpty(),
        validarCampos
    ],
    postPedidosLocal);

/** =====================================================================
*  CREATE FEEDBACK
=========================================================================*/
router.post('/feedback/:id', [
    validarClientJWT
], postFeedBack);
/** =====================================================================
*  CREATE FEEDBACK
=========================================================================*/

/** =====================================================================
*  UPDATE STATUS PEDIDOS
=========================================================================*/
router.put('/:id', validarJWT, UpdateStatusPedido);
/** =====================================================================
*  UPDATE STATUS PEDIDOS
=========================================================================*/

// EXPORT
module.exports = router;