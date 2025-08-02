// src/App.js
import React from 'react';
import GuestsForm from './GuestsForm';
import AvailabilityForm from './AvailabilityForm';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Hotel Booking Tester</h1>
      <GuestsForm />
      <hr />
      <AvailabilityForm />
    </div>
  );
}

export default App;
