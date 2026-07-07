const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const complaintRoutes = require('./routes/complaintRoutes');   // ADD THIS LINE

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/complaints', complaintRoutes);   // ADD THIS LINE

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hostel Complaint Tracker API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));