const { Schema, model } = require('mongoose');

// SCHEMA
const identitycountersSchema = Schema({
    count: {
        type: Number
    },
    model: {
        type: String
    },
    field: {
        type: String
    },
});

identitycountersSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.conid = _id;
    return object;

});

module.exports = model('identitycounters', identitycountersSchema);