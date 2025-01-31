import { Button, useMediaQuery } from "@mui/material";
import Tags from "../pages/Tags";
import { ArchiveOutlined, HomeOutlined } from "@mui/icons-material";

interface HeaderProps {
  setClickedTagFilter: React.Dispatch<React.SetStateAction<string | null>>;
  handleGoHome?: () => void;
}

const Header = ({ setClickedTagFilter, handleGoHome } : HeaderProps) => {
  const isDesktop = useMediaQuery("(min-width:1024px)");

  if (isDesktop) {
    return (
      <div className="w-1/4 border-r border-gray h-screen p-3">
        <div className="bg-[#F5F4F9] lg:bg-white p-3 md:p-5 flex items-center gap-4">
          <img src="/notes-icon.svg" className="h-8 md:h-12" />
          <h1 className="style-script-regular text-3xl md:text-4xl">Notify</h1>
        </div>
        <section>
          <Button
            startIcon={<HomeOutlined />}
            fullWidth
            onClick={() => handleGoHome && handleGoHome()}
            sx={{
              justifyContent: "flex-start",
              padding: "10px 15px",
              textTransform: "none",
              fontSize: "16px",
              color: "#333",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            All Notes
          </Button>
          <Button
            startIcon={<ArchiveOutlined />}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              padding: "10px 15px",
              fontSize: "16px",
              color: "#333",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            Archived Notes
          </Button>
        </section>
        <hr className="my-3" />
        {/* Tags */}
        <Tags setClickedTagFilter={setClickedTagFilter} />
      </div>
    );
  }
  return (
    <div className="bg-[#F5F4F9] lg:bg-white p-3 md:p-5 flex items-center gap-4">
      <img src="/notes-icon.svg" className="h-8 md:h-12" />
      <h1 className="style-script-regular text-3xl md:text-4xl">Notify</h1>
    </div>
  );
};

export default Header;
