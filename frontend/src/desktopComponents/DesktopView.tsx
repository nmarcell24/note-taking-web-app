import { InputAdornment, TextField } from "@mui/material";
import Header from "../components/Header";
import { Search, Settings } from "@mui/icons-material";
import Home from "../pages/Home";
import NoteDetails from "../pages/NoteDetails";
import NewNote from "../pages/NewNote";
import NoteByTag from "../pages/NoteByTag";
import { type Note } from "../../lib/types";

type DesktopViewProps = {
  deleted: boolean;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  activeNote: Note | null;
  setActiveNote: React.Dispatch<React.SetStateAction<Note | null>>;
  isNewNoteOpen: boolean;
  setIsNewNoteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clickedTagFilter: string | null;
  setClickedTagFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

const DesktopView = ({
  deleted,
  setDeleted,
  activeNote,
  setActiveNote,
  isNewNoteOpen,
  setIsNewNoteOpen,
  setClickedTagFilter,
  clickedTagFilter,
}: DesktopViewProps) => {

  const handleGoHome = () => {
    setClickedTagFilter(null)
  }

  return (
    <div className="flex">
      <Header handleGoHome={handleGoHome} setClickedTagFilter={setClickedTagFilter} />
      {/* Main Screen */}
      <div className="w-full">
        <header className="border px-10 py-5 flex items-center justify-between">
          {clickedTagFilter == null ? (
          <h1 className="text-3xl font-bold">All Notes</h1>
          ) : (
            <h1 className="text-3xl font-bold">Notes tagged by: { clickedTagFilter }</h1>
          )}
          <div className="flex items-center gap-6">
            <TextField
              className="w-full"
              id="input-with-icon-textfield"
              // onChange={(e) => setSearch(e.target.value)}
              // value={search}
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
            <Settings />
          </div>
        </header>
        <main className={clickedTagFilter ? "w-full hidden" : "w-full flex"}>
          {/* Note list */}
          <Home
            setIsNewNoteOpen={setIsNewNoteOpen}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            deleted={deleted}
            setDeleted={setDeleted}
          />
          {/* Note content */}
          {activeNote != null ? (
            <NoteDetails
              activeNote={activeNote}
              setActiveNote={setActiveNote}
              setDeleted={setDeleted}
            />
          ) : (
            ""
          )}
          {isNewNoteOpen && (
            <NewNote
              setIsNewNoteOpen={setIsNewNoteOpen}
            />
          )}
        </main>
        {clickedTagFilter != null ? <NoteByTag clickedTagFilter={clickedTagFilter} /> : ""}
      </div>
    </div>
  );
};

export default DesktopView;
