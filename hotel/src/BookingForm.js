import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BookingContext } from './components/BookingContext';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = () => {
  const [guestId, setGuestId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [advancePayment, setAdvancePayment] = useState('');
  const [status, setStatus] = useState('');
  const [allBookings, setAllBookings] = useState([]); // ✅ NEW

  const { bookingData } = useContext(BookingContext);
  const navigate = useNavigate();

  const checkIn = bookingData?.availability?.checkIn || '';
  const checkOut = bookingData?.availability?.checkOut || '';
  const availableRooms = bookingData?.availability?.availableRooms || [];

  // ✅ Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings');
      setAllBookings(res.data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  // ✅ Call it on page load and after successful booking
  useEffect(() => {
    fetchBookings();
  }, []);

  const handleBooking = async () => {
    if (!guestId || !roomId || !checkIn || !checkOut || !advancePayment) {
      alert('All fields are required, including advance payment.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/book_room', {
        guest_id: guestId,
        room_id: roomId,
        check_in_date: checkIn,
        check_out_date: checkOut,
        advance_payment: advancePayment
      });

      setStatus(res.data.message || 'Room booked successfully!');
      fetchBookings(); // ✅ Refresh bookings list
    } catch (err) {
      console.error(err);
      setStatus('Booking failed. Please try again.');
    }
  };

  const handleNext = () => {
    navigate('/payment'); // Update if needed
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
          <label className="form-label">Advance Payment (₹)</label>
          <input
            type="number"
            className="form-control"
            value={advancePayment}
            onChange={(e) => setAdvancePayment(e.target.value)}
            placeholder="Enter amount"
          />
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

      {/* ✅ Booking Table */}
      <div className="card p-4 shadow mt-4">
        <h4 className="mb-3">📋 All Bookings</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Booking ID</th>
                <th>Guest Name</th>
                <th>Room ID</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Total Amount</th>
                <th>Advance Payment</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">No bookings yet.</td>
                </tr>
              ) : (
                allBookings.map((b) => (
                  <tr key={b.booking_id}>
                    <td>{b.booking_id}</td>
                    <td>{b.fname} {b.lname}</td>
                    <td>{b.room_id}</td>
                    <td>{b.check_in_date}</td>
                    <td>{b.check_out_date}</td>
                    <td>{b.total_amount}</td>
                    <td>{b.advance_payment}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
