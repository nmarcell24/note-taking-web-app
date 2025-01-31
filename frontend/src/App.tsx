import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import NoteDetails from "./pages/NoteDetails";
import { useState } from "react";
import NewNote from "./pages/NewNote";
import Tags from "./pages/Tags";
import NoteByTag from "./pages/NoteByTag";
import { useMediaQuery } from "@mui/material";
import DesktopView from "./desktopComponents/DesktopView";
import { type Note } from "../lib/types";

function App() {
  const [deleted, setDeleted] = useState(false);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [clickedTagFilter, setClickedTagFilter] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width:1024px)");

  return (
    <div>
      <BrowserRouter>
        {isDesktop ? (
          <DesktopView
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            isNewNoteOpen={isNewNoteOpen}
            setIsNewNoteOpen={setIsNewNoteOpen}
            deleted={deleted}
            setDeleted={setDeleted}
            setClickedTagFilter={setClickedTagFilter}
            clickedTagFilter={clickedTagFilter}
          />
        ) : (
          <div className="min-h-screen flex flex-col">
            <Header setClickedTagFilter={setClickedTagFilter} />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    activeNote={activeNote}
                    setActiveNote={setActiveNote}
                    setIsNewNoteOpen={setIsNewNoteOpen}
                    deleted={deleted}
                    setDeleted={setDeleted}
                  />
                }
              />
              <Route path="search" element={<SearchPage />} />
              <Route
                path="note/:id"
                element={
                  <NoteDetails
                    activeNote={activeNote}
                    setActiveNote={setActiveNote}
                    setDeleted={setDeleted}
                  />
                }
              />
              <Route
                path="note/new"
                element={<NewNote setIsNewNoteOpen={setIsNewNoteOpen} />}
              />
              <Route
                path="/tags"
                element={<Tags setClickedTagFilter={setClickedTagFilter} />}
              />
              <Route path="/tags/:tag" element={<NoteByTag />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
