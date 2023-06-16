const { Schema, model, connection } = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

// PRODUCTS SCHEMA
const ItemsSchema = Schema({

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
    },
    desde: {
        type: Number
    },
    hasta: {
        type: Number
    },
    entregado: {
        type: Boolean
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
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

// SCHEMA
const AlquilerSchema = Schema({

    number: {
        type: Number
    },

    client: {
        type: Schema.Types.ObjectId,
        ref: 'Clients',
        required: true
    },

    address: {
        type: String,
        required: true
    },

    items: [ItemsSchema],
    payments: [PaymentSchema],

    amount: {
        type: Number
    },

    fecha: {
        type: Date,
        default: Date.now
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    status: {
        type: Boolean,
        default: true
    }
});

AlquilerSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.alid = _id;
    return object;

});

InvoiceSchema.plugin(autoIncrement.plugin, {
    model: 'Alquileres',
    field: 'number',
    startAt: process.env.INVOICE_INIT
});

module.exports = model('Alquileres', AlquilerSchema);