import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/complaints';

function App() {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({
    studentName: '',
    roomNumber: '',
    category: 'Wifi',
    description: ''
  });

  // Fetch all complaints when the page loads
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(API_URL);
      setComplaints(res.data);
    } catch (err) {
      console.error('Error fetching complaints:', err);
    }
  };

  // Update formData whenever an input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit a new complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ studentName: '', roomNumber: '', category: 'Wifi', description: '' });
      fetchComplaints(); // refresh the list
    } catch (err) {
      console.error('Error submitting complaint:', err);
    }
  };

  // Update status of a complaint
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      fetchComplaints();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Delete a complaint
  const deleteComplaint = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchComplaints();
    } catch (err) {
      console.error('Error deleting complaint:', err);
    }
  };

  return (
    <div className="container">
      <h1>Hostel Complaint Tracker</h1>

      <form onSubmit={handleSubmit} className="complaint-form">
        <input
          type="text"
          name="studentName"
          placeholder="Your Name"
          value={formData.studentName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          value={formData.roomNumber}
          onChange={handleChange}
          required
        />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Wifi">Wifi</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Furniture">Furniture</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          name="description"
          placeholder="Describe the issue..."
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Complaint</button>
      </form>

      <h2>All Complaints</h2>
      <div className="complaint-list">
        {complaints.length === 0 && <p>No complaints yet.</p>}
        {complaints.map((c) => (
          <div key={c._id} className="complaint-card">
            <h3>{c.studentName} — Room {c.roomNumber}</h3>
            <p><strong>Category:</strong> {c.category}</p>
            <p><strong>Description:</strong> {c.description}</p>
            <p><strong>Status:</strong> {c.status}</p>
            <select
              value={c.status}
              onChange={(e) => updateStatus(c._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <button onClick={() => deleteComplaint(c._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;