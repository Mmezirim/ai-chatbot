const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docData = new Schema({
    field: {
        type: String,
        required: true
    },
    folioNum: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    Other: String,
    email: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Doctors', docData);