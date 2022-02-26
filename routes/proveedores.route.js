/** =====================================================================
 *  PROVEEDOR ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { createProveedor, getProveedores } = require('../controllers/proveedores.controller');

const router = Router();

/** =====================================================================
 *  GET PROVEEDOR
=========================================================================*/
router.get('/', validarJWT, getProveedores);
/** =====================================================================
 *  GET PROVEEDOR
=========================================================================*/

/** =====================================================================
 *  CREATE PROVEEDOR
=========================================================================*/
router.post('/', [
        validarJWT,
        check('name', 'El nombre es olbigatorio').not().isEmpty(),
        check('cedula', 'La Cedula es olbigatoria').not().isEmpty(),
        validarCampos
    ],
    createProveedor
);
/** =====================================================================
 *  CREATE PROVEEDOR
=========================================================================*/

// /** =====================================================================
//  *  UPDATE PROVEEDOR
// =========================================================================*/
// router.put('/:id', [
//         validarJWT,
//         check('name', 'El nombre es olbigatorio').not().isEmpty(),
//         check('cedula', 'La Cedula es olbigatoria').not().isEmpty(),
//         validarCampos
//     ],
//     updateClient
// );
// /** =====================================================================
//  *  UPDATE PROVEEDOR
// =========================================================================*/

// /** =====================================================================
//  *  DELETE PROVEEDOR
// =========================================================================*/
// router.delete('/:id', validarJWT, deleteClient);
// /** =====================================================================
//  *  DELETE CLIENT
// =========================================================================*/

// EXPORTS
module.exports = router;