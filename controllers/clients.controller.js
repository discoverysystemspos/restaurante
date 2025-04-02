const { response } = require('express');

const bcrypt = require('bcryptjs');

const Client = require('../models/clients.model');
const { sendMail } = require('../helpers/send-mail');

/** =====================================================================
 *  GET QUERY CLIENT
=========================================================================*/
const getClientsQuery = async(req, res = response) => {

    try {

        const { desde, hasta, ...query } = req.body;

        const [clients, total] = await Promise.all([
            Client.find(query)
            .skip(desde)
            .limit(hasta),
            Client.countDocuments()
        ])

        res.json({
            ok: true,
            clients,
            total
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente de nuevo'
        });
    }

};


/** =====================================================================
 *  GET CLIENTS
=========================================================================*/
const getClients = async(req, res = response) => {

    try {

        const desde = Number(req.query.desde) || 0;

        const [clients, total] = await Promise.all([

            Client.find()
            .skip(desde)
            .limit(10),

            Client.countDocuments()
        ]);

        res.json({
            ok: true,
            clients,
            total
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente de nuevo'
        });

    }

};
/** =====================================================================
 *  GET CLIENTS
=========================================================================*/
/** =====================================================================
 *  CREATE CLIENT
=========================================================================*/
const createClient = async(req, res = response) => {

    let cedula = req.body.cedula;
    cedula = String(cedula).trim();

    try {

        // VALIDATE CEDULA
        const validarCedula = await Client.findOne({ cedula });
        if (validarCedula) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con este numero de cedula de ciudadania'
            });
        }

        // SAVE CLIENT
        const client = new Client(req.body);
        client.cedula = cedula;
        await client.save();

        res.json({
            ok: true,
            client
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};
/** =====================================================================
 *  CREATE CLIENT
=========================================================================*/

/** =====================================================================
 *  CREATE CLIENT WEB
=========================================================================*/
const createClientWeb = async(req, res = response) => {

    let { email, password } = req.body;

    email = email.trim().toLowerCase();

    try {

        // VALIDATE EMAIL
        const validarEmail = await Client.findOne({ email });
        if (validarEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con este email'
            });
        }

        // SAVE CLIENT
        const client = new Client(req.body);

        // ENCRYPTAR PASSWORD
        if (!password) {
            password = short.generate();
        }

        client.name = `${client.first_name} ${client.lastname}`

        const salt = bcrypt.genSaltSync();
        client.password = bcrypt.hashSync(password, salt);

        client.email = email;

        await client.save();

        // EMAIL DE BIENVENIDA ======================================================

        const msg = 'Gracias por registrarte en Castitoner';
        const subject = 'Bienvenido'; // Subject line
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
                            <h2 style="box-sizing:border-box;margin-top:0;margin-bottom:.5rem;font-family:inherit;font-weight:500;line-height:1.2;color:inherit;font-size:2rem;text-align:center!important">Bienvenido (a)</h2>
                        </div>
                    </div>
                    <div style="box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex">
                        <div style="box-sizing:border-box;width:100%;min-height:1px;padding-right:15px;padding-left:15px;text-align:center">
                            <h3 style="text-transform: capitalize; box-sizing:border-box;margin-top:0;margin-bottom:.5rem;font-family:inherit;font-weight:500;line-height:1.2;color:inherit;font-size:2rem;margin:20px 0">Hola, ${client.name} ${client.lastname}</h3>
                            <h5 style="box-sizing:border-box;margin-top:0;margin-bottom:.5rem;font-family:inherit;font-weight:500;line-height:1.2;color:inherit;font-size:1.25rem;margin:20px 0">Gracias por registrate en nuestra plataforma</h5>
                            <div style="box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex">
                                <div style="box-sizing:border-box;width:100%;min-height:1px;padding-right:15px;padding-left:15px;text-align:center">
                                </div>
                            </div>
                            <p style="box-sizing:border-box;margin-top:0;margin-bottom:1rem">Eres importante para nosotros, nos gustaria que actualizaras toda la información... </p>
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

        res.json({
            ok: true,
            client
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};
/** =====================================================================
 *  CREATE CLIENT WEB
=========================================================================*/

/** =====================================================================
 *  CREATE CLIENTS EXCEL
=========================================================================*/
const createClientsExcel = async(req, res = response) => {

    try {

        let clients = req.body.clients;

        if (clients.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Lista de clientes esta vacia, verifique he intene nuevamente'
            });
        }

        let i = 0;

        for (const client of clients) {

            // VALIDATE CODE
            const validateCedula = await Client.findOne({ cedula: client.cedula });
            if (!validateCedula) {

                // SAVE CLIENT
                const cliente = new Client(client);
                await cliente.save();
                i++;
            }

        }

        res.json({
            ok: true,
            total: i
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** =====================================================================
 *  UPDATE CLIENT
=========================================================================*/
const updateClient = async(req, res = response) => {

    const cid = req.params.id;

    try {

        // SEARCH CLIENT
        const clientDB = await Client.findById({ _id: cid });
        if (!clientDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun usuario con este ID'
            });
        }
        // SEARCH CLIENT

        // VALIDATE CEDULA
        const { cedula, password, ...campos } = req.body;
        if (clientDB.cedula !== cedula) {
            const validarCedula = await Client.findOne({ cedula });
            if (validarCedula) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este numero de cedula de ciudadania'
                });
            }
            campos.cedula = cedula;
        }

        if (password) {
            const salt = bcrypt.genSaltSync();
            campos.password = bcrypt.hashSync(password, salt);
        }

        // UPDATE
        const clientUpdate = await Client.findByIdAndUpdate(cid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            client: clientUpdate
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** =====================================================================
 *  UPDATE CLIENT
=========================================================================*/

/** =====================================================================
 *  DELETE CLIENT
=========================================================================*/
const deleteClient = async(req, res = response) => {

    const cid = req.params.id;

    try {

        // SEARCH CLIENT
        const clientDB = await Client.findById({ _id: cid });
        if (!clientDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun usuario con este ID'
            });
        }
        // SEARCH CLIENT

        // CHANGE STATUS
        if (clientDB.status === true) {
            clientDB.status = false;
        } else {
            clientDB.status = true;
        }
        // CHANGE STATUS

        const clientUpdate = await Client.findByIdAndUpdate(cid, clientDB, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            client: clientUpdate
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** =====================================================================
 *  DELETE CLIENT
=========================================================================*/



// EXPORTS
module.exports = {
    getClients,
    createClient,
    updateClient,
    deleteClient,
    createClientsExcel,
    getClientsQuery,
    createClientWeb
};