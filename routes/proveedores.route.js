/** =====================================================================
 *  PROVEEDOR ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { createProveedor, getProveedores, updateProveedor, getProveedoresQuery } = require('../controllers/proveedores.controller');

const router = Router();

/** =====================================================================
 *  GET PROVEEDORES QUeRY
=========================================================================*/
router.post('/query', getProveedoresQuery);

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

/** =====================================================================
 *  UPDATE PROVEEDOR
=========================================================================*/
router.put('/:id', [
        validarJWT,
        validarCampos
    ],
    updateProveedor
);
/** =====================================================================
 *  UPDATE PROVEEDOR
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