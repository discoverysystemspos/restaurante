const { Schema, model } = require('mongoose');

const LocalizacionSchema = Schema({
    lat: {
        type: Number
    },
    lng: {
        type: Number
    }
});

const CarritoSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },

    qty: {
        type: Number
    },

    monto: {
        type: Number
    },


});

const DomiciliosSchema = Schema({

    ubicacion: LocalizacionSchema,
    name: {
        type: String,
    },

    nombres: {
        type: String,
    },

    referencia: {
        type: String,
    },

    telefono: {
        type: String,
    },

    nota: {
        type: String,
    },

    wid: {
        type: String,
    },

    estado: {
        type: String,
        default: 'Pendiente'
    },

    carrito: [CarritoSchema],

    pago: {
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

DomiciliosSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.doid = _id;
    return object;

});

module.exports = model('Domicilios', DomiciliosSchema);