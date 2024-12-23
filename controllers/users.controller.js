const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users.model');

/** ======================================================================
 *  GET USERss
=========================================================================*/
const getUsers = async(req, res) => {

    try {

        const [users, total] = await Promise.all([
            User.find({}, 'usuario name role img status turno privilegios'),
            User.countDocuments()
        ]);

        res.json({
            ok: true,
            users,
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
/** =====================================================================
 *  GET USERS
=========================================================================*/
/** =====================================================================
 *  CREATE USERS
=========================================================================*/
const createUsers = async(req, res = response) => {

    const { usuario, password } = req.body;

    try {

        const validarUsuario = await User.findOne({ usuario });

        if (validarUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existen alguien con este nombre de usuario'
            });
        }

        const user = new User(req.body);

        // ENCRYPTAR PASSWORD
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // SAVE USER
        await user.save();

        res.json({
            ok: true,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
};
/** =====================================================================
 *  CREATE USERS
=========================================================================*/

/** =====================================================================
 *  UPDATE USER
=========================================================================*/
const updateUser = async(req, res = response) => {

    const uid = req.params.id;

    try {

        // SEARCH USER
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun usuario con este ID'
            });
        }
        // SEARCH USER

        // VALIDATE USER
        const { password, usuario, ...campos } = req.body;
        if (userDB.usuario !== usuario) {
            const validarUsuario = await User.findOne({ usuario });
            if (validarUsuario) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este nombre'
                });
            }
        }

        if (password) {

            // ENCRYPTAR PASSWORD
            const salt = bcrypt.genSaltSync();
            campos.password = bcrypt.hashSync(password, salt);

        }

        // UPDATE
        campos.usuario = usuario;
        const userUpdate = await User.findByIdAndUpdate(uid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            user: userUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }

};
/** =====================================================================
 *  UPDATE USER
=========================================================================*/
/** =====================================================================
 *  DELETE USER
=========================================================================*/
const deleteUser = async(req, res = response) => {

    const uid = req.params.id;

    try {

        // SEARCH DEPARTMENT
        const userDB = await User.findById({ _id: uid });
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun usuario con este ID'
            });
        }
        // SEARCH DEPARTMENT

        // CHANGE STATUS
        if (userDB.status === true) {
            userDB.status = false;
        } else {
            userDB.status = true;
        }
        // CHANGE STATUS

        const userUpdate = await User.findByIdAndUpdate(uid, userDB, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            user: userUpdate
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
 *  DELETE USER
=========================================================================*/


// EXPORTS
module.exports = {
    getUsers,
    createUsers,
    updateUser,
    deleteUser
};