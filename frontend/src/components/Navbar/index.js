import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // ✅ Import close icon
import SearchBox from "../SearchBox/index"; // ✅ Import search box
import "./Navbar.css"; // ✅ Import styles

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation(); // ✅ Get current page path

  return (
    <nav className="navbar">
      <div className="brand">MyStore</div>

      <div className="nav-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/catalog"
          className={`nav-link ${
            location.pathname === "/catalog" ? "active" : ""
          }`}
        >
          Catalog
        </Link>
        <Link
          to="/contact"
          className={`nav-link ${
            location.pathname === "/contact" ? "active" : ""
          }`}
        >
          Contact
        </Link>
      </div>

      {/* ✅ Conditionally Render Search Box */}
      {isSearchOpen && <SearchBox onClose={() => setIsSearchOpen(false)} />}
    </nav>
  );
};

export default Navbar;
