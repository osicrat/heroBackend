const { useColors } = require('debug/src/browser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    city: {
        type: String
    },
    uf: {
        type: String
    }


});

module.exports = mongoose.model('Ongs', schema);