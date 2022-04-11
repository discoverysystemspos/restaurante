const { Schema, model } = require('mongoose');

const ComisionesSchema = Schema({
    activo: {
        type: Boolean,
        default: true
    },
    monto: {
        type: Number
    },
    comision: {
        type: Number
    }
});

const DatoSchema = Schema({

    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    nit: {
        type: String,
        require: true
    },
    impuesto: {
        type: Boolean,
        default: false
    },
    tax: {
        type: Number,
        default: 0,
        require: true
    },
    commission: {
        type: Boolean,
        default: false
    },
    comision: {
        type: Number,
        default: 0
    },
    commissions: {
        type: Boolean,
        default: false
    },
    comisiones: [ComisionesSchema],
    tip: {
        type: Boolean,
        default: false
    },
    propina: {
        type: Number,
        default: 0
    },
    printpos: {
        type: Boolean,
        default: true
    },
    responsable: {
        type: Boolean,
        default: false
    },
    impuestoconsumo: {
        type: Boolean,
        default: false
    },
    bascula: {
        type: Boolean,
        default: false
    },
    resolucion: {
        type: String
    },
    prefijopos: {
        type: String
    },
    logo: {
        type: String
    },
    comandas: {
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

//SECHENA
DatoSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.eid = _id;
    return object;

});

module.exports = model('Datos', DatoSchema);