/** =====================================================================
 *  LOGIN ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// HELPERS
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarClientJWT } = require('../middlewares/validar-jwt');

// CONTROLLERS
const { login, renewJWT, googleSignIn, renewClientJWT, facebookSignIn, loginClient, rePass } = require('../controllers/auth.controller');

const router = Router();

/** =====================================================================
 *  LOGIN
=========================================================================*/
router.post('/', [
        check('usuario', 'El usuario es olbigatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);
/** =====================================================================
 *  LOGIN
=========================================================================*/

/** =====================================================================
 *  LOGIN - GOOGLE
=========================================================================*/
router.post('/google', [
        check('token', 'El token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);
/** =====================================================================
*  LOGIN - GOOGLE
=========================================================================*/

/** =====================================================================
 *  LOGIN - FACEBOOKS
=========================================================================*/
router.post('/facebook', [
        check('token', 'El token de Facebook es obligatorio').not().isEmpty(),
        validarCampos
    ],
    facebookSignIn
);
/** =====================================================================
*  LOGIN - FACEBOOK
=========================================================================*/

/** =====================================================================
 *  LOGIN CLIENT
=========================================================================*/
router.post('/user', [
        check('email', 'El email es olbigatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    loginClient
);
/** =====================================================================
*  LOGIN
=========================================================================*/

/** =====================================================================
 *  RECUPERAR CONTRASEÑA
=========================================================================*/
router.post('/recuperar/password', [
        check('email', 'El email es obligatorio').not().isEmpty(),
        validarCampos
    ],
    rePass
);

/** =====================================================================
 *  RENEW TOKEN
=========================================================================*/
router.get('/renew', validarJWT, renewJWT);
/** =====================================================================
*  RENEW TOKEN
=========================================================================*/

/** =====================================================================
 *  RENEW TOKEN CLIENT
=========================================================================*/
router.get('/renew/client', validarClientJWT, renewClientJWT);
/** =====================================================================
*  RENEW TOKEN CLIENT
=========================================================================*/


// EXPORT
module.exports = router;