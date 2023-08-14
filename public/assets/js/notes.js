const nts = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require ('../helpers/ntsUtils');

// Get route for retrieving all notes
nts.get('/', (req, res) =>
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
);

// POST route for submitting notes
nts.post('/', (req, res) => {
    // Assignment for items in req.body
    const { title, text } = req.body;
    // How to handle req.body
    if (title && text) {
        // Variable for the object to be saved
        const newNote = {
            title,
            text,
            notes_id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in notes');
    }
});

module.exports = nts;

// document.addEventListener('DOMContentLoaded', () => {
//     const noteList = document.querySelector('.list-group');
//     const noteTitleInput = document.querySelector('.note-title');
//     const noteTextarea = document.querySelector('.note-textarea');
//     const saveIcon = document.querySelector('.save-note');
//     const newNoteIcon = document.querySelector('.new-note');
  
//     let currentNote = null;
  
//     // Fetch and display existing notes
//     async function fetchNotes() {
//       try {
//         const response = await fetch('/api/notes');
//         const notes = await response.json();
  
//         noteList.innerHTML = ''; // Clear the list
  
//         notes.forEach(note => {
//           const listItem = document.createElement('li');
//           listItem.classList.add('list-group-item');
//           listItem.textContent = note.title;
  
//           listItem.addEventListener('click', () => {
//             displayNoteContent(note);
//           });
  
//           noteList.appendChild(listItem);
//         });
//       } catch (error) {
//         console.error('Error fetching notes:', error);
//       }
//     }
  
//     // Display the content of a selected note
//     function displayNoteContent(note) {
//       currentNote = note;
//       noteTitleInput.value = note.title;
//       noteTextarea.value = note.text;
//     }
  
//     // Save a new or edited note
//     async function saveNote() {
//       const title = noteTitleInput.value;
//       const text = noteTextarea.value;
  
//       if (!title || !text) {
//         alert('Both title and text are required.');
//         return;
//       }
  
//       const noteData = { title, text };
  
//       if (currentNote) {
//         noteData.id = currentNote.id;
//       }
  
//       try {
//         const response = await fetch('/api/notes', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(noteData),
//         });
  
//         const newNote = await response.json();
//         currentNote = newNote;
  
//         fetchNotes();
//       } catch (error) {
//         console.error('Error saving note:', error);
//       }
//     }
  
//     // Clear the note fields
//     function clearNoteFields() {
//       currentNote = null;
//       noteTitleInput.value = '';
//       noteTextarea.value = '';
//     }
  
//     // Event listeners
//     saveIcon.addEventListener('click', saveNote);
  
//     newNoteIcon.addEventListener('click', clearNoteFields);
  
//     // Initial fetch and display of notes
//     fetchNotes();
//   });
  