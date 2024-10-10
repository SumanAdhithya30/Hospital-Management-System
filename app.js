const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors
const patientRoutes = require('./routes/patientsrs');
const doctorRoutes = require('./routes/doctorsrs');
const appointmentRoutes = require('./routes/appointmentsrs');

const app = express();
const PORT = 3000;

// Enable CORS for all routes (you can restrict it to certain domains later)
app.use(cors());  // Add this line to enable CORS

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospital', {
  // Your MongoDB connection settings
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
