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
        type: Date
    },
    hasta: {
        type: Date
    },
    entregado: {
        type: Boolean,
        default: false
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
        type: String
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

    fechaIni: {
        type: Date
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    cotizacion: {
        type: Boolean,
        default: false
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

AlquilerSchema.plugin(autoIncrement.plugin, {
    model: 'Alquileres',
    field: 'number',
    startAt: process.env.INVOICE_INIT
});

module.exports = model('Alquileres', AlquilerSchema);