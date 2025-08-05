// src/components/Navbar.js
import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">Hotel Booking</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">🏠 Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/guest">👤 Guest Form</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/availability">📅 Check Availability</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/booking">📝 Booking</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/payment">💳 Payment</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/confirmation">✅ Confirmation</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
