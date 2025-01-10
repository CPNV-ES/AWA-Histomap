/*!
 * Nom du fichier : server.js
 * Auteur : VicMtn
 * Date : 16.12.2024
 * Description : Ce script est le point d'entrée de l'api backend
 * Licence : MIT
 * Version : 1.0.0
 */

import express from 'express'
import cors from 'cors'



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function LogTransaction(req, res) {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url} ${res}`)
}

MongoClient.connect(URI)
  .then(client => {
    db = client.db(DB_NAME);
    console.log(`Connected to database: ${DB_NAME}`);
  })
  .catch(err => console.error("Failed to connect to MongoDB:", err));

// API Routes
// Add content
app.post('/new-story', async(req, res) => {
  try {
    console.log(JSON.stringify(await req.body));
    const { date, title, description } = req.body;
    if (!date || !title || !description) {
      return res.status(400).json({ error: 'Date, title and description are required' });
    }
    const collection = db.collection('history');
    const result = await collection.insertOne({ title, description, date });
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
