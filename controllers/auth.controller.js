const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users.model');
const Client = require('../models/clients.model');
const Datos = require('../models/datos.model');

const { generarJWT, generarClientJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { sendMail } = require('../helpers/send-mail');

/** =====================================================================
 *  LOGIN USER
=========================================================================*/
const login = async(req, res = response) => {

    const { usuario, password } = req.body;

    try {

        // VERIFICAR SI ES UNA NUBE
        const datos = await Datos.findOne({ status: true });
        if (datos) {
            if (datos.nube) {
    
                const fechaActual = new Date();
                const fechaLimite = new Date(datos.vence);
                fechaLimite.setDate(fechaLimite.getDate() + 5);
    
                if (new Date(fechaLimite).getTime() < fechaActual.getTime()) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El sistema esta vencido por falta de pago, si ya realizaste el pago comunicate con el numero de soporte!'
                    });
                }
            }            
        }

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
 *  LOGIN CLIENT
=========================================================================*/
const loginClient = async(req, res = response) => {

    let { email, password } = req.body;
    email = email.trim().toLowerCase();

    try {

        // VALIDATE USER
        const clientDB = await Client.findOne({ email });
        if (!clientDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El email o la contraseña es incorrecta'
            });

        }
        // VALIDATE USER

        // PASSWORD
        const validPassword = bcrypt.compareSync(password, clientDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El email o la contraseña es incorrecta'
            });
        } else {

            if (clientDB.status) {
                const token = await generarClientJWT(clientDB.id);

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
                google: true,
                facebook: false
            });

            // Guardar en DB

        } else {
            // existe usuario
            client = clientDB;
            client.google = true;
            client.facebook = false;
            client.img = picture;
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

    // VERIFICAR SI ES UNA NUBE
    const datos = await Datos.findOne({ status: true });
    if (datos) {
        if (datos.nube) {
    
            const fechaActual = new Date();
            const fechaLimite = new Date(datos.vence);
            fechaLimite.setDate(fechaLimite.getDate() + 5);
    
            if (new Date(fechaLimite).getTime() < fechaActual.getTime()) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El sistema esta vencido por falta de pago, si ya realizaste el pago comunicate con el numero de soporte!'
                });
            }
        }        
    }

    const uid = req.uid;

    // GENERAR TOKEN - JWTT
    const token = await generarJWT(uid);

    // SEARCH USER
    const usuario = await User.findById(uid, 'usuario name role img uid status cerrada turno privilegios');
    // SEARCH USER

    if (!usuario.privilegios) {
        usuario.privilegios = {
            cierre: true,
            comandas: true
        }
    }

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
 *  RENEW TOKEN CLIENT GOOLGE
