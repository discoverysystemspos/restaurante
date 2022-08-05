const { Schema, model } = require('mongoose');


const MovimientosSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    monto: {
        type: Number,
        require: true
    },
    descripcion: {
        type: String
    },
    type: {
        type: String,
        require: true
    },
    turno: {
        type: Schema.Types.ObjectId,
        ref: 'Turnos',
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

MovimientosSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.moid = _id;
    return object;

});


// invoice
module.exports = model('Movimientos', MovimientosSchema);