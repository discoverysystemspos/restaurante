const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

/**
 * The function `dbConnection` connects to a MongoDB database using the `mongoose` library and
 * initializes the `autoIncrement` plugin. daytas
 */
const dbConection = async() => {

    try {
        
        const connection = await mongoose.connect(process.env.DB_CNN);

        autoIncrement.initialize(connection);
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD');
    }

};

module.exports = {
    dbConection
};