======================================================================*/
const renewClientJWT = async(req, res = response) => {

    try {

        const cid = req.cid;

        // GENERAR TOKEN - JWT  
        const token = await generarClientJWT(cid);

        // SEARCH USER
        const client = await Client.findById(cid, 'email name cid img cedula phone city department address valid credit mayoreo contratista');
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
 *  RENEW TOKEN CLIENTS
=========================================================================*/

/** =====================================================================
 *  LOGIN FACEBOOK
=========================================================================*/
const facebookSignIn = async(req, res = response) => {

    try {

        const {...data } = req.body;

        const clientDB = await Client.findOne({ email: data.token.email });

        let client;

        if (!clientDB) {
            // si no existe el usuario
            client = new Client({
                name: data.token.name,
                email: data.token.email,
                img: data.token.response.picture.data.url,
                facebook: true,
                google: false,
            });

            // Guardar en DB

        } else {
            // existe usuario
            client = clientDB;
            client.facebook = true;
            client.google = false;
            client.img = data.token.response.picture.data.url;
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
 *  REEBOOT PASSWORD
=========================================================================*/
const rePass = async(req, res = response) => {

    try {

        let email = req.body.email;
        email = email.trim().toLowerCase();

        // VALIDATE USER
        const clientDB = await Client.findOne({ email });
        if (!clientDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun usuario con este email.'
            });

        }
        // VALIDATE USER

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = Math.random().toString(36).replace(/[.!"#$%&/()=]+/g, '');

        const salt = bcrypt.genSaltSync();
        clientDB.password = bcrypt.hashSync(result, salt);

        // ========================= NODEMAILER =================================

        const msg = 'Se ha enviado un correo electronico a su email con la nueva contraseña';
        const subject = 'Recuperar contraseña '; // Subject line
        const html = `<div style="box-sizing:border-box;margin:0;font-family: Montserrat,-apple-system,BlinkMacSystemFont;font-size:1rem;font-weight:400;line-height:1.5;text-align:left;background-color:#fff;color:#333">
                <div class="adM">
                    <center>
                        <img src="https://castitoner.com/assets/img/logo.webp" style="max-width: 250px;">
                    </center>
                </div>
                <div style="box-sizing:border-box;width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto;max-width:620px">
                    <div class="adM">
                    </div>
                    <div style="box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex">
                        <div class="adM">
                        </div>
                        <div style="box-sizing:border-box;width:100%;min-height:1px;padding-right:15px;padding-left:15px;text-align:center;padding-top:20px">
    
                        </div>
                    </div>
                    <div style="box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex">
                        <div style="box-sizing:border-box;width:100%;min-height:1px;padding-right:15px;padding-left:15px;margin-top:40px;padding:20px 0;background-color:#2d2d2d;color:#fff">
                            <h2 style="box-sizing:border-box;margin-top:0;margin-bottom:.5rem;font-family:inherit;font-weight:500;line-height:1.2;color:inherit;font-size:2rem;text-align:center!important">Recuperar Contraseña</h2>
                        </div>
                    </div>
                    <div style="box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex">
                        <div style="box-sizing:border-box;width:100%;min-height:1px;padding-right:15px;padding-left:15px;text-align:center">
                            <h3 style="text-transform: capitalize; box-sizing:border-box;margin-top:0;margin-bottom:.5rem;font-family:inherit;font-weight:500;line-height:1.2;color:inherit;font-size:2rem;margin:20px 0">Hola ${clientDB.name} ${clientDB.lastname}</h3>
                            <h5 style="box-sizing:border-box;margin-top:0;margin-bottom:.5rem;font-family:inherit;font-weight:500;line-height:1.2;color:inherit;font-size:1.25rem;margin:20px 0">Hemos recibido su solicitud de recuperación de contraseña.</h5>
                            <div style="box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex">
                                <div style="box-sizing:border-box;width:100%;min-height:1px;padding-right:15px;padding-left:15px;text-align:center">
                                </div>
                            </div>
                            <p style="box-sizing:border-box;margin-top:0;margin-bottom:1rem">Tu nueva contraseña es: ${result}</p>
                            <a href="https://castitoner.com/login" style="box-sizing:border-box;text-decoration:none;display:inline-block;font-weight:400;text-align:center;white-space:nowrap;vertical-align:middle;border:1px solid transparent;color:#fff;line-height:1.5;margin:10px;border-radius:30px;background-color:#009BE0;border-color:#009BE0;font-size:0.95rem;padding:15px 20px"
                                target="_blank">Inciar sesion ahora</a>
                            <p style="box-sizing:border-box;margin-top:0;margin-bottom:1rem">tambien puedes copiar este enlace en tu URL</p>
                            <p> https://castitoner.com/login</p>
                        </div>
                    </div>
                    <div style="box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex">
                        <div style="box-sizing:border-box;width:100%;min-height:1px;padding-right:15px;padding-left:15px;margin:40px 0;text-align:center">
                            <p style="box-sizing:border-box;margin-top:0;margin-bottom:1rem">Si esta solicitud se ha enviado sin su consentimiento, puede ignorar este correo electrónico ó eliminarlo. </p>
                        </div>
                    </div>
    
                </div>
                </div>`;

        const send_mail = await sendMail(email, subject, html, msg);

        await clientDB.save();

        res.json({
            ok: true,
            msg: 'Hemos enviado al correo la nueva contraseña, verifica la carpeta de correos spam'
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }

};

module.exports = {
    login,
    renewJWT,
    googleSignIn,
    renewClientJWT,
    facebookSignIn,
    rePass,
    loginClient
};