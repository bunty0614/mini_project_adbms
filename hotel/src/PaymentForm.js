// src/PaymentForm.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from './components/BookingContext';
import './PaymentForm.css';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    booking_id: '',
    amount: '',
    payment_method: '',
  });

  const { setBookingData } = useContext(BookingContext);
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

    const { booking_id, amount, payment_method } = formData;

    if (!booking_id || !amount || !payment_method) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      // POST to backend
      await axios.post('http://localhost:5000/api/payments', formData);

      setMessage('✅ Payment recorded successfully!');

      // Update context
      setBookingData(prev => ({
        ...prev,
        paymentInfo: formData
      }));

      // Navigate to confirmation page
      navigate('/confirmation', {
        state: {
          bookingId: booking_id,
          amount: amount,
          status: 'Paid'
        }
      });

      // Reset form
      setFormData({ booking_id: '', amount: '', payment_method: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Payment failed. Check Booking ID or server.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow" style={{ maxWidth: '450px', margin: 'auto' }}>
        <h2 className="mb-3 text-center">💳 Make a Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Booking ID:</label>
            <input
              type="number"
              className="form-control"
              name="booking_id"
              value={formData.booking_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Amount (₹):</label>
            <input
              type="number"
              className="form-control"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Payment Method:</label>
            <select
              name="payment_method"
              className="form-select"
              value={formData.payment_method}
              onChange={handleChange}
              required
            >
              <option value="">--Select--</option>
              <option value="Credit Card">Credit Card</option>
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Pay Now ➡️
          </button>
        </form>

        {message && (
          <div className="alert alert-info mt-3 text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
