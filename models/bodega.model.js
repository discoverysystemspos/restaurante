const { Schema, model } = require('mongoose');

const BodegasSchema = Schema({

    name: {
        type: String,
        require: true
    },
    endpoint: {
        type: String,
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

BodegasSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.bid = _id;
    return object;

});

module.exports = model('Bodegas', BodegasSchema);