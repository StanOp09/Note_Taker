// Load notes from db.json
const dbPath = path.join(__dirname, 'db/db.json');
let db = [];
//////////

// API Routes
app.get('/api/notes', (req, res) => {
    console.log('Received a request to fetch notes'); // Add this log
    res.json(db);
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
//////////
  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch (error) {
    console.error('Error reading db.json:', error);
  }
    console.log("Getting data from db: "+db)
  