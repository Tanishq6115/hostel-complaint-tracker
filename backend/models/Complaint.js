const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Electrical', 'Plumbing', 'Wifi', 'Furniture', 'Cleaning', 'Other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);