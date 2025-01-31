import {
  Add,
  ArrowBackIos,
  CheckCircleOutline,
  Remove,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { type Note } from "../../lib/types";

interface NewNoteProps {
  setIsNewNoteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewNote = ({ setIsNewNoteOpen }: NewNoteProps) => {
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const [note, setNote] = useState<Note | null>(null);
  const [tags, setTags] = useState([]);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);
  const [isNoTitle, setIsNoTitle] = useState(false);
  const [isNoContent, setIsNoContent] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch("http://localhost:4000/notes/tags");
      const data = await response.json();
      setTags(data);
    };

    fetchTags();
  }, []);

  // auto close the alert after 3 seconds
  if (saved) {
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  const handleSave = async () => {
    if (!note?.title) {
      setIsNoTitle(true);
      return;
    } else {
      setIsNoTitle(false);
    }
    if (!note?.content) {
      setIsNoContent(true);
      return;
    } else {
      setIsNoContent(false);
    }

    await fetch(`http://localhost:4000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    setSaved(true);
  };

  const handleAddTag = (tag: string) => {
    if (note?.tags) {
      if (note.tags.includes(tag)) return;
      setNote({ ...note, tags: [...note.tags, tag] });
    } else {
      note && setNote({ ...note, tags: [tag] });
    }
  };

  const CustomButton = styled(Button)({
    backgroundColor: "#e5e7eb",
    color: "#000",
    borderRadius: "8px",
    boxShadow: "none",
    fontSize: "0.75rem",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#d6d6d6",
    },
  });

  return (
    <div className="min-h-full flex w-full lg:p-2 flex-col p-4">
      <div className="w-full h-full bg-white flex flex-col lg:border-r">
        {/* Navigation Bar */}
        {!isDesktop && (
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <Link
              to="/"
              className="text-sm flex items-center md:text-xl justify-center"
            >
              <ArrowBackIos /> Go Back
            </Link>
            <div className="flex items-center justify-center gap-3">
              <Link to="/" className="text-sm md:text-lg">
                Cancel
              </Link>
              <button
                onClick={handleSave}
                className="text-sm font-semibold text-blue-800 md:text-lg"
              >
                Save Note
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="p-3 flex flex-col flex-grow">
          <div className="mb-4">
            <TextField
              placeholder="Title"
              error={isNoTitle}
              value={note?.title}
              helperText={isNoTitle && "Title is required"}
              onChange={(e) => note && setNote({ ...note, title: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputBase-input": {
                  fontSize: "1.5rem", // Bigger text
                  fontWeight: "bold", // Bold text
                  paddingX: "0.5rem", // Adjust padding
                },
              }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-1 mb-4 md:text-lg md:mb-3">
            <span>Tags:</span>
            {note?.tags &&
              note.tags.map((tag: any) => (
                <div
                  key={tag}
                  className="bg-gray-200 rounded-md text-sm flex items-center justify-center"
                >
                  <CustomButton
                    onClick={() =>
                      setNote({
                        ...note,
                        tags: note.tags.filter((t: any) => t !== tag),
                      })
                    }
                    endIcon={<Remove />}
                  >
                    {tag}
                  </CustomButton>
                </div>
              ))}
            <CustomButton
              variant="text"
              sx={{
                color: "white",
                backgroundColor: "#3b82f6",
                marginY: "0.2rem",
              }}
              onClick={() => setOpen(true)}
              startIcon={<Add />}
            >
              Add Tag
            </CustomButton>
          </div>
          <hr className="my-4" />

          {/* Content Field */}
          <div className="flex-grow">
            <TextField
              value={note?.content}
              multiline
              fullWidth
              minRows={14}
              maxRows={14}
              error={isNoContent}
              helperText={isNoContent && "Content is required"}
              placeholder="Start typing here..."
              onChange={(e) => note && setNote({ ...note, content: e.target.value })}
              sx={{
                height: "100%",
                "& .MuiOutlinedInput-root": {
                  height: "100%",
                  alignItems: "flex-start",
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              InputProps={{
                sx: {
                  height: "100%",
                  alignItems: "flex-start",
                },
              }}
            />
          </div>
        </div>
        {isDesktop && (
          <div className="p-3">
            <hr />
            <Button
              sx={{
                marginTop: "1rem",
                marginRight: "2rem",
                textTransform: "none",
              }}
              variant="contained"
              onClick={() => handleSave()}
            >
              Save note
            </Button>
            <Button
              sx={{
                marginTop: "1rem",
                backgroundColor: "#f4f4f8",
                color: "gray",
                textTransform: "none",
              }}
              variant="contained"
              onClick={() => setIsNewNoteOpen(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Saved note alert */}
      <Collapse
        in={saved}
        className="fixed bottom-3 left-0 flex justify-center w-full"
      >
        <Alert
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity="success"
        >
          Note saved successfully!
        </Alert>
      </Collapse>

      {/* Add tag dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="alert-dialog-title">
          {"Add some tags to your note"}
        </DialogTitle>
        <DialogContent className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            if (note?.tags.includes(tag)) {
              return (
                <CustomButton
                  disabled
                  key={tag}
                  variant="contained"
                  size="small"
                  className="bg-gray-200 p-2 rounded-md"
                  onClick={() => handleAddTag(tag)}
                >
                  {tag}
                </CustomButton>
              );
            } else {
              return (
                <CustomButton
                  key={tag}
                  variant="contained"
                  size="small"
                  className="bg-gray-200 p-2 rounded-md"
                  onClick={() => handleAddTag(tag)}
                >
                  {tag}
                </CustomButton>
              );
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button>new tag</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewNote;
