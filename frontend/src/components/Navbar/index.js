import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const Navbar = ({
  isSearchOpen,
  setIsSearchOpen,
  searchQuery,
  setSearchQuery,
}) => {
  const location = useLocation();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Escape key to close search
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [setIsSearchOpen, setSearchQuery]);

  const isLandingPage = location.pathname === "/";

  return (
    <nav className="navbar">
      <div className="brand">MyStore</div>

      <div className="nav-links">
        <Link to="/" className={`nav-link ${isLandingPage ? "active" : ""}`}>
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

        {/* Search icon only on Landing Page */}
        {isLandingPage && (
          <IconButton
            onClick={() => setIsSearchOpen((prev) => !prev)}
            size="large"
            color="inherit"
          >
            <SearchIcon sx={{ color: "white" }} />
          </IconButton>
        )}

        {/* Cart Icon */}
        <IconButton
          aria-label="cart"
          component={Link}
          to="/cart"
          size="large"
          color="inherit"
        >
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon sx={{ color: "white" }} />
          </Badge>
        </IconButton>
      </div>
    </nav>
  );
};

export default Navbar;
