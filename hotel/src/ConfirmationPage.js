// src/ConfirmationPage.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { guestName, bookingId, amount, status } = location.state || {};

  if (!bookingId) {
    return (
      <div className="container mt-5">
        <h3>No booking information found.</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-success">🎉 Booking Confirmed!</h2>
        <p><strong>Guest Name:</strong> {guestName}</p>
        <p><strong>Booking ID:</strong> {bookingId}</p>
        <p><strong>Amount Paid:</strong> ₹{amount}</p>
        <p><strong>Payment Status:</strong> {status}</p>

        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
