const { response } = require('express');
const fs = require('fs');
const path = require('path');

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

/** =====================================================================
 *  GET PESO
==========================================================================*/
const getPeso = async(req, res = response) => {


    try {

        // Configura el puerto serial
        const port = new SerialPort({
          path: 'COM1', 
          baudRate: 9600,
        });
      
        let responseSent = false; // Evita múltiples respuestas
        const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
      
        // Timeout de 10 segundos
        const timeout = setTimeout(() => {
          if (!responseSent) {
            responseSent = true;
            res.json({ 
              ok: true, 
              pesos: 0 
            });
            port.close();
          }
        }, 5000);
      
        // Escucha datos del puerto serial
        parser.on('data', (data) => {
          if (responseSent) return; // Si ya se respondió, ignora
      
          // Extrae números y puntos decimales
          const numeros = data.replace(/[^0-9.]/g, '');
          const peso = parseFloat(numeros);
    
          console.log('LECTURA: ', peso);
      
          // Verifica si es un número válido y mayor a 0
          if (!isNaN(peso) && peso > 0) {
            responseSent = true;
        //console.log('PESO FINAL: ', peso);
            clearTimeout(timeout); // Cancela el timeout
            res.json({ 
              ok: true, 
              pesos: peso.toFixed(3) 
            });
            port.close(); // Cierra la conexión
          }
        });
      
        // Manejo de errores
        port.on('error', (err) => {
          if (!responseSent) {
            responseSent = true;
            clearTimeout(timeout);
            res.status(500).json({ 
              ok: false, 
              msg: 'Error de conexión con la báscula, encienda la bascula, verifica que el cable de comunicacion o si la bascula esta conectada en el puerto correcto' 
            });
          }
        });
            
    
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