const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newHospital = new Schema({
    country: String,
    hospitalname: String,
    facilityCode: String,
    userFirstname: String,
    userSecondname: String,
    emailAddress: String,
    hospitalAddress: String,
    phoneNumber:String,
    password: String,
    confirmPass: String,
},{timestamps: true})


module.exports = mongoose.model('Hospitals', newHospital);