const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/payments
router.post('/', (req, res) => {
  const { booking_id, amount_paid, payment_method } = req.body;

  if (!booking_id || !amount_paid || !payment_method) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  const query = `
    INSERT INTO Payments (booking_id, payment_date, amount_paid, payment_method)
    VALUES (?, CURDATE(), ?, ?)
  `;

  db.query(query, [booking_id, amount_paid, payment_method], (err, result) => {
    if (err) {
      console.error('Error inserting payment:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({
      message: 'Payment successful',
      payment_id: result.insertId
    });
  });
});

module.exports = router;
