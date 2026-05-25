const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

/* CORS */
app.use(cors());

/* JSON */
app.use(express.json());

/* Routes */
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});