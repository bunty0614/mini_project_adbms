// src/components/BookingContext.js
import React, { createContext, useState } from 'react';

// Create context
const BookingContext = createContext();

// Create provider component
const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    guestDetails: {},
    availability: {},
    bookingInfo: {},
    paymentInfo: {}
  });

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContext, BookingProvider };
