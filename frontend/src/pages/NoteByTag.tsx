import { useEffect, useState } from "react";
import Note from "../components/Note";
import Navigation from "../components/Navigation";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import NoteDetails from "./NoteDetails";
import { type Note as NoteType } from "../../lib/types";

interface NoteByTagProps {
  clickedTagFilter?: string;
}

const NoteByTag = ({ clickedTagFilter } : NoteByTagProps) => {
  const [notes, setNotes] = useState([]);
  const [clickedNote, setClickedNote] = useState<NoteType | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("http://localhost:4000/notes");
      const data = await response.json();
      setNotes(data);
    };

    fetchNotes();
  }, []);
  
  if(clickedNote) {
    return <NoteDetails activeNote={clickedNote} setActiveNote={setClickedNote} />
  }

  return (
    <div className="w-full p-3 relative">
      {!isDesktop && (
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm flex my-2 items-center"
          >
            <ArrowBackIos /> Go Back
          </button>
          <h1 className="text-2xl mt-4">
            Notes Tagged: <strong>{params.tag}</strong>
          </h1>
        </div>
      )}
      {notes.map((note: any) => {
        if (isDesktop) {
          if (note.tags.includes(clickedTagFilter)) {
            return (
              <div onClick={() => setClickedNote(note)}>
                <Note key={note._id} {...note} />
              </div>
            );
          }
        } else {
          if (note.tags.includes(params.tag)) {
            return (
              <Link to={`/note/${note._id}`}>
                <Note key={note._id} {...note} />
              </Link>
            );
          }
        }
      })}

      {/* appears when there are no notes */}
      {notes.length === 0 && (
        <div className="text-center mt-6 opacity-30">No notes yet...</div>
      )}

      {!isDesktop && <Navigation />}
    </div>
  );
};

export default NoteByTag;
