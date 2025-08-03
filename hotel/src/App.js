import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';
import GuestForm from './GuestForm';
import CheckAvailability from './CheckAvailability';
import BookingForm from './BookingForm';
import PaymentForm from './PaymentForm';
import ConfirmationPage from './ConfirmationPage';
import { BookingProvider } from './components/BookingContext'; // 🔥 Import provider

function App() {
  return (
     <BookingProvider>
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guest" element={<GuestForm />} />
          <Route path="/availability" element={<CheckAvailability />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
    </BookingProvider>
  );
}

export default App;
