const { Schema, model } = require('mongoose');

// SCHEMA CALENDARIO
const CalendarioSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    title: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }

});

CalendarioSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.calid = _id;
    return object;

});

module.exports = model('Calendario', CalendarioSchema);