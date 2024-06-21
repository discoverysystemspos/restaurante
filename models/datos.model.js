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

const HeaderSchema = Schema({
    texto: {
        type: String,
    },
    bold: {
        type: Boolean,
        default: false
    },
    size: {
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
    comandas: {
        type: Boolean,
        default: false
    },

    datafon: {
        type: Boolean,
        default: false
    },

    comidatafon: {
        type: Number,
        default: 0
    },

    alquileres: {
        type: Boolean,
        default: false
    },

    parqueadero: {
        type: Boolean,
        default: false
    },

    domi: {
        type: Boolean,
        default: false
    },

    comision: {
        type: Number,
        default: 0
    },

    impresora: {
        type: Number,
        default: 58
    },

    commissions: {
        type: Boolean,
        default: false
    },
    cotizacion: {
        type: Boolean,
        default: true
    },
    comisiones: [ComisionesSchema],
    header: {
        type: String,
        default: '0000112233 \nBucaramanga \n000000000 \nNo responsable de IVA'
    },
    footer: {
        type: String,
        default: 'GRACIAS POR SU COMPRA \nFactura impresa por SIMIDS \n(Nataly Castillo) \nNIT. 1090502421-0'
    },
    tip: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'Factura de venta pos'
    },
    propina: {
        type: Number,
        default: 0
    },
    printpos: {
        type: Boolean,
        default: true
    },
    noresponsable: {
        type: Boolean,
        default: false
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
    basculaimp: {
        type: Boolean,
        default: false
    },
    basculatype: {
        type: String,
        default: 'precio'
    },
    basculacode: {
        type: String,
        default: '2000'
    },
    fruver: {
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
    moneda: {
        type: String,
        default: 'COP'
    },
    decimal: {
        type: Boolean,
        default: false
    },
    usd: {
        type: Boolean,
        default: false
    },
    currencyusd: {
        type: Number
    },
    cop: {
        type: Boolean,
        default: false
    },
    bs: {
        type: Boolean,
        default: false
    },

    currencycop: {
        type: Number
    },

    currencybs: {
        type: Number
    },

    min: {
        type: Number,
        default: 212000
    },

    currencycop: {
        type: Number
    },

    electronica: {
        type: Boolean,
        default: false
    },

    status: {
        type: Boolean,
        default: true
    },

    fechakardex: {
        type: Date
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