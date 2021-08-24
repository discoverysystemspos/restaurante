const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users.model');
const Client = require('../models/clients.model');

const { generarJWT, generarClientJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

/** =====================================================================
 *  LOGIN
=========================================================================*/
const login = async(req, res = response) => {

    const { usuario, password } = req.body;

    try {

        // VALIDATE USER
        const userDB = await User.findOne({ usuario });
        if (!userDB) {

            return res.status(404).json({
                ok: false,
                msg: 'El usuario o la contraseña es incorrecta'
            });

        }
        // VALIDATE USER

        // PASSWORD
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o la contraseña es incorrecta'
            });
        } else {

            if (userDB.status) {
                const token = await generarJWT(userDB.id);

                res.json({
                    ok: true,
                    token
                });
            } else {
                return res.status(401).json({
                    ok: false,
                    msg: 'Tu cuenta a sido desactivada por un administrador'
                });
            }

        }

        // JWT - JWT

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }


};
/** =====================================================================
 *  LOGIN
=========================================================================*/

/** =====================================================================
 *  LOGIN GOOGLE
=========================================================================*/
const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const clientDB = await Client.findOne({ email });

        let client;

        if (!clientDB) {
            // si no existe el usuario
            client = new Client({
                name,
                email,
                img: picture,
                google: true
            });

            // Guardar en DB

        } else {
            // existe usuario
            client = clientDB;
            client.google = true;
        }

        await client.save();

        // Generar el TOKEN - JWT
        const token = await generarClientJWT(client._id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Token no es correcto',
        });
    }

}

/** =====================================================================
 *  LOGIN GOOGLE
=========================================================================*/

/** =====================================================================
 *  RENEW TOKEN
======================================================================*/
const renewJWT = async(req, res = response) => {

    const uid = req.uid;

    // GENERAR TOKEN - JWT
    const token = await generarJWT(uid);

    // SEARCH USER
    const usuario = await User.findById(uid, 'usuario name role img uid status cerrada turno');
    // SEARCH USER

    res.status(200).json({
        ok: true,
        token,
        usuario
    });

};
/** =====================================================================
 *  RENEW TOKEN
=========================================================================*/

/** =====================================================================
 *  RENEW TOKEN CLIENT
======================================================================*/
const renewClientJWT = async(req, res = response) => {

    try {

        const cid = req.cid;

        // GENERAR TOKEN - JWT  
        const token = await generarClientJWT(cid);

        // SEARCH USER
        const client = await Client.findById(cid, 'email name cid img cedula phone city department address');
        // SEARCH USER

        res.status(200).json({
            ok: true,
            token,
            client
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el token',
        });
    }



};
/** =====================================================================
 *  RENEW TOKEN CLIENT
=========================================================================*/
module.exports = {
    login,
    renewJWT,
    googleSignIn,
    renewClientJWT
};