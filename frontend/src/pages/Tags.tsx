import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { LabelOutlined, Search } from "@mui/icons-material";
import {
  Button,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

const Tags = ({
  setClickedTagFilter,
}: {
  setClickedTagFilter?: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTags, setFilteredTags] = useState([]);
  const isDesktop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch("http://localhost:4000/notes/tags");
      const data = await response.json();
      setTags(data);
    };

    fetchTags();
  }, []);

  useEffect(() => {
    setFilteredTags(
      tags.filter((tag: any) =>
        tag.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, tags]);

  return (
    <div className="p-4 lg:p-2">
      {!isDesktop && (
        <TextField
          className="w-full"
          id="input-with-icon-textfield"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Start typing to search tags..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">{<Search />}</InputAdornment>
              ),
            },
          }}
          variant="outlined"
        />
      )}
      <div className="flex flex-wrap items-center gap-2 mt-4 lg:mt-0 lg:block">
        {isDesktop && <p className="pb-2 text-[#585858]">Tags</p>}
        {filteredTags.map((tag: string) => {
          if (isDesktop) {
            return (
              <Button
                key={tag}
                startIcon={<LabelOutlined />}
                onClick={() => setClickedTagFilter && setClickedTagFilter(tag)}
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: "16px",
                  padding: "5px 15px",
                  color: "#333",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                {tag}
              </Button>
            );
          } else {
            return (
              <Link
                to={`/tags/${tag}`}
                className="flex items-center justify-center gap-2 bg-gray-200 p-2 rounded-md "
              >
                <LabelOutlined />
                {tag}
              </Link>
            );
          }
        })}
        {filteredTags.length === 0 && (
          <div className="text-center mt-6 opacity-30">
            No tags were found...
          </div>
        )}
      </div>
      {!isDesktop && <Navigation />}
    </div>
  );
};

export default Tags;
