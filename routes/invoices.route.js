/** =====================================================================
 *  INVOICE ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getInvoices, createInvoice, getInvoiceId, getInvoicesDate, returnInvoice, updateInvoice } = require('../controllers/invoices.controller');

const router = Router();

/** =====================================================================
 *  GET INVOICES
=========================================================================*/
router.get('/', validarJWT, getInvoices);
/** =====================================================================
 *  GET INVOICES
=========================================================================*/

/** =====================================================================
 *  GET INVOICES DATE
=========================================================================*/
router.get('/date/:fecha', validarJWT, getInvoicesDate);
/** =====================================================================
 *  GET INVOICES DATE
=========================================================================*/

/** =====================================================================
 *  GET INVOICES ID
=========================================================================*/
router.get('/:id', validarJWT, getInvoiceId);
/** =====================================================================
 *  GET INVOICES ID
=========================================================================*/

/** =====================================================================
 *  CREATE INVOICE
=========================================================================*/
router.post('/:turno', [

        validarJWT,
        check('client', 'EL ID del cliente debe ser correcto').isMongoId(),
        check('type', 'Tienes que especificar que metodo de pago uso').not().isEmpty(),
        check('amount', 'El monto es obligatorio').not().isEmpty(),
        check('products', 'No ha seleccionado ningun producto').not().isEmpty(),
        validarCampos

    ],
    createInvoice);
/** =====================================================================
*  CREATE INVOICE
=========================================================================*/

/** =====================================================================
*  PUT INVOICE
=========================================================================*/
router.put('/:id', validarJWT, updateInvoice);
/** =====================================================================
*  PUT INVOICE
=========================================================================*/

/** =====================================================================
*  RETURN INVOICE
=========================================================================*/
router.delete('/:id', validarJWT, returnInvoice);
/** =====================================================================
*  RETURN INVOICE
=========================================================================*/








// EXPORT
module.exports = router;