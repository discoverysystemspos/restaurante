const { Schema, model } = require('mongoose');

const ProveedoresSchema = Schema({

    name: {
        type: String,
        require: true
    },
    cedula: {
        type: String,
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    department: {
        type: String
    },
    zip: {
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

ProveedoresSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.provid = _id;
    return object;

});

module.exports = model('Proveedores', ProveedoresSchema);