const { Schema, model } = require('mongoose');

const ParqueoSchema = Schema({

    car: {
        type: Schema.Types.ObjectId,
        ref: 'Cars',
    },
    placa: {
        type: String,
        require: true
    },
    checkin: {
        type: Number,
        require: true
    },
    checkout: {
        type: Number
    },
    total: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    estado: {
        type: String,
        default: 'Parqueado'
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

ParqueoSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.parqid = _id;
    return object;

});

module.exports = model('Parqueo', ParqueoSchema);