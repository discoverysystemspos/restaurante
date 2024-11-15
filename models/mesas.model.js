const { Schema, model } = require('mongoose');

const notaSchema = Schema({
    nota: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const imagesSchema = Schema({
    img: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const carritoSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    iva: {
        type: Number,
        require: true,
        default: 0
    },
    qty: {
        type: Number,
        require: true
    },
    price: {
        type: Number
    },
    estado: {
        type: String,
        default: 'Pendiente'
    },
    mayor: {
        type: Boolean,
        default: false
    }
});

const ingredientesSchema = Schema({
    name: {
        type: String
    },
    qty: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    }
});

const comandaSchema = Schema({

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    ingredientes: [ingredientesSchema],
    qty: {
        type: Number,
        require: true
    },
    nota: {
        type: String
    },
    estado: {
        type: String,
        default: 'Pendiente'
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

const MesasSchema = Schema({

    name: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    mesero: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Clients'
    },
    piso: {
        type: Schema.Types.ObjectId,
        ref: 'Pisos'
    },
    nota: [notaSchema],
    comanda: [comandaSchema],
    status: {
        type: Boolean,
        default: true
    },
    menu: {
        type: Boolean,
        default: false
    },
    descuento: {
        type: Boolean,
        default: false
    },
    porcentaje: {
        type: Number,
    },
    placa: {
        type: String,
    },
    notaf: {
        type: String,
    },
    images: [imagesSchema],
    carrito: [carritoSchema],
    fecha: {
        type: Date,
        default: Date.now
    }

});

MesasSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.mid = _id;
    return object;

});

module.exports = model('Mesas', MesasSchema);