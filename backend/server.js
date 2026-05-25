const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

/* IMPORTANT */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://luxury-auto-frontend.onrender.com'
  ],
  credentials: true
}));

app.use(express.json());

/* ROUTES */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/protected', require('./routes/protected'));
app.use('/api/chat', require('./routes/chat'));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'Luxury Auto API running',
    version: '2.0.0',
    db: 'MongoDB'
  });
});

/* TEST ROOT */
app.get('/', (req, res) => {
  res.send('Luxury Auto Backend Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});