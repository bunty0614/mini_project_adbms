import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GuestForm.css';
import { BookingContext } from './components/BookingContext';

const GuestForm = () => {
  const [form, setForm] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: ''
  });

  const [guests, setGuests] = useState([]); // 🆕 to store guest list

  const { setBookingData } = useContext(BookingContext);
  const navigate = useNavigate();

  // Fetch all guests on load
  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/guests');
      setGuests(res.data);
    } catch (err) {
      console.error('Error fetching guests:', err);
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/guests', form);

      setBookingData(prev => ({
        ...prev,
        guestDetails: form
      }));

      alert('Guest registered successfully!');
      setForm({ fname: '', lname: '', phone: '', email: '' });

      await fetchGuests(); // Refresh list
      // navigate('/availability'); // ❌ Remove navigation if you want to show table below
    } catch (err) {
      console.error(err);
      alert('Error registering guest');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/guests/${id}`);
      await fetchGuests(); // Refresh after delete
    } catch (err) {
      console.error('Error deleting guest:', err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-3">Guest Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>First Name</label>
            <input
              className="form-control"
              name="fname"
              value={form.fname}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div className="mb-3">
            <label>Last Name</label>
            <input
              className="form-control"
              name="lname"
              value={form.lname}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register Guest
          </button>
        </form>
      </div>

      {/* 🔽 Guest Table */}
      <div className="mt-5">
        <h3 className="mb-3">Registered Guests</h3>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>First</th>
              <th>Last</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {guests.length > 0 ? (
              guests.map((guest) => (
                <tr key={guest.guest_id}>
                  <td>{guest.guest_id}</td>
                  <td>{guest.fname}</td>
                  <td>{guest.lname}</td>
                  <td>{guest.phone}</td>
                  <td>{guest.email}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(guest.guest_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No guests registered yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuestForm;
