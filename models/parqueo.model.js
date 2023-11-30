const { Schema, model, connection } = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

const ParqueoSchema = Schema({

    invoice: {
        type: Number
    },

    car: {
        type: Schema.Types.ObjectId,
        ref: 'Cars',
    },

    placa: {
        type: String,
        require: true
    },

    checkin: {
        type: Number,
        require: true
    },

    checkout: {
        type: Number
    },

    total: {
        type: Number
    },
    subtotal: {
        type: Number
    },
    iva: {
        type: Number
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    estado: {
        type: String,
        default: 'Parqueado'
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

ParqueoSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.parqid = _id;
    return object;

});

ParqueoSchema.plugin(autoIncrement.plugin, {
    model: 'Parqueo',
    field: 'invoice',
    startAt: process.env.INVOICE_INIT
});

module.exports = model('Parqueo', ParqueoSchema);