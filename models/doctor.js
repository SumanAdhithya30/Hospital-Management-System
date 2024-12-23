// models/doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    experience: { type: Number, required: true }  // Add experience field
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
