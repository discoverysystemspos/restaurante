const { Schema, model } = require('mongoose');

const TypeparqSchema = Schema({

    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    plena: {
        type: Number
    },
    tplena: {
        type: Number
    },
    type: {
        type: String,
        default: 'Minutos'
    },
    tax: {
        type: Schema.Types.ObjectId,
        ref: 'Tax',
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

TypeparqSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.tpid = _id;
    return object;

});

module.exports = model('Typeparqs', TypeparqSchema);