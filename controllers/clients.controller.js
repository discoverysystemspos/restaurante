const { response } = require('express');

const Client = require('../models/clients.model');

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

    const cedula = req.body.cedula;

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
        const { cedula, ...campos } = req.body;
        if (clientDB.cedula !== cedula) {
            const validarCedula = await Client.findOne({ cedula });
            if (validarCedula) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este numero de cedula de ciudadania'
                });
            }
        }

        // UPDATE
        campos.cedula = cedula;
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
    getClientsQuery
};