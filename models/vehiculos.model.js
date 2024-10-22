const { Schema, model } = require('mongoose');

const TechSchema = Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
})

// SCHEMA
const VehiculosSchema = Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Clients'
    },
    brand: {
        type: String,
    },
    model: {
        type: String,
    },
    year: {
        type: String,
    },
    description: {
        type: String,
    },
    placa: {
        type: String,
        require: true,
        unique: true
    },
    tech: [TechSchema],
    status: {
        type: Boolean,
        default: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

VehiculosSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.vid = _id;
    return object;

});

module.exports = model('vehiculos', VehiculosSchema);