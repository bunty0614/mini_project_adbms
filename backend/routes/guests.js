const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all guests
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Guests';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching guests:', err);
      return res.status(500).json({ error: 'Failed to retrieve guests' });
    }
    res.json(results);
  });
});

// POST a new guest
router.post('/', (req, res) => {
  const { fname, lname, phone, email } = req.body;

  if (!fname || !lname || !phone || !email) {
    return res.status(400).json({ error: 'Please provide all guest details.' });
  }

  const query = `
    INSERT INTO Guests (fname, lname, phone, email)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [fname, lname, phone, email], (err, result) => {
    if (err) {
      console.error('Error inserting guest:', err);
      return res.status(500).json({ error: 'Database error while adding guest.' });
    }

    res.json({ message: 'Guest added successfully!', guest_id: result.insertId });
  });
});

module.exports = router;
