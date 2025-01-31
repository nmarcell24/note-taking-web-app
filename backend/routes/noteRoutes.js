const express = require("express");
const {
  getAllNotes,
  getSingleNote,
  getAllTags,
  createTag,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");
const router = express.Router();

router.get("/", getAllNotes);

router.get("/tags", getAllTags);

router.get("/:id", getSingleNote);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

module.exports = router;
