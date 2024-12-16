const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

require ('dotenv').config();
const app = express();



// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const DB_NAME = 'HistoryAWA';
let db;

MongoClient.connect(URI)
  .then(client => {
    db = client.db(DB_NAME);
    console.log(`Connected to database: ${DB_NAME}`);
  })
  .catch(err => console.error("Failed to connect to MongoDB:", err));

// API Routes
// Add content
app.post('/newTime', async (req, res) => {
  try {
    const { date, title, description } = req.body;
    if (!date || !title || !description) {
      return res.status(400).json({ error: 'Date, title and description are required' });
    }
    const collection = db.collection('history');
    const result = await collection.insertOne({ title, description, createdAt: new Date() });
    res.status(201).json({ message: 'A Story has been added successfully', content: result.ops[0] });
  } catch (error) {
    console.error("Error adding content:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all content
app.get('/content', async (req, res) => {
  try {
    const collection = db.collection('history');
    const content = await collection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
