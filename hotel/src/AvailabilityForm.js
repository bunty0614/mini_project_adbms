// src/AvailabilityForm.js
import React, { useState } from 'react';

const AvailabilityForm = () => {
  const [dates, setDates] = useState({
    check_in: '',
    check_out: ''
  });

  const [availableRooms, setAvailableRooms] = useState(null);

  const handleChange = (e) => {
    setDates({...dates, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { check_in, check_out } = dates;

    const res = await fetch(`http://localhost:5000/api/bookings/check_availability?check_in=${check_in}&check_out=${check_out}`);

    const data = await res.json();
    setAvailableRooms(data);
  };

  return (
    <div>
      <h2>Check Room Availability</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="check_in" onChange={handleChange} required />
        <input type="date" name="check_out" onChange={handleChange} required />
        <button type="submit">Check</button>
      </form>
      {availableRooms && (
        <pre>{JSON.stringify(availableRooms, null, 2)}</pre>
      )}
    </div>
  );
};

export default AvailabilityForm;
