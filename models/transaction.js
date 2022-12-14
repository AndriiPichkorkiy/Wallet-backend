const { model, Schema } = require('mongoose');
const Joi = require('joi');
const { handleSaveErrors } = require('../helpers');

// const now = new Date();
// const nowYear = now.getFullYear(); 
const startTime = new Date(0);

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
    comment: {
        type: String,
        
    },
    amount: {
        type: Number,
        required: [true, 'Set the transaction amount']
    },
    
    balance: {
        type: Number,
        required: [true, 'Set the transaction balance']  
    },

    date: {
        type: Date,
        min: startTime,
        required: [true, 'Set the transaction date']
    }
},{ versionKey: false}
);

const schemaAdd = Joi.object({
    type: Joi.boolean().required(),
    category: Joi.number().integer().required(),
    comment: Joi.string().min(0).max(250),
    amount: Joi.number().precision(2).min(0).max(1000000000).required(),
    date: Joi.date().min(0)
});

const schemaGetAll = Joi.object({
    page: Joi.number(),
    limit: Joi.number()
});

const schemaGetStatistic = Joi.object({
    year: Joi.number().min(0),
    month: Joi.number().min(1).max(12)
});

const schemaPostTestTransactions = Joi.object({
    year: Joi.number().min(0),
    month: Joi.number().min(1).max(12),
    day: Joi.number().min(1).max(31),
    number: Joi.number().min(1).max(120),
    sum: Joi.number().min(1).max(20000),
})


const schemasJoi = {
    schemaAdd,
    schemaGetStatistic,
    schemaGetAll,
    schemaPostTestTransactions
}

transactionSchema.post("save", handleSaveErrors);

const Transaction = model("transaction", transactionSchema);

module.exports = {
    Transaction,
    schemasJoi
}