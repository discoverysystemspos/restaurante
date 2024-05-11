const { response } = require('express');
const fs = require('fs');
const path = require('path');

/** =====================================================================
 *  GET PESO
==========================================================================*/
const getPeso = async(req, res = response) => {


    try {
        const init = Number(req.query.init);
        const end = Number(req.query.end);

        let data = fs.readFileSync(path.join(__dirname, '../bascula') + '/peso.txt', 'utf8');

        let peso = data.toString();

        var regex = /(\d+)/g;

        if (peso.length > 17) {

            const basc = ['ST'];
            let w;


            if (peso.includes(basc)) {

                let pesos = peso.split(' ');
                w = pesos[5];
                console.log(pesos);

            } else {
                w = `${peso.match(regex)[0]}.${peso.match(regex)[1]}`;
            }

            res.json({
                ok: true,
                pesos: parseFloat(w),
                init,
                end
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