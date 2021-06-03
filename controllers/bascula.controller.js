const { response } = require('express');
const fs = require('fs');
const path = require('path');

/** =====================================================================
 *  GET PESO
=========================================================================*/
const getPeso = async(req, res = response) => {

    try {
        const init = Number(req.query.init);
        const end = Number(req.query.end);

        let data = fs.readFileSync(path.join(__dirname, '../bascula') + '/peso.txt', 'utf8');

        let peso = data.toString();

        if (peso.length > 17) {
            res.json({
                ok: true,
                pesos: 0
            });
        } else {

            // let pesos = peso.split(' ');

            // res.json({
            //     ok: true,
            //     pesos: parseFloat(pesos[2])
            // });

            let w = peso.slice(init, end);

            res.json({
                ok: true,
                pesos: parseFloat(w),
                init,
                end
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }




}


// EXPORTS
module.exports = {
    getPeso
};