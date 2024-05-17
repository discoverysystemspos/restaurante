const { Schema, model, connection } = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

// PRODUCTS SCHEMA
const ProductosSchema = Schema({

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
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

// Payment SCHEMA
const PaymentSchema = Schema({
    type: {
        type: String
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    }
});

// Payment SCHEMA
const AbonoSchema = Schema({
    type: {
        type: String
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    },
    turno: {
        type: Schema.Types.ObjectId,
        ref: 'Turnos'
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

// COMPRAS SCHEMA
const ComprasSchema = Schema({

    invoice: {
        type: Number
    },
    proveedor: {
        type: Schema.Types.ObjectId,
        ref: 'Proveedores'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [ProductosSchema],
    payments: [PaymentSchema],
    abonos: [AbonoSchema],
    amount: {
        type: Number,
        require: true
    },
    turno: {
        type: Schema.Types.ObjectId,
        ref: 'Turnos'
    },

    base: {
        type: Number,
        require: true
    },
    credito: {
        type: Boolean,
        default: false
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

ComprasSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.comid = _id;
    return object;

});

ComprasSchema.plugin(autoIncrement.plugin, {
    model: 'Compras',
    field: 'invoice',
    startAt: process.env.INVOICE_INIT
});

// invoice
module.exports = model('Compras', ComprasSchema);