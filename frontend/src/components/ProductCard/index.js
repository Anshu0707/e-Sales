import React, { useState } from "react";
import { CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
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
    <motion.div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleNavigateToDetails}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
        boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.3)",
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Box className="product-image-container">
        <motion.img
          src={
            hovered && product.images.length > 1
              ? product.images[1]
              : product.images[0]
          }
          alt={product.name}
          className="product-image"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 250 }}
        />
      </Box>

      <CardContent className="product-content">
        <Typography variant="subtitle1" className="product-name">
          {product.name}
        </Typography>
        <Typography variant="body1" className="product-price">
          Rs. {product.price.toFixed(2)}
        </Typography>
      </CardContent>

      {showBuyNow && (
        <Box className="product-button-container">
          <motion.button
            className="buy-now-button"
            onClick={(event) => {
              event.stopPropagation();
              handleBuyNow();
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 0px 12px rgba(255, 87, 34, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Buy Now
          </motion.button>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={handleAddToCart}
            className="add-to-cart-button"
            component={motion.div}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </Button>
        </Box>
      )}
    </motion.div>
  );
};

export default ProductCard;
