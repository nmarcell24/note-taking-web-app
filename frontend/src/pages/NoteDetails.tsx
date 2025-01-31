import {
  Add,
  ArchiveOutlined,
  ArrowBackIos,
  CheckCircleOutline,
  DeleteOutline,
  FolderOutlined,
  Remove,
} from "@mui/icons-material";
import {
  Alert,
  Collapse,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  styled,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { type Note } from "../../lib/types";

type NoteDetailsProps = {
  activeNote: Note | null;
  setActiveNote: React.Dispatch<React.SetStateAction<Note | null>>;
  setDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
};

const NoteDetails = ({
  activeNote,
  setActiveNote,
  setDeleted,
}: NoteDetailsProps) => {
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const params = useParams();
  const [note, setNote]: any = useState({});
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  // auto close the alert after 3 seconds
  if (saved) {
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  useEffect(() => {
    const fetchNote = async () => {
      let response;
      if (isDesktop) {
        response = await fetch(
          `http://localhost:4000/notes/${activeNote?._id}`
        );
      } else {
        response = await fetch(`http://localhost:4000/notes/${params.id}`);
      }
      const data = await response.json();
      setNote(data);
    };

    fetchNote();
  }, [activeNote]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch("http://localhost:4000/notes/tags");
      const data = await response.json();
      setTags(data);
    };

    fetchTags();
  }, []);

  const handleSave = async () => {
    if (isDesktop) {
      await fetch(`http://localhost:4000/notes/${activeNote?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
    } else {
      await fetch(`http://localhost:4000/notes/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
    }
    setSaved(true);
  };

  const handleDelete = async () => {
    if (isDesktop) {
      await fetch(`http://localhost:4000/notes/${activeNote?._id}`, {
        method: "DELETE",
      });
    } else {
      await fetch(`http://localhost:4000/notes/${params.id}`, {
        method: "DELETE",
      });
    }
    setDeleted && setDeleted(true);
    if (isDesktop) {
      setActiveNote(null);
    }
    if (!isDesktop) {
      navigate("/");
    }
  };

  const handleAddTag = (tag: string) => {
    if (note.tags) {
      if (note.tags.includes(tag)) return;
      setNote({ ...note, tags: [...note.tags, tag] });
    } else {
      setNote({ ...note, tags: [tag] });
    }
  };

  const CustomButton = styled(Button)({
    backgroundColor: "#e5e7eb",
    color: "#000",
    borderRadius: "8px",
    boxShadow: "none",
    textTransform: "none",
    fontSize: "0.75rem",
    "&:hover": {
      backgroundColor: "#d6d6d6",
    },
  });

  return (
    <div className="min-h-full p-4 lg:p-2 lg:flex flex-grow">
      <div className="w-full h-full bg-white lg:border-r">
        {/* Navigation Bar */}
        {!isDesktop && (
          <div className="w-full flex justify-between items-center pb-4 border-b border-gray-200">
            <Link
              to="/"
              className="text-sm flex items-center justify-center md:text-xl"
            >
              <ArrowBackIos /> Go Back
            </Link>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => setOpen(true)}>
                <DeleteOutline />
              </button>
              <button className="text-sm">
                <FolderOutlined />
              </button>
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
        <div className="p-3">
          <div className="mb-4">
            <input
              type="text"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              className="text-xl md:text-2xl font-semibold text-gray-800 w-full"
            />
          </div>
          <div className="text-sm text-gray-500 flex items-start flex-col mb-6">
            <div className="flex flex-wrap gap-1 items-center md:text-lg md:mb-3">
              <span>Tags:</span>
              {note.tags && note.tags.length != 0
                ? note.tags.map((tag: string) => (
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
                  ))
                : ""}
              <CustomButton
                variant="text"
                sx={{
                  color: "white",
                  backgroundColor: "#3b82f6",
                  marginY: "0.2rem",
                }}
                onClick={() => setTagsOpen(true)}
                startIcon={<Add />}
              >
                Add Tag
              </CustomButton>
            </div>
            <span className="md:text-lg">
              Last edited:{" "}
              <strong>{note.updatedAt && note.updatedAt.slice(0, 10)}</strong>
            </span>
          </div>
          <hr className="my-4" />
          <div className="flex flex-col">
            <TextField
              value={note.content}
              multiline
              fullWidth
              minRows={14}
              maxRows={14}
              placeholder="Start typing here..."
              onChange={(e) => setNote({ ...note, content: e.target.value })}
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
          onClick={() => setActiveNote(null)}
        >
          Cancel
        </Button>
      </div>
      <section className="w-1/3 flex-col gap-3 pl-2 hidden lg:flex">
        <Button
          startIcon={<ArchiveOutlined />}
          fullWidth
          variant="outlined"
          sx={{
            textTransform: "none", // Keeps the text case as is
            fontWeight: 400, // Adjusts font weight
            fontSize: "14px", // Sets font size
            borderRadius: "8px", // Rounded corners
            padding: "6px 12px", // Adjusts padding
            color: "#333", // Custom text color
            borderColor: "#ccc", // Matches the outlined border color
            "&:hover": {
              borderColor: "#999", // Adjust border color on hover
            },
          }}
        >
          Achieve Note
        </Button>
        <Button
          startIcon={<DeleteOutline />}
          onClick={() => setOpen(true)}
          fullWidth
          variant="outlined"
          sx={{
            textTransform: "none", // Keeps the text case as is
            fontWeight: 400, // Adjusts font weight
            fontSize: "14px", // Sets font size
            borderRadius: "8px", // Rounded corners
            padding: "6px 12px", // Adjusts padding
            color: "#333", // Custom text color
            borderColor: "#ccc", // Matches the outlined border color
            "&:hover": {
              borderColor: "#999", // Adjust border color on hover
            },
          }}
        >
          Delete Note
        </Button>
      </section>

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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this note?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={tagsOpen} onClose={() => setTagsOpen(false)}>
        <DialogTitle id="alert-dialog-title">
          {"Add some tags to your note"}
        </DialogTitle>
        <DialogContent className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            if (note.tags && note.tags.includes(tag)) {
              return (
                <CustomButton
                  disabled
                  key={tag}
                  variant="contained"
                  size="small"
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
          <Button onClick={() => setTagsOpen(false)}>Close</Button>
          <Button>new tag</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NoteDetails;
