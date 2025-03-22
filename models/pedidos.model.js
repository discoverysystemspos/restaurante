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

const FeedbackSchema = Schema({

    date: {
        type: Date
    },

    recibido: {
        type: Boolean,
        default: false
    },

    nota: {
        type: String
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

// Cliente SCHEMA
const ClienteSchema = Schema({
    first_name: {
        type: String
    },
    family_name: {
        type: String
    },
    cedula: {
        type: Number
    }
});

// INVOICE SCHEMA
const PedidoSchema = Schema({

    pedido: {
        type: Number
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Clients'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [ProductosSchema],
    amount: {
        type: Number,
        require: true
    },
    payments: [PaymentSchema],
    cliente: ClienteSchema,
    clientedb: {
        type: Boolean,
        default: true
    },
    ciudad: {
        type: String
    },
    departamento: {
        type: String
    },
    direccion: {
        type: String
    },
    telefono: {
        type: String
    },
    comentario: {
        type: String
    },
    estado: {
        type: String,
        default: 'Pendiente'
    },
    paystatus: {
        type: String
    },
    referencia: {
        type: String,
        unique: true
    },
    transaccion: {
        type: String,
        unique: true
    },
    local: {
        type: Boolean,
        default: false
    },
    confirmado: {
        type: Boolean,
        default: false
    },
    feedback: FeedbackSchema,
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