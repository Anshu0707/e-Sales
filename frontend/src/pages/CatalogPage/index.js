import React from "react";
import Navbar from "../../components/Navbar";
import Catalog from "../../components/Catalog";
import { Container, Typography } from "@mui/material";
import "./CatalogPage.css";

const CatalogPage = () => {
  return (
    <Container maxWidth={false} disableGutters className="catalog-page">
      <Navbar />
      <Container className="content-container">
        <Typography variant="h3" gutterBottom className="catalog-heading">
          Product Catalog
        </Typography>
        <Catalog />
      </Container>
    </Container>
  );
};

export default CatalogPage;
