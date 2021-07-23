/** =====================================================================
 *  LOGIN ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// HELPERS
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLERS
const { login, renewJWT, loginGoogle, googleSignIn } = require('../controllers/auth.controller');

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
 *  RENEW TOKEN
=========================================================================*/
router.get('/renew', validarJWT, renewJWT);
/** =====================================================================
*  RENEW TOKEN
=========================================================================*/

// EXPORT
module.exports = router;