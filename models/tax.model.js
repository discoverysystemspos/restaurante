const { Schema, model } = require('mongoose');

// SCHEMA
const TaxSchema = Schema({
    name: {
        type: String,
        require: true
    },
    valor: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    }
});

TaxSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.taxid = _id;
    return object;

});

module.exports = model('Tax', TaxSchema);