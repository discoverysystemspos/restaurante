const { Schema, model } = require('mongoose');

const NumberingSchema = Schema({

    resolution_number: {
        type: String
    },

    prefix: {
        type: String
    },

    flexible: {
        type: Boolean,
        default: false
    }
});

const AttachmentsSchema = Schema({
    name: {
        type: String
    },
    data: {
        type: String
    }
});

const ActionsSchema = Schema({
    send_dian: {
        type: Boolean,
        default: false
    },
    send_email: {
        type: Boolean,
        default: false
    },
    email: {
        type: String
    },
    pdf: {
        type: String
    },
    attachments: [AttachmentsSchema],
});

const CustomerSchema = Schema({

    department: {
        type: String
    },
    address_line: {
        type: String
    },
    party_type: {
        type: String,
        default: 'PERSONA_NATURAL'
    },
    city: {
        type: String
    },
    tax_level_code: {
        type: String,
        default: 'NO_RESPONSABLE_DE_IVA'
    },
    email: {
        type: String
    },
    country_code: {
        type: String,
        default: 'CO'
    },
    first_name: {
        type: String
    },
    phone: {
        type: String
    },
    party_identification_type: {
        type: String,
        default: 'NIT'
    },
    company_name: {
        type: String
    },
    family_name: {
        type: String
    },
    regimen: {
        type: String,
        default: 'SIMPLE'
    },
    party_identification: {
        type: String
    },

});

const DataicoSchema = Schema({

    invoice_type_code: {
        type: String,
        default: 'FACTURA_VENTA'
    },

    actions: ActionsSchema,

    authtoken: {
        type: String,
    },

    dataico_account_id: {
        type: String,
    },

    customer: CustomerSchema,

    numbering: NumberingSchema,

    env: {
        type: String,
    },

    operation: {
        type: String,
        default: 'ESTANDAR'
    }

});

//SECHENA
DataicoSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.daid = _id;
    return object;

});

module.exports = model('Dataico', DataicoSchema);