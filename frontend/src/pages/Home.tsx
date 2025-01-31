import { Add, CheckCircleOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Note from "../components/Note";
import Navigation from "../components/Navigation";
import { Alert, Button, Collapse, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { type Note as NoteType } from "../../lib/types";

interface HomeProps {
  deleted: boolean;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  activeNote: NoteType | null;
  setActiveNote: React.Dispatch<React.SetStateAction<NoteType | null>>;
  setIsNewNoteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home = ({
  deleted,
  setDeleted,
  activeNote,
  setActiveNote,
  setIsNewNoteOpen,
}: HomeProps) => {
  const [notes, setNotes] = useState([]);
  const isDesktop = useMediaQuery("(min-width:1024px)");

  // auto close the alert after 3 seconds
  if (deleted) {
    setTimeout(() => {
      setDeleted(false);
    }, 3000);
  }

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("http://localhost:4000/notes");
      const data = await response.json();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  const handleNewNote = () => {
    setActiveNote(null);
    setIsNewNoteOpen(true);
  };

  const handleActiveNote = (note: NoteType) => {
    setActiveNote(note);
    setIsNewNoteOpen(false);
  };

  return (
    <div
      className={
        activeNote
          ? "w-1/3 p-3 relative lg:p-4 lg:border lg:h-[88vh] lg:overflow-y-scroll hidden-scroll"
          : "w-full p-3 relative lg:p-4 lg:border lg:h-[88vh] lg:overflow-y-scroll hidden-scroll"
      }
    >
      {isDesktop && (
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleNewNote()}
          sx={{ fontSize: "0.7rem" }}
        >
          <Add />
          Create New Note
        </Button>
      )}

      {notes.map((note: any) => {
        if (isDesktop) {
          return (
            <div onClick={() => handleActiveNote(note)}>
              <Note key={note._id} {...note} />
            </div>
          );
        } else {
          return (
            <Link to={`/note/${note._id}`}>
              <Note key={note._id} {...note} />
            </Link>
          );
        }
      })}

      {/* appears when there are no notes */}
      {notes.length === 0 && (
        <div className="text-center mt-6 opacity-30">No notes yet...</div>
      )}

      {/* floating add button */}
      {!isDesktop && (
        <Link
          to="/note/new"
          className="fixed bottom-12 md:bottom-20 right-3 h-12 w-12 bg-blue-500 rounded-full grid place-content-center text-white"
        >
          <Add />
        </Link>
      )}

      {/* navigation bar */}
      {!isDesktop && <Navigation />}

      {/* delete alert */}
      <Collapse
        in={deleted}
        className="fixed bottom-3 left-0 flex justify-center w-full"
      >
        <Alert
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity="success"
        >
          Note deleted successfully!
        </Alert>
      </Collapse>
    </div>
  );
};

export default Home;
