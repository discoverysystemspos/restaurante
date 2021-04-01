const { Schema, model } = require('mongoose');

const DatoSchema = Schema({

    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    nit: {
        type: String,
        require: true
    },
    impuesto: {
        type: Boolean,
        default: false
    },
    tax: {
        type: Number,
        default: 0,
        require: true
    },
    printpos: {
        type: Boolean,
        default: true
    },
    responsable: {
        type: Boolean,
        default: false
    },
    impuestoconsumo: {
        type: Boolean,
        default: false
    },
    resolucion: {
        type: String
    },
    prefijopos: {
        type: String
    },
    logo: {
        type: String
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

DatoSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.eid = _id;
    return object;

});

module.exports = model('Datos', DatoSchema);