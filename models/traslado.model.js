const { Schema, model } = require('mongoose');

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
    type: {
        type: String
    },
    qty: {
        type: Number,
        require: true
    },
    cost: {
        type: Number,
        require: true
    },
    gain: {
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
    distribuidor: {
        type: Number,
        require: true
    },
    confirmado: {
        type: Boolean,
        default: false
    }

});

// INVOICE SCHEMA
const TrasladoSchema = Schema({

    referencia: {
        type: String
    },
    user: {
        type: String,
    },
    recibe: {
        type: String,
    },
    bodega: {
        type: Schema.Types.ObjectId,
        ref: 'Bodegas',
    },
    desde: {
        type: String,
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
        type: Date
    },
    fecha: {
        type: Date,
        default: Date.now
    }

});

TrasladoSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.traid = _id;
    return object;

});

// invoice
module.exports = model('Traslados', TrasladoSchema);