const mongoose = require('mongoose');
const Note = require('../models/Note');

const getNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
};

const createNote = async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({
    title,
    content,
    userId: req.userId,
    isTrash: false
  });
  await newNote.save();

  console.log('New note saved to database:', newNote.title);
  console.log('Database:', mongoose.connection.name);
  console.log('Collection:', Note.collection.name);
  res.json(newNote);
};

const updateNote = async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  console.log('Note updated in database:', updatedNote.title);
  res.json(updatedNote);
};

const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  console.log('Note deleted from database, ID:', req.params.id);
  res.json({ message: 'Deleted' });
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
