const { model, Schema } = require('mongoose');
const Joi = require('joi');
const { handleSaveErrors } = require('../helpers');


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
            id: {
                type: Number,
                required: true,
            },
            name: {
                type: String,
                required: [true, 'Category by id not found'],
            }
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
    category: Joi.number().integer().required(),
    comment: Joi.string().max(240),
    amount: Joi.number().min(0).max(1000000000).precision(2).required(),
});

const schemasJoi = {
    schemaAdd,
}

transactionSchema.post("save", handleSaveErrors);

const Transaction = model("transaction", transactionSchema);

module.exports = {
    Transaction,
    schemasJoi

}