const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/payments
router.post('/payments', (req, res) => {
  const { guest_id, booking_id, amount, payment_mode } = req.body;

  if (!guest_id || !booking_id || !amount || !payment_mode) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  const query = `
    INSERT INTO Payments (guest_id, booking_id, amount, payment_mode)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [guest_id, booking_id, amount, payment_mode], (err, result) => {
    if (err) {
      console.error('Error inserting payment:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'Payment successful', payment_id: result.insertId });
  });
});

module.exports = router;
