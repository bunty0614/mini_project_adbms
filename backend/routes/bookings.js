const express = require('express');
const router = express.Router();
const db = require('../db');

// Helper to get all dates between check-in and check-out
function getDateRange(start, end) {
  const dateArray = [];
  const currentDate = new Date(start);
  const endDate = new Date(end);

  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate).toISOString().split('T')[0]); // Format: YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

// ✅ 1. GET /check_availability
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
      SELECT room_id
      FROM room_availability
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

// ✅ 2. POST /book_room
router.post('/book_room', (req, res) => {
  const { guest_id, room_id, check_in, check_out } = req.body;

  if (!guest_id || !room_id || !check_in || !check_out) {
    return res.status(400).json({ error: 'Missing booking details' });
  }

  const bookingQuery = `
    INSERT INTO Bookings (guest_id, room_id, check_in, check_out)
    VALUES (?, ?, ?, ?)
  `;

  db.query(bookingQuery, [guest_id, room_id, check_in, check_out], (err, result) => {
    if (err) {
      console.error('Error creating booking:', err);
      return res.status(500).json({ error: 'Failed to create booking' });
    }

    const booking_id = result.insertId;
    const dates = getDateRange(check_in, check_out);
    const availabilityUpdates = dates.map(date => [room_id, date, 0]);

    const updateQuery = `
      INSERT INTO room_availability (room_id, date, is_available)
      VALUES ?
      ON DUPLICATE KEY UPDATE is_available = 0
    `;

    db.query(updateQuery, [availabilityUpdates], (err2) => {
      if (err2) {
        console.error('Error updating availability:', err2);
        return res.status(500).json({ error: 'Booking done, but availability update failed' });
      }

      res.json({ message: 'Room booked successfully!', booking_id });
    });
  });
});

module.exports = router;
