const { Schema, model } = require('mongoose');

const kitsSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    qty: {
        type: Number,
        require: true
    }
});

const impuestoSchema = Schema({

    name: {
        type: String,
    },

    valor: {
        type: Number,
        require: true
    }
});

const ProductSchema = Schema({

    code: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        require: true
    },
    kit: [kitsSchema],
    cost: {
        type: Number,
        require: true
    },
    tax: {
        type: Boolean,
        default: false
    },
    impuesto: [impuestoSchema],
    inventario: {
        type: Number,
        default: 0
    },
    gain: {
        type: Number
    },
    price: {
        type: Number,
        require: true
    },
    wholesale: {
        type: Number
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
    },
    stock: {
        type: Number,
        default: 0
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 0
    },
    bought: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    returned: {
        type: Number,
        default: 0
    },
    damaged: {
        type: Number,
        default: 0
    },
    img: {
        type: String
    },
    expiration: {
        type: Date
    },
    vencido: {
        type: Boolean,
        default: false
    },
    low: {
        type: Boolean,
        default: false
    },
    out: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    visibility: {
        type: Boolean,
        default: true
    },
    comanda: {
        type: Boolean,
        default: false
    },
    tipo: {
        type: String
    },
    fecha: {
        type: Date,
        default: Date.now
    }

});

ProductSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.pid = _id;
    return object;

});

module.exports = model('Product', ProductSchema);