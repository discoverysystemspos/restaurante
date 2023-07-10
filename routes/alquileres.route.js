/** =====================================================================
 *  ALQUILERES ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

/* The line `const { getAlquileres, getAlquilerId, createAlquiler, updateAlquiler, deleteAlquiler } =
require('../controllers/alquileres.controller');` is importing specific functions from the
`alquileres.controller` module and assigning them to variables. */
const { getAlquileres, getAlquilerId, createAlquiler, updateAlquiler, deleteAlquiler } = require('../controllers/alquileres.controller');

/* `const router = Router();` is creating a new instance of the Express Router. The Router is a
middleware function that allows you to define routes for your application. It provides methods for
defining different HTTP methods (GET, POST, PUT, DELETE, etc.) and associating them with specific
route handlers. */
const router = Router();


/* ================================================================================================
? GET ALQUILER ID
The line `router.get('/:id', validarJWT, getAlquilerId);` is defining a GET route for the '/:id'
endpoint. This route requires the user to be authenticated with a valid JWT token, as indicated by
the `validarJWT` middleware. When a request is made to this endpoint, the `getAlquilerId` function
from the `alquileres.controller` module will be executed to handle the request. */
router.get('/:id', validarJWT, getAlquilerId);

/* ================================================================================================
? CREATE ALQUILER
The line `router.post('/', validarJWT, createAlquiler);` is defining a POST route for the root
endpoint ('/'). This means that when a POST request is made to the root endpoint, the
`createAlquiler` function from the `alquileres.controller` module will be executed to handle the
request. */
router.post('/', validarJWT, createAlquiler);

/* ================================================================================================
? GET ALQUILERES
The line `router.post('/query', validarJWT, getAlquileres);` is defining a POST route for the
'/query' endpoint. This means that when a POST request is made to the '/query' endpoint, the
`getAlquileres` function from the `alquileres.controller` module will be executed to handle the
request. Additionally, the `validarJWT` middleware is used to ensure that the user is authenticated
with a valid JWT token before the `getAlquileres` function is executed. */
router.post('/query', validarJWT, getAlquileres);


/* ================================================================================================
? UPDATE ALQUILER 
The code `router.put('/:id', [validarJWT, validarCampos], updateAlquiler);` is defining a PUT route
for the '/:id' endpoint. This means that when a PUT request is made to the '/:id' endpoint, the
`updateAlquiler` function from the `alquileres.controller` module will be executed to handle the
request. */
router.put('/:id', [
        validarJWT,
        validarCampos
    ],
    updateAlquiler
);

/* ================================================================================================
? DELETE ALQUILER 
The line `router.delete('/:id', validarJWT, deleteAlquiler);` is defining a DELETE route for the
'/:id' endpoint. This means that when a DELETE request is made to the '/:id' endpoint, the
`deleteAlquiler` function from the `alquileres.controller` module will be executed to handle the
request. Additionally, the `validarJWT` middleware is used to ensure that the user is authenticated
with a valid JWT token before the `deleteAlquiler` function is executed. */
router.delete('/:id', validarJWT, deleteAlquiler);

/* 
? EXPORTS
`module.exports = router;` is exporting the `router` object from this module. This allows other
modules to import and use the `router` object defined in this file. By exporting the `router`
object, other modules can use it to define routes and handle HTTP requests. */
module.exports = router;