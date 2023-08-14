const express = require('express');
const path = require('path');
const api = require('./public/assets/js/index')

const app = express();
const PORT = process.env.PORT || 3001;

// Using middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);

// Get wildcard route to home page
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get route for notes page
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);


// // API routes
// app.get('/api/notes', (req, res) => {
//   const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
//   res.json(notes);
// });

// app.post('/api/notes', (req, res) => {
//   const newNote = req.body;
//   const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

//   // Generate a unique id using uuidv4
//   newNote.id = uuidv4();

//   notes.push(newNote);
//   fs.writeFileSync('db.json', JSON.stringify(notes));

//   res.json(newNote);
// });

app.listen(PORT, () => 
  console.log(`App is running on http://localhost:${PORT}`)
);

// // Helper function to generate a unique ID (for simplicity, using a simple counter)
// let noteIdCounter = 1;
// function generateUniqueId() {
//   return noteIdCounter++;
// }
