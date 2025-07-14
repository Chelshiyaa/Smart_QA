require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const roomRoutes = require('./src/routes/roomRoutes');

const app = express();

// Middleware
app.use(express.json());

const corsConfig = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};

app.use(cors(corsConfig));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/rooms', roomRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
