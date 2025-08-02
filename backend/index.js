const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(express.json()); // to parse JSON body

// Routes
const guestRoutes = require('./routes/guests');
const bookingRoutes = require('./routes/bookings');

app.use('/api/guests', guestRoutes);        // example: POST http://localhost:5000/api/guests
app.use('/api/bookings', bookingRoutes);    // example: GET  http://localhost:5000/api/bookings/check_availability

// Health check route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Server start
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
