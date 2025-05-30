/** =====================================================================
 *  TAX ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getTaxes, getTaxId, createTax, updateTax, deleteTax } = require('../controllers/tax.controller');

const router = Router();

/** =====================================================================
 *  GET TAXES
=========================================================================*/
router.get('/', validarJWT, getTaxes);
/** =====================================================================
 *  GET TAXES
=========================================================================*/

/** =====================================================================
 *  GET TAX ID
=========================================================================*/
router.get('/impuesto/:id', validarJWT, getTaxId);
/** =====================================================================
 *  GET TAX ID
=========================================================================*/

/** =====================================================================
 *  CREATE TAX
=========================================================================*/
router.post('/', [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createTax
);
/** =====================================================================
 *  CREATE TAX
=========================================================================*/

/** =====================================================================
 *  UPDATE TAX
=========================================================================*/
router.put('/:id', [
        validarJWT,
        validarCampos
    ],
    updateTax
);
/** =====================================================================
 *  UPDATE TAX
=========================================================================*/

/** =====================================================================
 *  DELETE TAX
=========================================================================*/
router.delete('/:id', validarJWT, deleteTax);
/** =====================================================================
 *  DELETE TAX
=========================================================================*/

// EXPORTS
module.exports = router;