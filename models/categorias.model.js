const { Schema, model } = require('mongoose');

const departamentoSchema = Schema({

    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }
});

const CategoriasSchema = Schema({

    name: {
        type: String,
        require: true
    },
    department: [departamentoSchema],
    img: {
        type: String,
        require: true
    },
    visibility: {
        type: Boolean,
        default: true
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

CategoriasSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.catid = _id;
    return object;

});

module.exports = model('Categorias', CategoriasSchema);