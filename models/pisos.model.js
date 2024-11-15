const { Schema, model } = require('mongoose');

const MesasSchema = Schema({

    mesa: {
        type: Schema.Types.ObjectId,
        ref: 'Mesas'
    }
});

const PisosSchema = Schema({

    name: {
        type: String,
        require: true
    },
    mesas: [MesasSchema],
    status: {
        type: Boolean,
        default: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }

});

PisosSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.piid = _id;
    return object;

});

module.exports = model('Pisos', PisosSchema);