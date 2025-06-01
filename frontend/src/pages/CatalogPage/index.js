import React from "react";
import Navbar from "../../components/Navbar";
import Catalog from "../../components/Catalog"; // ✅ Import Catalog component
import { Container, Typography } from "@mui/material";
import "./CatalogPage.css";

const CatalogPage = () => {
  return (
    <Container maxWidth={false} disableGutters className="catalog-page">
      <Navbar /> {/* ✅ Navbar remains at the top */}
      {/* ✅ Separate container for heading & products */}
      <Container className="content-container">
        <Typography variant="h3" gutterBottom className="catalog-heading">
          Product Catalog
        </Typography>
        <Catalog /> {/* ✅ Products display below heading */}
      </Container>
    </Container>
  );
};

export default CatalogPage;
