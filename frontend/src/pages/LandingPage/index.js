import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import SearchBox from "../../components/SearchBox";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import "../LandingPage/LandingPage.css";
import { useParams, useNavigate } from "react-router-dom";
const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Manage search state here
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data.slice(0, 8)))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLandingPageBuyNow = (product) => {
    const selectedProduct = {
      _id: product._id,
      name: product.name,
      images: product.images,
      price: product.price,
      selectedSize: product.sizes[0], // ✅ Default first size
      selectedColor: product.colors[0], // ✅ Default first color
      quantity: 1, // ✅ Default quantity
    };

    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct)); // ✅ Store selection
    navigate(`/checkout?productId=${product._id}`);
  };

  return (
    <Container className="landing-container" maxWidth={false} disableGutters>
      <Navbar />
      {/* <Typography variant="h3" gutterBottom className="welcome-heading">
        Welcome to Our Store
      </Typography> */}
      <Typography variant="body1">
        Explore our latest collection now!
      </Typography>

      {/* ✅ Use SearchBox component */}
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Grid container className="product-grid">
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <ProductCard product={product} showBuyNow={true} />
          </Grid>
        ))}
      </Grid>

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
    </Container>
  );
};

export default LandingPage;
