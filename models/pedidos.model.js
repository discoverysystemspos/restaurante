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
    price: {
        type: Number,
        require: true
    }

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

// INVOICE SCHEMA
const PedidoSchema = Schema({

    pedido: {
        type: Number
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Clients',
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    products: [ProductosSchema],
    amount: {
        type: Number,
        require: true
    },
    cost: {
        type: Number,
        require: true
    },
    payments: [PaymentSchema],
    estado: {
        type: Boolean,
        default: true
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

PedidoSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.peid = _id;
    return object;

});

PedidoSchema.plugin(autoIncrement.plugin, {
    model: 'Pedido',
    field: 'pedido',
    startAt: process.env.INVOICE_INIT
});

// invoice
module.exports = model('Pedido', PedidoSchema);