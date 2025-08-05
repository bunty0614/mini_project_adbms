const express = require('express');
const router = express.Router();
const db = require('../db');

// Check room availability
router.get('/check_availability', (req, res) => {
  const { room_id, date } = req.query;

  if (!room_id || !date) {
    return res.status(400).json({ error: 'Room ID and date are required' });
  }

  const query = `
    SELECT * FROM Room_Availability
    WHERE room_id = ? AND date = ? AND is_available = 1
  `;

  db.query(query, [room_id, date], (err, results) => {
    if (err) {
      console.error('Error checking availability:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.json({ available: false });
    }

    res.json({ available: true });
  });
});

// Book a room
router.post('/book_room', (req, res) => {
  const {
    guest_id,
    room_id,
    check_in_date,
    check_out_date,
    total_amount,
    advance_payment
  } = req.body;

  if (!guest_id || !room_id || !check_in_date || !check_out_date) {
    return res.status(400).json({ error: 'Missing booking information' });
  }

  const query = `
    INSERT INTO Bookings (guest_id, room_id, check_in_date, check_out_date, total_amount, advance_payment)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [guest_id, room_id, check_in_date, check_out_date, total_amount || 0, advance_payment || 0],
    (err, result) => {
      if (err) {
        console.error('Error inserting booking:', err);
        return res.status(500).json({ error: 'Booking failed' });
      }

      res.status(201).json({
        message: 'Room booked successfully',
        booking_id: result.insertId
      });
    }
  );
});

// Get all bookings
router.get('/bookings', (req, res) => {
  const query = `
    SELECT 
      b.booking_id,
      g.fname,
      g.lname,
      r.room_id,
      b.check_in_date,
      b.check_out_date,
      b.total_amount,
      b.advance_payment
    FROM Bookings b
    JOIN Guests g ON b.guest_id = g.guest_id
    JOIN Rooms r ON b.room_id = r.room_id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }

    res.json(results);
  });
});

module.exports = router;
