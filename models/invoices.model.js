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
    },
    mayor: {
        type: Boolean,
        default: false
    }

});

const DevolucionSchema = Schema({

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    qty: {
        type: Number
    },
    price: {
        type: Number
    },
    monto: {
        type: Number
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

// Payment SCHEMA
const AlquilerPaidSchema = Schema({
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
        type: Date
    },
    turno: {
        type: Schema.Types.ObjectId,
        ref: 'Turnos'
    }
});

// INVOICE SCHEMA
const InvoiceSchema = Schema({

    invoice: {
        type: Number
    },
    control: {
        type: Number
    },
    nota: {
        type: String
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Clients'
    },
    pedido: {
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
    datafon: {
        type: Number
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
        dafault: 0
    },
    pago: {
        type: Number
    },
    vueltos: {
        type: Number
    },
    payments: [PaymentSchema],
    paymentsCredit: [AbonoSchema],
    devolucion: [DevolucionSchema],
    paymentsAlquiler: [AlquilerPaidSchema],
    credito: {
        type: Boolean,
        default: false
    },
    credit: {
        type: Boolean,
        default: false
    },
    apartado: {
        type: Boolean,
        default: false
    },
    fechaCredito: {
        type: Date
    },
    vencida: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    descuento: {
        type: Boolean,
        default: false
    },
    ocasional: {
        type: Boolean,
        default: false
    },
    send: {
        type: Boolean,
        default: false
    },
    electronica: {
        type: Boolean,
        default: false
    },
    prefix: {
        type: String,
    },
    number: {
        type: String,
    },
    porcentaje: {
        type: Number,
    },
    pdf_url: {
        type: String,
    },
    uuid: {
        type: String,
    },
    alquiler: {
        type: Schema.Types.ObjectId,
        ref: 'Alquileres'
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

InvoiceSchema.plugin(autoIncrement.plugin, {
    model: 'Invoice',
    field: 'control',
    startAt: process.env.INVOICE_INIT
});

// invoice
module.exports = model('Invoice', InvoiceSchema);