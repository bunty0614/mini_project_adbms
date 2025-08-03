// src/PaymentForm.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from './components/BookingContext';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    booking_id: '',
    amount: '',
    payment_method: '',
  });

  const { setBookingData } = useContext(BookingContext); // ✅ Use context
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/payments', formData);
      setMessage('Payment recorded successfully!');

      // ✅ Update context
      setBookingData(prev => ({
        ...prev,
        paymentInfo: formData
      }));

      // ✅ Navigate to confirmation page
      navigate('/confirmation', {
        state: {
          bookingId: formData.booking_id,
          amount: formData.amount,
          status: 'Paid'
        }
      });

      setFormData({ booking_id: '', amount: '', payment_method: '' });
    } catch (err) {
      setMessage('Payment failed. Check Booking ID or server.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>Booking ID:</label>
        <input
          type="number"
          name="booking_id"
          value={formData.booking_id}
          onChange={handleChange}
          required
        />
        <br /><br />
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <br /><br />
        <label>Payment Method:</label>
        <select
          name="payment_method"
          value={formData.payment_method}
          onChange={handleChange}
          required
        >
          <option value="">--Select--</option>
          <option value="Credit Card">Credit Card</option>
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
        </select>
        <br /><br />
        <button type="submit">Pay Now</button>
        <button type="submit" className="btn btn-primary" style={{ marginLeft: '10px' }}>
          Next ➡️
        </button>
      </form>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default PaymentForm;
