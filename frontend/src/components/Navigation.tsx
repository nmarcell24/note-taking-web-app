import {
  FileDownloadDone,
  House,
  LabelOutlined,
  Search,
  Settings,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="flex py-2 gap-4 items-center justify-evenly fixed bottom-0 left-0 w-full border bg-white">
      <Link to="/" className="flex flex-col items-center">
        <House />
        <p className="hidden md:block">Home</p>
      </Link>
      <Link to="/search" className="flex flex-col items-center">
        <Search />
        <p className="hidden md:block">Search</p>
      </Link>
      <Link to="/archived" className="flex flex-col items-center">
        <FileDownloadDone />
        <p className="hidden md:block">Archived</p>
      </Link>
      <Link to="/tags" className="flex flex-col items-center">
        <LabelOutlined />
        <p className="hidden md:block">Tags</p>
      </Link>
      <Link to="/settings" className="flex flex-col items-center">
        <Settings />
        <p className="hidden md:block">Settings</p>
      </Link>
    </div>
  );
};

export default Navigation;
