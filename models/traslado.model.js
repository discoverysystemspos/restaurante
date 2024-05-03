const { Schema, model, connection } = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

// PRODUCTS SCHEMA
const ProductosSchema = Schema({

    code: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    cost: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    wholesale: {
        type: Number,
        require: true
    },

});

// INVOICE SCHEMA
const TrasladoSchema = Schema({

    referencia: {
        type: Number
    },
    user: {
        type: String,
    },
    recibe: {
        type: String,
    },
    bodega: {
        type: Schema.Types.ObjectId,
        ref: 'bid',
    },
    products: [ProductosSchema],
    estado: {
        type: String,
        default: 'En Camino'
    },
    type: {
        type: String,
        default: 'Enviado'
    },
    status: {
        type: Boolean,
        default: true
    },
    trasid: {
        type: String,
    },
    fechaIn: {
        type: Date,
        default: Date.now
    },
    fecha: {
        type: Date,
        default: Date.now
    }

});

TrasladoSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.trasid = _id;
    return object;

});

TrasladoSchema.plugin(autoIncrement.plugin, {
    model: 'Traslados',
    field: 'traslado',
    startAt: process.env.INVOICE_INIT
});

// invoice
module.exports = model('Traslados', TrasladoSchema);