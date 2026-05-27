const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const connectDB = require('./config/db');

dotenv.config();

/* CONNECT DATABASE */
connectDB();

const app = express();

/* =========================
   CORS
========================= */

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://luxury-auto-frontend.onrender.com'
  ],
  credentials: true
}));

/* =========================
   BODY PARSER
========================= */

app.use(express.json());

/* =========================
   STATIC UPLOADS
========================= */

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

/* =========================
   ROUTES
========================= */

/* AUTH */
app.use('/api/auth', require('./routes/auth'));

/* VEHICLES */
app.use('/api/vehicles', require('./routes/vehicles'));

/* ADMIN */
app.use('/api/admin', require('./routes/admin'));

/* RESERVATIONS */
app.use('/api/reservations', require('./routes/reservations'));

/* CONTACT */
app.use('/api/contact', require('./routes/contact'));

/* EXISTING */
app.use('/api/protected', require('./routes/protected'));
app.use('/api/chat', require('./routes/chat'));

/* =========================
   HEALTH CHECK
========================= */

app.get('/api/health', (req, res) => {
  res.json({
    status: 'Luxury Auto API running',
    version: '3.0.0',
    db: 'MongoDB'
  });
});

/* =========================
   ROOT TEST
========================= */

app.get('/', (req, res) => {
  res.send('Luxury Auto Backend Running');
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
