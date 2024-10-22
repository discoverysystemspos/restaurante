//
const path = require('path');
const fs = require('fs');

const sharp = require('sharp');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const ObjectId = require('mongoose').Types.ObjectId;

// HELPERS
const { updateImage } = require('../helpers/update-image');

const Mesa = require('../models/mesas.model');
const Invoice = require('../models/invoices.model');

/** =====================================================================
 *  UPLOADS
=========================================================================*/
const fileUpload = async(req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const validType = ['products', 'logo', 'user', 'department', 'taller'];

    // VALID TYPES
    if (!validType.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo es invalido'
        });
    }

    // VALIDATE IMAGE
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No has seleccionado ningún archivo'
        });
    }

    // PROCESS IMAGE
    // const file = req.files.image;
    // const nameShort = file.name.split('.');
    // const extFile = nameShort[nameShort.length - 1];
    const file = await sharp(req.files.image.data).metadata();
    const extFile = file.format;


    // VALID EXT
    const validExt = ['jpg', 'png', 'jpeg', 'webp', 'bmp', 'svg'];
    if (!validExt.includes(extFile)) {
        return res.status(400).json({
            ok: false,
            msg: 'No se permite este tipo de imagen, solo extenciones JPG - PNG - WEBP - SVG'
        });
    }
    // VALID EXT

    // GENERATE NAME
    const nameFile = `${ uuidv4() }.webp`;

    // PATH IMAGE
    const path = `./uploads/${ tipo }/${ nameFile }`;

    // method to place the file somewhere on your server
    sharp(req.files.image.data)
        .webp({ equality: 75, effort: 5 })
        .toFile(path, (err, info) => {


            // UPDATE IMAGE
            updateImage(tipo, id, nameFile);

            res.json({
                ok: true,
                msg: 'Imagen Actualizada',
                nombreArchivo: nameFile,
                date: Date.now()
            });

        });




    // file.mv(path, (err) => {
    //     if (err) {
    //         return res.status(500).json({
    //             ok: false,
    //             msg: 'Error al guardar la imagen'
    //         });
    //     }

    //     // UPDATE IMAGE
    //     updateImage(tipo, id, nameFile);

    //     res.json({
    //         ok: true,
    //         msg: 'Imagen Actualizada',
    //         nombreArchivo: nameFile
    //     });
    // });


};
/** =====================================================================
 *  UPLOADS
=========================================================================*/
/** =====================================================================
 *  GET IMAGES
=========================================================================*/
const getImages = (req, res = response) => {

    const tipo = req.params.tipo;
    const image = req.params.image;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${image}`);

    // IMAGE DEFAULT
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {

        // CHECK TYPE
        if (tipo !== 'user') {
            const pathImg = path.join(__dirname, `../uploads/default.png`);
            res.sendFile(pathImg);
        } else {
            const pathImg = path.join(__dirname, `../uploads/user/user-default.png`);
            res.sendFile(pathImg);
        }

    }

};
/** =====================================================================
 *  GET IMAGES
=========================================================================*/
/** =====================================================================
 *  DELETE IMAGES
=========================================================================*/
const deleteImg = async(req, res = response) => {

    try {

        const uid = req.uid;
        const type = req.params.type;
        const id = req.params.id;
        const img = req.params.img;

        switch (type) {
            case 'mesa':

                // COMPROVAR QUE EL ID ES VALIDO
                if (!ObjectId.isValid(id)) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Error en el ID del producto'
                    });
                }

                const mesaDB = await Mesa.findById(id);
                if (!mesaDB) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'No existe ningun producto con este ID'
                    });
                }

                const deleteImg = await Mesa.updateOne({ _id: id }, { $pull: { images: { img } } });


                // VERIFICAR SI SE ACTUALIZO
                if (deleteImg.nModified === 0) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'No se pudo eliminar esta imagen, porfavor intente de nuevo'
                    });
                }

                // ELIMINAR IMAGEN DE LA CARPETA
                const path = `./uploads/taller/${ img }`;
                if (fs.existsSync(path)) {
                    // DELET IMAGE OLD
                    fs.unlinkSync(path);
                }

                const mesa = await Mesa.findById(id);

                res.json({
                    ok: true,
                    mesa
                });

                break;

            case 'invoice':

                // COMPROVAR QUE EL ID ES VALIDO
                if (!ObjectId.isValid(id)) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Error en el ID del producto'
                    });
                }

                const invoiceDB = await Invoice.findById(id);
                if (!invoiceDB) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'No existe ningun producto con este ID'
                    });
                }

                const deleteImgInvoice = await Mesa.updateOne({ _id: id }, { $pull: { images: { img } } });


                // VERIFICAR SI SE ACTUALIZO
                if (deleteImgInvoice.nModified === 0) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'No se pudo eliminar esta imagen, porfavor intente de nuevo'
                    });
                }

                // ELIMINAR IMAGEN DE LA CARPETA
                const pathInvoice = `./uploads/taller/${ img }`;
                if (fs.existsSync(pathInvoice)) {
                    // DELET IMAGE OLD
                    fs.unlinkSync(pathInvoice);
                }

                const invoice = await Invoice.findById(id);

                res.json({
                    ok: true,
                    invoice
                });

                break;




            default:

                return res.status(400).json({
                    ok: false,
                    msg: 'Ha ocurrido un error, porfavor intente de nuevo'
                });
                break;
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};


// EXPORTS
module.exports = {
    fileUpload,
    getImages,
    deleteImg
};