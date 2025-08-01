const express = require('express');
const router = express.Router();
const db = require('../db');

// GET available rooms based on check-in and check-out
router.get('/check_availability', (req, res) => {
  const { check_in, check_out } = req.query;

  if (!check_in || !check_out) {
    return res.status(400).json({ error: 'Please provide check_in and check_out dates' });
  }

  const query = `
    SELECT r.room_id, rt.type_name
    FROM Rooms r
    JOIN Room_types rt ON r.room_type_id = rt.room_type_id
    WHERE r.room_id NOT IN (
      SELECT room_id FROM room_availability
      WHERE date BETWEEN ? AND ? AND is_available = 0
    )
  `;

  db.query(query, [check_in, check_out], (err, results) => {
    if (err) {
      console.error('Error fetching availability:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ available_rooms: results });
  });
});

module.exports = router;
