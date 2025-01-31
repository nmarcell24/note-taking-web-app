import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Note from "../components/Note";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import { type Note as NoteType } from "../../lib/types";

const SearchPage = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("http://localhost:4000/notes");
      const data = await response.json();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      notes.filter((note: NoteType) =>
        note.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, notes]);

  return (
    <div className="w-full p-3 relative">
      <TextField
        className="w-full"
        id="input-with-icon-textfield"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search by title..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                {<Search />}
              </InputAdornment>
            ),
          },
        }}
        variant="outlined"
      />

      {filteredNotes &&
        filteredNotes.map((note: any) => <Link to={`/note/${note._id}`}><Note key={note._id} {...note} /></Link> )}

      {filteredNotes.length === 0 && (
        <div className="text-center mt-6 opacity-30">No notes found...</div>
      )}
      <Navigation />
    </div>
  );
};

export default SearchPage;
