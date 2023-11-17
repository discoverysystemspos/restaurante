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