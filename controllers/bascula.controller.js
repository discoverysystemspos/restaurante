const { response } = require('express');

const serialPort = require('serialport');

let peso = '';

// const port = new serialPort(
//     'COM1', { baudRate: 9600 }
// );

// const parser = new serialPort.parsers.Readline();

// port.pipe(parser);

// parser.on('data', (w) => {
//     peso = w;
// });


/** =====================================================================
 *  GET PESO
=========================================================================*/
const getPeso = async(req, res = response) => {

    let pesos = peso.split(' ');

    res.json({
        ok: true,
        pesos: parseFloat(pesos[2])
    });

}


// EXPORTS
module.exports = {
    getPeso
};