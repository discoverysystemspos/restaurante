const { Schema, model, connection } = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

/* The `ItemsSchema` is defining the schema for the items in the `AlquilerSchema` (rental schema). It
includes the following fields: */
const ItemsSchema = Schema({

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    desde: {
        type: Date
    },
    hasta: {
        type: Date
    },
    entregado: {
        type: Boolean,
        default: false
    }

});

/* The `PaymentSchema` is defining the schema for the payments in the `AlquilerSchema` (rental schema).
It includes the following fields: */
const PaymentSchema = Schema({
    type: {
        type: String
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    turno: {
        type: Schema.Types.ObjectId,
        ref: 'Turnos'
    }
});

// SCHEMA
/* The `AlquilerSchema` is defining the schema for the rental documents in the MongoDB collection. It
includes various fields such as `number`, `client`, `address`, `items`, `payments`, `amount`,
`fecha`, `fechaIni`, `user`, `cotizacion`, `finalizada`, `status`, and `turno`. */
const AlquilerSchema = Schema({

    number: {
        type: Number
    },

    client: {
        type: Schema.Types.ObjectId,
        ref: 'Clients',
        required: true
    },

    address: {
        type: String,
        required: true
    },

    items: [ItemsSchema],
    payments: [PaymentSchema],

    amount: {
        type: Number
    },

    fecha: {
        type: Date,
        default: Date.now
    },

    fechaIni: {
        type: Date
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    cotizacion: {
        type: Boolean,
        default: false
    },

    finalizada: {
        type: Boolean,
        default: false
    },

    status: {
        type: Boolean,
        default: true
    },
    turno: {
        type: Schema.Types.ObjectId,
        ref: 'Turnos'
    }
});

/* The `AlquilerSchema.method('toJSON', function() {...})` is defining a custom method called `toJSON`
for the `AlquilerSchema`. This method is used to modify the default behavior of converting a
document to a JSON object. */
AlquilerSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.alid = _id;
    return object;
});

/* The code `AlquilerSchema.plugin(autoIncrement.plugin, { model: 'Alquileres', field: 'number',
startAt: process.env.INVOICE_INIT });` is using the `autoIncrement` plugin from the
`mongoose-auto-increment` package to automatically generate and increment the `number` field in the
`AlquilerSchema` schema. */
AlquilerSchema.plugin(autoIncrement.plugin, {
    model: 'Alquileres',
    field: 'number',
    startAt: process.env.INVOICE_INIT
});

/* `module.exports = model('Alquileres', AlquilerSchema);` is exporting the `Alquileres` model, which
is created using the `model` function from the `mongoose` library. */
module.exports = model('Alquileres', AlquilerSchema);