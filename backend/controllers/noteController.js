const { default: mongoose } = require("mongoose");
const Note = require("../models/NoteModel");

const getAllNotes = async (req, res) => {
  const notes = await Note.find({}).sort({ updatedAt: -1 });
  res.status(200).json(notes);
};

const getSingleNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }

  const note = await Note.findById(id);
  if (!note) {
    return res.status(404).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

const getAllTags = async (req, res) => {
  const tags = await Note.distinct("tags");
  res.status(200).json(tags);
}

const createNote = async (req, res) => {
  const { title, tags, content } = req.body;

  try {
    const newNote = await Note.create({ title, tags, content });
    res.status(200).json(newNote);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }

  const updatedNote = await Note.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!updatedNote) {
    return res.status(400).json({ error: "Cannot update note" });
  }

  res.status(200).json(updatedNote);
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }

  const deletedNote = await Note.findByIdAndDelete(id);

  if (!deletedNote) {
    return res.status(400).json({ error: "Cannot delete non-existent note" });
  }
  return res.status(200).json(deletedNote);
};

module.exports = {
  getAllNotes,
  getSingleNote,
  getAllTags,
  createNote,
  updateNote,
  deleteNote,
};
