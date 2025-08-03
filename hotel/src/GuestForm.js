import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { BookingContext } from './components/BookingContext';

const GuestForm = () => {
  const [form, setForm] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: ''
  });

  const { bookingData, setBookingData } = useContext(BookingContext);
  const navigate = useNavigate(); // For navigation to next form

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Send form data to backend
      await axios.post('http://localhost:5000/api/guests', form);

      // Store in context for later use
      setBookingData(prev => ({
        ...prev,
        guestDetails: form
      }));

      alert('Guest registered successfully!');

      // Clear form
      setForm({ fname: '', lname: '', phone: '', email: '' });

      // Navigate to availability form
      navigate('/availability');
    } catch (err) {
      console.error(err);
      alert('Error registering guest');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Guest</h2>
      <input
        name="fname"
        value={form.fname}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        name="lname"
        value={form.lname}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <button type="submit" className="btn btn-primary">
        Register & Next ➡️
      </button>
    </form>
  );
};

export default GuestForm;
