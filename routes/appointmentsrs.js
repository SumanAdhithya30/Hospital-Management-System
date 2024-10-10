const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');


// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId').populate('patientId');
    res.json(appointments);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create an appointment
router.post('/', async (req, res) => {
  const appointment = new Appointment({
    patientId: req.body.patientId,
    doctorId: req.body.doctorId,
    date: req.body.date,
    time: req.body.time,
    purpose: req.body.purpose
  });
  try {
    const savedAppointment = await appointment.save();
    res.json(savedAppointment);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update an appointment
router.put('/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
