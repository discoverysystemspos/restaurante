const { Schema, model } = require('mongoose');

const PaymentSchema = Schema({
    type: {
        type: String
    },

    metodo: {
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


const PrestamosSchema = Schema({

    client: {
        type: Schema.Types.ObjectId,
        ref: 'Clients',
        require: true
    },

    diario: {
        type: Boolean,
        default: false
    },

    frecuencia: {
        type: Number
    },

    payments: [PaymentSchema],

    vence: {
        type: Number
    },

    monto: {
        type: Number
    },

    porcentaje: {
        type: Number
    },

    completo: {
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

PrestamosSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.presid = _id;
    return object;

});

module.exports = model('Prestamos', PrestamosSchema);