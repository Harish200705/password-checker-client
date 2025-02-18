const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // For environment variables

const app = express();
app.use(express.json());
app.use(cors()); // Allows requests from GitHub Pages

// MongoDB Connection
const MONGO_URL = process.env.MONGO_URL; // Get URL from .env file

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Schema
const LogSchema = new mongoose.Schema({
    team: String,
    password: String,
    time: String,
    status: String
});

const Log = mongoose.model('Log', LogSchema);

// API Endpoint to Save Data
app.post('/log', async (req, res) => {
    try {
        const logEntry = new Log(req.body);
        await logEntry.save();
        res.json({ message: 'Logged Successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving log' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
