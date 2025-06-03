import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchBox from "../SearchBox/index";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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

        <IconButton
          aria-label="cart"
          component={Link}
          to="/cart"
          size="large"
          color="inherit"
          className="cart-button"
        >
          <Badge badgeContent={cartCount} color="error" className="cart-badge">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </div>

      {isSearchOpen && <SearchBox onClose={() => setIsSearchOpen(false)} />}
    </nav>
  );
};

export default Navbar;
