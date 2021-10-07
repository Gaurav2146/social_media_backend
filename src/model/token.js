/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({

    TokenType: {
        type: String,
        require: true
    },
    TokenName: {
        type: String,
        require: true
    },
    Symbol: {
        type: String,
        require: true,
        unique : true
    },
    ContractAddress: {
        type: String,
        require: true,
        unique : true
    },
    ContractABI: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
