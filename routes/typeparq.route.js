/** =====================================================================
 *  TYPEPARQ ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { createTypeparq, updateTypeparq, getTypeparq } = require('../controllers/typeparq.controller');

const router = Router();

/** =====================================================================
 *  GET TYPEPARQ
=========================================================================*/
router.post('/query', getTypeparq);
/** =====================================================================
 *  GET TYPEPARQ
=========================================================================*/

/** =====================================================================
 *  CREATE TYPEPARQ
=========================================================================*/
router.post('/', [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createTypeparq
);
/** =====================================================================
 *  CREATE TYPEPARQ
=========================================================================*/

/** =====================================================================
 *  UPDATE TYPEPARQ
=========================================================================*/
router.put('/:id', validarJWT, updateTypeparq);
/** =====================================================================
 *  UPDATE TYPEPARQ
=========================================================================*/

// EXPORTS
module.exports = router;