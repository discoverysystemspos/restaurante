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
const InvoiceSchema = Schema({

    invoice: {
        type: Number
    },
    nota: {
        type: String
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Clients',
        require: true
    },
    pedido:{
        type: Schema.Types.ObjectId,
        ref: 'Pedidos'
    },
    turno: {
        type: Schema.Types.ObjectId,
        ref: 'Turnos'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    mesero: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    mesa: {
        type: Schema.Types.ObjectId,
        ref: 'Mesas'
    },
    products: [ProductosSchema],
    type: {
        type: String,
        require: true
    },
    venta: {
        type: String,
        default: 'Local'
    },
    amount: {
        type: Number,
        require: true
    },
    base: {
        type: Number,
        require: true
    },
    iva: {
        type: Number,
        require: true
    },
    cost: {
        type: Number,
        require: true
    },
    tip: {
        type: Number,
        require: true
    },
    pago: {
        type: Number
    },
    vueltos: {
        type: Number
    },
    payments: [PaymentSchema],
    credito: {
        type: Boolean,
        default: false
    },
    fechaCredito: {
        type: Date
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

InvoiceSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.iid = _id;
    return object;

});

InvoiceSchema.plugin(autoIncrement.plugin, {
    model: 'Invoice',
    field: 'invoice',
    startAt: process.env.INVOICE_INIT
});

// invoice
module.exports = model('Invoice', InvoiceSchema);