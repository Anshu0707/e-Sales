import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import SearchBox from "../../components/SearchBox";
import useDebouncedSearch from "../../hooks/useDebouncedSearch";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import "./LandingPage.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [initialProducts, setInitialProducts] = useState([]);
  const { results: searchResults } = useDebouncedSearch(searchQuery, 500);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products`)
      .then((res) => setInitialProducts(res.data.slice(0, 9)))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const displayedProducts =
    searchQuery.trim() && searchResults.length > 0
      ? searchResults
      : searchQuery.trim() && searchResults.length === 0
      ? [] // no results found
      : initialProducts;

  return (
    <Container className="landing-container" maxWidth={false} disableGutters>
      <Navbar
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {isSearchOpen && (
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}

      <Typography variant="body1" color="white" sx={{ mt: "5rem" }}>
        {searchQuery.trim() && searchResults.length === 0
          ? "No products found."
          : "Explore our latest collection now and click the products for more details."}
      </Typography>

      <Grid container spacing={4} className="product-grid-landing">
        {displayedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product._id}>
            <ProductCard product={product} showBuyNow />
          </Grid>
        ))}
      </Grid>

      {!searchQuery && (
        <Box className="view-all-button">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/catalog"
          >
            View All
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default LandingPage;
