const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(express.json()); // to parse JSON body

// ✅ Routes
const guestRoutes = require('./routes/guests');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/payments');

// Mount routes under /api
app.use('/api/guests', guestRoutes);        // POST /api/guests
app.use('/api/bookings', bookingRoutes);    // GET  /api/bookings/check_availability
app.use('/api/payments', paymentRoutes);    // POST /api/payments

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
