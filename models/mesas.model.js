const { Schema, model } = require('mongoose');

const carritoSchema = Schema({
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
        type: Number
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
        ref: 'User'
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Clients'
    },
    status: {
        type: Boolean,
        default: true
    },
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