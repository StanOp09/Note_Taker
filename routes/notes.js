const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid'); // Import the uuid package
const { 
  readFileNotes,
  readAndConcat,
  writeToFile,
} = require('../helpers/fsUtils');
const { json } = require('express');

// GET Routes for retrieving notes
notes.get('/', (req, res) => {
  readFileNotes('./db/db.json')
    .then((data) =>
    res.json(JSON.parse(data)));
  });
  
// GET routes for a unique note

notes.get('/:id', (req, res) => {
  const noteID = req.params.id;
  readFileNotes('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const output = json.filter((note) => note.id === noteID);
      return output.length > 0
        ? res.json(output)
        : res.json(`No note with ID number ${noteID}`);
    });
});

// DELETE the route to a unique note
notes.delete('/:id', (req, res) => {
  const noteID = req.params.id;
  console.log(`NoteID: ${noteID}`);
  readFileNotes('./db/db.json')
  .then((data) => JSON.parse(data))
  .then((notes) => {
    // Regenerate updated array without the deleted note for the suggested ID in the URL
    const output = notes.filter((note) => note.id !== noteID);
    
    // Now save the new array to filesystem
     writeToFile('./db/db.json', output);

    // Indicate that note with unique ID as been deleted
    res.json(`Note with ID, ${noteID}, has been deleted`);
  });
});

// POST route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndConcat(newNote, './db/db.json');
    res.json('Note added!');
  } else {
    res.error('Note addition unsuccessful!');
  }
});

module.exports = notes
