/**
 * JWT
 */

const jwt = require('jsonwebtoken');


/**
 * The function `generarJWT` generates a JSON Web Token (JWT) with a given user ID.
 * @param uid - The `uid` parameter is the unique identifier for the user. It is used to create the
 * payload for the JWT (JSON Web Token).
 * @returns The function `generarJWT` returns a Promise that resolves to a JSON Web Token (JWT) if it
 * is successfully generated, or rejects with an error message if the token generation fails.
 */
const generarJWT = (uid) => {

    /* The code block you provided is creating a new Promise object. The Promise constructor takes a
    function as an argument, which is called the executor function. In this case, the executor
    function takes two parameters: `resolve` and `reject`, which are functions that are used to
    either fulfill or reject the promise. */
    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };

        /* The code `jwt.sign(payload, process.env.SECRET_SEED_JWT, { expiresIn: '4h' }, (err, token)
        => { ... })` is generating a JSON Web Token (JWT) using the `jsonwebtoken` library. */
        jwt.sign(payload, process.env.SECRET_SEED_JWT, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }

        });
    });

};

/**
 * The function `generarClientJWT` generates a JSON Web Token (JWT) for a given client ID.
 * @param cid - The `cid` parameter is the client ID, which is used to identify the client for whom the
 * JWT token is being generated.
 * @returns The function `generarClientJWT` returns a Promise that resolves to a JWT token.
 */
const generarClientJWT = (cid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            cid
        };

        jwt.sign(payload, process.env.SECRET_SEED_JWT, {
            expiresIn: '72h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }

        });
    });

};

module.exports = {
    generarJWT,
    generarClientJWT
};