/** =====================================================================
 *  CLIENTS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getClients, createClient, updateClient, deleteClient, createClientsExcel, getClientsQuery, createClientWeb } = require('../controllers/clients.controller');

const router = Router();

/** =====================================================================
 *  GET CLIENTS
=========================================================================*/
router.get('/', validarJWT, getClients);
/** =====================================================================
 *  GET CLIENTS
=========================================================================*/

/** =====================================================================
 *  CREATE CLIENT
=========================================================================*/
router.post('/', [
        validarJWT,
        check('name', 'El nombre es olbigatorio').not().isEmpty(),
        check('cedula', 'La Cedula es olbigatoria').not().isEmpty(),
        validarCampos
    ],
    createClient
);
/** =====================================================================
 *  CREATE CLIENT
=========================================================================*/

/** =====================================================================
 *  CREATE CLIENT WEB
=========================================================================*/
router.post('/web', [
        check('first_name', 'El nombre es olbigatorio').not().isEmpty(),
        check('phone', 'El telefono es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createClientWeb
);
/** =====================================================================
*  CREATE CLIENT WEB
=========================================================================*/

/** =====================================================================
 *  GET CLIENTS QUERY
=========================================================================*/
router.post('/query', validarJWT, getClientsQuery);
/** =====================================================================
 *  GET CLIENTS QUERY
=========================================================================*/

/** =====================================================================
 *  CREATE CLIENTS EXCEL
=========================================================================*/
router.post('/create/excel', validarJWT, createClientsExcel);
/** =====================================================================
 *  CREATE CLIENTS EXCEL
=========================================================================*/

/** =====================================================================
 *  UPDATE CLIENT
=========================================================================*/
router.put('/:id', [
        validarJWT,
        check('name', 'El nombre es olbigatorio').not().isEmpty(),
        check('cedula', 'La Cedula es olbigatoria').not().isEmpty(),
        validarCampos
    ],
    updateClient
);
/** =====================================================================
 *  UPDATE CLIENT
=========================================================================*/

/** =====================================================================
 *  DELETE CLIENT
=========================================================================*/
router.delete('/:id', validarJWT, deleteClient);
/** =====================================================================
 *  DELETE CLIENT
=========================================================================*/

// EXPORTS
module.exports = router;