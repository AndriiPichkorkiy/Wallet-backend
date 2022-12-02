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
            id: Schema.Types.Int32,
            name: String
        },
        required: true
    },
    comment: String,
    amount: {
        type: Schema.Types.Decimal128,
        required: [true, 'Set the transaction amount']
    },
    
    // balance: {
    //     type: Schema.Types.Decimal128,
    //     required: [true, 'Set the transaction balance']  
    // },
    // createdAt: {
    //     type: Schema.Types.Data
    // },
    // year: {
    //     type: Schema.Types.Int32,
    // },
    // month: {
    //     type: Schema.Types.Int32,
    // }

},
    { versionKey: false, timestamps: true }
);

const schemaAdd = Joi.object({
    type: Joi.boolean().required(),
    category: Joi.object({
        id: Joi.number().integer(),
        name: Joi.string()
    }).required(),
    comment: Joi.string(),
    amount: Joi.number().positive().precision(2).required(),
});

const schemasJoiTransaction = {
    schemaAdd,
}


transactionSchema.post("save", handleSchemaErrors);

const Transaction = model("transaction", transactionSchema);

module.exports = {
    Transaction,
    schemasJoiTransaction

}