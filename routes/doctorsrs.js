const express = require('express');
const Doctor = require('../models/doctor');
const router = express.Router();

// Create a new doctor
router.post('/', async (req, res) => {
    const newDoctor = new Doctor(req.body);
    try {
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a doctor by ID
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        res.status(200).json(doctor);
    } catch (err) {
        res.status(404).json(err);
    }
});

// Update a doctor
router.put('/:id', async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedDoctor);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a doctor
router.delete('/:id', async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.status(200).json("Doctor deleted successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
