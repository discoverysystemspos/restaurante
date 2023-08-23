const { Schema, model } = require('mongoose');

// SCHEMAS
const BancosSchema = Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

BancosSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.baid = _id;
    return object;

});

module.exports = model('Bancos', BancosSchema);