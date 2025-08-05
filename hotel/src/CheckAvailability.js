import React, { useState, useContext } from 'react';
import axios from 'axios';
import { BookingContext } from './components/BookingContext';
import { useNavigate } from 'react-router-dom';
import './CheckAvailability.css';

const CheckAvailability = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setBookingData } = useContext(BookingContext);
  const navigate = useNavigate();

  const handleCheck = async () => {
    if (!checkIn || !checkOut) {
      alert('📅 Please select both check-in and check-out dates.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/check_availability', {
        params: { check_in: checkIn, check_out: checkOut }
      });
      setAvailableRooms(res.data.available_rooms || []);
    } catch (err) {
      console.error('Error checking room availability:', err);
      alert('⚠️ Error checking availability. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!checkIn || !checkOut || availableRooms.length === 0) {
      alert('Please check availability before proceeding.');
      return;
    }

    setBookingData(prev => ({
      ...prev,
      availability: { checkIn, checkOut, availableRooms }
    }));

    navigate('/booking');
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">🏨 Check Room Availability</h2>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="checkIn">Check-in Date</label>
            <input
              type="date"
              id="checkIn"
              className="form-control"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="checkOut">Check-out Date</label>
            <input
              type="date"
              id="checkOut"
              className="form-control"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="d-flex justify-content-between mb-4">
          <button className="btn btn-outline-primary" onClick={handleCheck} disabled={loading}>
            {loading ? 'Checking...' : '🔍 Check Availability'}
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            Next ➡️
          </button>
        </div>

        <h5>Available Rooms:</h5>
        <ul className="list-group">
          {availableRooms.length === 0 ? (
            <li className="list-group-item text-muted">No rooms available or not checked yet.</li>
          ) : (
            availableRooms.map(room => (
              <li key={room.room_id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>Room ID:</strong> {room.room_id} &nbsp; | &nbsp;
                  <strong>Type:</strong> {room.type_name}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CheckAvailability;
