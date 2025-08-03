import React, { useState, useContext } from 'react';
import axios from 'axios';
import { BookingContext } from './components/BookingContext';
import { useNavigate } from 'react-router-dom'; // ✅ FIXED: Import navigation hook

const CheckAvailability = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);

  const { setBookingData } = useContext(BookingContext); // ✅ Only using setter
  const navigate = useNavigate();

  const handleCheck = async () => {
    if (!checkIn || !checkOut) {
      alert('Please select both dates');
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/check_availability', {
        params: {
          check_in: checkIn,
          check_out: checkOut
        }
      });
      setAvailableRooms(res.data.available_rooms);
    } catch (err) {
      console.error(err);
      alert('Error checking availability');
    }
  };

  const handleNext = () => {
    if (!checkIn || !checkOut) {
      alert('Please check availability before proceeding.');
      return;
    }

    // Save to context
    setBookingData(prev => ({
      ...prev,
      availability: { checkIn, checkOut, availableRooms }
    }));

    navigate('/booking'); // ✅ Navigate to next form
  };

  return (
    <div>
      <h2>Check Room Availability</h2>
      <label>Check-in Date: </label>
      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />

      <label>Check-out Date: </label>
      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />

      <button onClick={handleCheck}>Check Availability</button>
      <button className="btn btn-primary" onClick={handleNext}>Next ➡️</button>

      <h3>Available Rooms:</h3>
      <ul>
        {availableRooms.length === 0 ? (
          <li>No rooms available or not checked yet</li>
        ) : (
          availableRooms.map(room => (
            <li key={room.room_id}>
              Room ID: {room.room_id}, Type: {room.type_name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CheckAvailability;
