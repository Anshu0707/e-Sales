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
import { useCart } from "../../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product, showBuyNow }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    const selectedProduct = {
      _id: product._id,
      name: product.name,
      images: product.images,
      price: product.price,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0],
      quantity: 1,
    };

    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
    navigate(`/checkout?productId=${product._id}`);
  };

  const handleNavigateToDetails = () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();

    const cartProduct = {
      _id: product._id,
      name: product.name,
      images: product.images,
      price: product.price,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0],
      quantity: 1,
    };
    addToCart(cartProduct);
  };

  return (
    <Card
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleNavigateToDetails}
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
            onClick={(event) => {
              event.stopPropagation();
              handleBuyNow();
            }}
            className="buy-now-button"
          >
            Buy Now
          </Button>

          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={handleAddToCart}
            className="add-to-cart-button"
          >
            Add to Cart
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default ProductCard;
