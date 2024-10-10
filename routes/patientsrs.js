const express = require('express');
const Patient = require('../models/patient');
const router = express.Router();

// Create a new patient
router.post('/', async (req, res) => {
    const newPatient = new Patient(req.body);
    try {
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a patient by ID
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        res.status(200).json(patient);
    } catch (err) {
        res.status(404).json(err);
    }
});

// Update a patient
router.put('/:id', async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPatient);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a patient
router.delete('/:id', async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.status(200).json("Patient deleted successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
