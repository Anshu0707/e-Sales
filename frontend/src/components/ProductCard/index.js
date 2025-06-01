import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css"; // ✅ Import styles

const ProductCard = ({ product, showBuyNow }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  // ✅ Store product details before navigating
  const handleBuyNow = () => {
    const selectedProduct = {
      _id: product._id,
      name: product.name,
      images: product.images,
      price: product.price,
      selectedSize: product.sizes[0], // ✅ First available size
      selectedColor: product.colors[0], // ✅ First available color
      quantity: 1, // ✅ Default quantity is 1
    };

    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct)); // ✅ Store product details
    navigate(`/checkout?productId=${product._id}`);
  };
  const handleNavigateToDetails = () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product)); // ✅ Store product in localStorage
    navigate(`/product/${product._id}`);
  };

  return (
    <Card
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleNavigateToDetails} // ✅ Clicking navigates to Product Details Page
      sx={{ cursor: "pointer" }}
    >
      <Box className="product-image-container">
        <CardMedia
          component="img"
          height="280"
          image={
            hovered && product.images.length > 1
              ? product.images[1]
              : product.images[0]
          }
          alt={product.name}
          className="product-image"
        />
      </Box>
      <CardContent className="product-content">
        <Typography variant="h6" className="product-name">
          {product.name}
        </Typography>
        <Typography variant="body1" className="product-price">
          Rs. {product.price.toFixed(2)}
        </Typography>
      </CardContent>
      {showBuyNow && (
        <Box className="product-button-container">
          <Button
            variant="contained"
            color="success"
            fullWidth
            // onClick={(event) => {
            //   event.stopPropagation(); // ✅ Prevent navigation conflict with `onClick`
            //   handleBuyNow();
            // }}
            className="buy-now-button"
          >
            Buy Now
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default ProductCard;
