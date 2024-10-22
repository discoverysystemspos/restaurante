const { Schema, model } = require('mongoose');

const CarSchema = Schema({

    placa: {
        type: String,
        require: true
    },

    cliente: {
        type: String,
        default: 'Consumidor Final'
    },

    typeparq: {
        type: Schema.Types.ObjectId,
        ref: 'Typeparqs',
    },

    status: {
        type: Boolean,
        default: true
    },

    fecha: {
        type: Date,
        default: Date.now
    }

});

CarSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.carid = _id;
    return object;

});

module.exports = model('Cars', CarSchema);