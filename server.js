const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Import the uuid package

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Load notes from db.json
const dbPath = path.join(__dirname, 'db/db.json');
let db = [];

try {
  db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
} catch (error) {
  console.error('Error reading db.json:', error);
}
  console.log("Getting data from db: "+db)

// API Routes
app.get('/api/notes', (req, res) => {
  console.log('Received a request to fetch notes'); // Add this log
  res.json({"title":"fasgdatfg","text":"sgfnjdhgmkfjh,k","id":"85013a37-2e72-4529-ac98-7ab38fbfd9ec"});
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // Generate a unique ID
  
  db.push(newNote);

  fs.writeFile(dbPath, JSON.stringify(db), (err) => {
    if (err) {
      console.error('Error writing db.json:', err);
      res.status(500).json({ error: 'Error saving note.' });
    } else {
      res.json(newNote);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});