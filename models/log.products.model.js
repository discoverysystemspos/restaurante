const { Schema, model } = require('mongoose');

const LogProductSchema = Schema({

    code: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    type: {
        type: String,
    },
    befored: {
        type: Number,
    },
    qty: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    invoice: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice'
    },
    cajero: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    turno: {
        type: Schema.Types.ObjectId,
        ref: 'Turno'
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    departamento: {
        type: String,
    },
    fecha: {
        type: Date,
        default: Date.now
    }

});

LogProductSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.lpid = _id;
    return object;

});

module.exports = model('LogProducts', LogProductSchema);