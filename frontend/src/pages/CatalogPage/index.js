import React from "react";
import Navbar from "../../components/Navbar";
import Catalog from "../../components/Catalog";
import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import "./CatalogPage.css";

const CatalogPage = () => {
  return (
    <Container maxWidth={false} disableGutters className="catalog-page">
      <Navbar />
      <Container className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ marginBottom: "40px", minHeight: "60px" }}
        >
          <Typography variant="h3" gutterBottom className="catalog-heading">
            Product Catalog
          </Typography>
        </motion.div>
        <Catalog />
      </Container>
    </Container>
  );
};

export default CatalogPage;
