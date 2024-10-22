/** =====================================================================
 *  CALENDARIO ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getCalendario, createCalendario, deleteCalendario } = require('../controllers/calendario.controller');

const router = Router();

/** =====================================================================
 *  GET CALENDARIO
=========================================================================*/
router.get('/', getCalendario);
/** =====================================================================
 *  GET CALENDARIO
=========================================================================*/

/** =====================================================================
 *  CREATE CALENDARIO
=========================================================================*/
router.post('/', [
        validarJWT,
        check('start', 'La fecha de inicio es obligatoria').not().isEmpty(),
        check('end', 'La fecha final es obligatoria').not().isEmpty(),
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createCalendario
);
/** =====================================================================
 *  CREATE CALENDARIO
=========================================================================*/

/** =====================================================================
 *  DELETE CALENDARIO
=========================================================================*/
router.delete('/:id', validarJWT, deleteCalendario);
/** =====================================================================
 *  DELETE CALENDARIO
=========================================================================*/

// EXPORTS
module.exports = router;