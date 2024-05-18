const { Schema, model } = require('mongoose');

// ABONOS SCHEMA
const SalesSchema = Schema({
    facturas: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice'
    }
});

// MOVIMIENTOS SCHEMA
const MovementsSchema = Schema({
    descripcion: {
        type: String
    },
    monto: {
        type: Number
    },
    type: {
        type: String
    }
});

// ABONOS SCHEMA
const AbonoSchema = Schema({
    factura: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice'
    },
    pay: {
        type: String
    },
    monto: {
        type: Number
    }
});

// ABONOS SCHEMA
const AbonoComprasSchema = Schema({
    compra: {
        type: Schema.Types.ObjectId,
        ref: 'Compras'
    },
    pay: {
        type: String
    },
    monto: {
        type: Number
    }
});

// ALQUILERES SCHEMA
const AlquilerSchema = Schema({
    alquiler: {
        type: Schema.Types.ObjectId,
        ref: 'Alquileres'
    },
    payid: {
        type: String
    }
});

const DevolucionSchema = Schema({

    factura: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice'
    },
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

// INVOICE SCHEMA
const TurnoSchema = Schema({

    cajero: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    caja: {
        type: Schema.Types.ObjectId,
        ref: 'Caja',
        require: true
    },
    initial: {
        type: Number,
        require: true
    },
    sales: [SalesSchema],
    abonos: [AbonoSchema],
    abonosCompras: [AbonoComprasSchema],
    movements: [MovementsSchema],
    alquileres: [AlquilerSchema],
    status: {
        type: Boolean,
        default: true
    },
    cerrado: {
        type: Boolean,
        default: false
    },

    devolucion: [DevolucionSchema],

    diferencia: {
        type: Boolean,
        default: false
    },
    montoD: {
        type: Number
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    cierre: {
        type: Date
    }

});

TurnoSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.tid = _id;
    return object;

});


// invoice
module.exports = model('Turno', TurnoSchema);