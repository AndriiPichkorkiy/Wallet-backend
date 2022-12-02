const { model, Schema } = require('mongoose');
const Joi = require('joi');
const { handleSchemaErrors } = require('../helpers');


const transactionSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    
    type: {
        type: Boolean,
        required: [true, 'Set type for transaction']
    },
    category: {
        type: {
            id: Number,
            name: String
        },
        required: true,
        versionKey: false,
    },
    comment: String,
    amount: {
        type: Number,
        required: [true, 'Set the transaction amount']
    },
    
    balance: {
        type: Number,
        required: [true, 'Set the transaction balance']  
    }
},{ versionKey: false, timestamps: true }
);

const schemaAdd = Joi.object({
    type: Joi.boolean().required(),
    category: Joi.object({
        id: Joi.number().integer().required(),
        name: Joi.string().required()
    }).required(),
    comment: Joi.string(),
    amount: Joi.number().min(0).precision(2).required(),
});

const schemasJoi = {
    schemaAdd,
}

transactionSchema.post("save", handleSchemaErrors);

const Transaction = model("transaction", transactionSchema);

module.exports = {
    Transaction,
    schemasJoi

}