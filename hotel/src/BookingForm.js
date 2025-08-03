import React, { useState, useContext } from 'react';
import axios from 'axios';
import { BookingContext } from './components/BookingContext';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const [guestId, setGuestId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [status, setStatus] = useState('');

  const { bookingData } = useContext(BookingContext);
  const navigate = useNavigate();

  const checkIn = bookingData?.availability?.checkIn || '';
  const checkOut = bookingData?.availability?.checkOut || '';
  const availableRooms = bookingData?.availability?.availableRooms || [];

  const handleBooking = async () => {
    if (!guestId || !roomId || !checkIn || !checkOut) {
      alert('All fields are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/book_room', {
        guest_id: guestId,
        room_id: roomId,
        check_in: checkIn,
        check_out: checkOut
      });

      setStatus(res.data.message || 'Room booked successfully!');
    } catch (err) {
      console.error(err);
      setStatus('Booking failed. Please try again.');
    }
  };

  const handleNext = () => {
    // Navigate to payment or confirmation
    navigate('/payment'); // Change this path as per your routing
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-3">Book a Room</h2>

        <div className="mb-3">
          <label className="form-label">Guest ID</label>
          <input
            type="number"
            className="form-control"
            value={guestId}
            onChange={(e) => setGuestId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Room ID</label>
          <select
            className="form-select"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            <option value="">-- Select Room --</option>
            {availableRooms.map((room) => (
              <option key={room.room_id} value={room.room_id}>
                {room.room_id} - {room.type_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Check-in Date</label>
          <input type="date" className="form-control" value={checkIn} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Check-out Date</label>
          <input type="date" className="form-control" value={checkOut} readOnly />
        </div>

        <div className="d-flex justify-content-between">
          <button className="btn btn-success" onClick={handleBooking}>
            📩 Book Now
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            Next ➡️
          </button>
        </div>

        {status && <div className="alert alert-info mt-3">{status}</div>}
      </div>
    </div>
  );
};

export default BookingForm;
