const { useColors } = require('debug/src/browser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    ong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ongs'
    },

    title: {
        type: String,
    },

    description: {
        type: String,

    },

    value: {
        type: Number,
    }

});

module.exports = mongoose.model('Incidents', schema);