const { Schema, model } = require('mongoose');

const DepartmentSchema = Schema({

    name: {
        type: String,
        require: true
    },
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

DepartmentSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.did = _id;
    return object;

});

module.exports = model('Department', DepartmentSchema);