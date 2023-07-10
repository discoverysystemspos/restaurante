const { response } = require('express');

const Alquiler = require('../models/alquileres.model');

/** GET ALQUILERES
 * This function retrieves a list of rentals with pagination and populates related fields.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `response` object from the Express framework.
 * @returns a JSON response with the following properties:
 * - "ok": a boolean value indicating if the operation was successful or not
 * - "alquileres": an array of alquileres (rentals) objects
 * - "total": the total count of alquileres (rentals) objects
 */
const getAlquileres = async(req, res = response) => {

    let { desde, hasta, ...query } = req.body;

    if (!desde) { desde = 0 };
    if (!hasta) { hasta = 50 };


    try {

        const [alquileres, total] = await Promise.all([
            Alquiler.find(query)
            .skip(desde)
            .limit(hasta)
            .sort({ number: -1 })
            .populate('client')
            .populate('items.product')
            .populate('user', 'name'),
            Alquiler.countDocuments()
        ]);

        res.json({
            ok: true,
            alquileres,
            total
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** GET ALQUILER ID
 * This function retrieves a specific rental by its ID and populates its related data.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes details such as the request method, headers, query
 * parameters, and body.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `response` object from the Express framework.
 * @returns a JSON response with the following properties:
 * - "ok": a boolean value indicating whether the operation was successful or not.
 * - "alquiler": the alquiler object retrieved from the database, which includes the populated fields
 * "client", "items.product", and "user".
 */
const getAlquilerId = async(req, res = response) => {

    const alid = req.params.id;

    try {

        const alquiler = await Alquiler.findById(alid)
            .populate('client')
            .populate('items.product')
            .populate('user', 'name');
        if (!alquiler) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun alquiler con este ID'
            });
        }

        res.json({
            ok: true,
            alquiler
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** CREATE ALQUILER
 * This function creates a new "Alquiler" (rental) object and saves it to the database.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as the request headers, request body,
 * request method, request URL, etc.
 * @param [res] - The `res` parameter is the response object that will be sent back to the client. It
 * is used to send the response data, such as JSON data or error messages, back to the client making
 * the request.
 * @returns a JSON response with the following structure:
 * - "ok": a boolean value indicating if the operation was successful or not.
 * - "alquiler": an object containing the newly created "alquiler" (rental) data, including the
 * populated "client", "items.product", and "user" fields.
 */
const createAlquiler = async(req, res = response) => {

    try {

        const user = req.uid;
        const cotizacion = req.body.cotizacion;

        // SAVE DEPARTMENT
        const alquiler = new Alquiler(req.body);

        if (!cotizacion) {
            alquiler.items.map((alquiler) => {
                alquiler.desde = new Date();
            });
        }

        alquiler.user = user;
        await alquiler.save();

        const alquilerNew = await Alquiler.findById({ _id: alquiler._id })
            .populate('client')
            .populate('items.product')
            .populate('user', 'name');

        res.json({
            ok: true,
            alquiler: alquilerNew
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/**
 * This function updates a rental record in a database.
 * @param req - The req parameter is the request object that contains information about the HTTP
 * request made by the client. It includes details such as the request method, headers, URL, and body.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `response` object from the Express framework.
 * @returns a JSON response with the updated alquiler object if the update is successful. If there is
 * an error, it returns a JSON response with an error message.
 */
const updateAlquiler = async(req, res = response) => {

    const alid = req.params.id;

    try {

        // SEARCH DEPARTMENT
        /* `const alquilerDB = await Alquiler.findById({ _id: alid });` is searching for a rental
        (alquiler) record in the database with the specified ID (`alid`). It uses the `findById`
        method of the `Alquiler` model to perform the search. The result is stored in the
        `alquilerDB` variable. */
        const alquilerDB = await Alquiler.findById({ _id: alid });
        if (!alquilerDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun alquiler con este ID'
            });
        }


        const {...campos } = req.body;


        // UPDATE
        /* The code `const alquilerUpdate = await Alquiler.findByIdAndUpdate(alid, campos, { new: true,
        useFindAndModify: false })` is updating a rental record in the database with the specified
        ID (`alid`). It uses the `findByIdAndUpdate` method of the `Alquiler` model to perform the
        update. The `campos` variable contains the updated fields and their new values. */
        const alquilerUpdate = await Alquiler.findByIdAndUpdate(alid, campos, { new: true, useFindAndModify: false })
            .populate('client')
            .populate('items.product')
            .populate('user', 'name');

        res.json({
            ok: true,
            alquiler: alquilerUpdate
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/**
 * This function deletes or restores an alquiler (rental) by changing its status.
 * @param req - The req parameter is the request object that contains information about the HTTP
 * request made by the client. It includes details such as the request method, headers, URL, and any
 * data sent in the request body.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `response` object from the Express framework.
 * @returns a JSON response with the updated alquiler object if successful, or an error message if
 * there is an error.
 */
const deleteAlquiler = async(req, res = response) => {

    const alid = req.params.id;

    try {

        // SEARCH CAJA
        const alquilerDB = await Alquiler.findById(alid);
        if (!alquilerDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun alquiler con este ID'
            });
        }
        // SEARCH CAJA

        // CHANGE STATUS
        if (alquilerDB.status === true) {
            alquilerDB.status = false;
        } else {
            alquilerDB.status = true;
        }
        // CHANGE STATUS

        const alquilerUpdate = await Alquiler.findByIdAndUpdate(baid, alquilerDB, { new: true, useFindAndModify: false })
            .populate('client')
            .populate('items.product')
            .populate('user', 'name');

        res.json({
            ok: true,
            alquiler: alquilerUpdate
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
 *  DELETE ALQUILER
=========================================================================*/
// EXPORTS
module.exports = {
    getAlquileres,
    createAlquiler,
    updateAlquiler,
    deleteAlquiler,
    getAlquilerId
};