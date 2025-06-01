import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ Navigation Hook
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton,
  Box,
  Card,
  CardMedia,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import RelatedProducts from "../RelatedProducts/index"; // ✅ Import Related Products component
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Navigation Hook
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(""); // ✅ Default to main image
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(""); // ✅ Store selected size
  const [selectedColor, setSelectedColor] = useState(""); // ✅ Store selected color

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setSelectedImage(response.data.images[0]); // ✅ Main image
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const handleBuyNow = () => {
    console.log("User is checking out with:", {
      productId: product._id,
      selectedSize,
      selectedColor,
      quantity,
    }); // ✅ Ensures all data is correctly being logged

    if (!selectedSize || !selectedColor) {
      alert("Please select size and color before proceeding."); // ✅ Prevents empty selections
      return;
    }

    navigate(
      `/checkout?productId=${product._id}&size=${encodeURIComponent(
        selectedSize
      )}&color=${encodeURIComponent(selectedColor)}&quantity=${quantity}`
    );
  };

  if (!product) {
    return <Typography variant="h4">Loading product details...</Typography>;
  }

  return (
    <Container className="product-details-container">
      <Grid container spacing={4}>
        {/* 🔹 Left Side - Main Image & Thumbnails */}
        <Grid item xs={12} md={5}>
          <Card className="image-card">
            <CardMedia
              component="img"
              className="main-image"
              image={selectedImage}
              alt={product.name}
            />
            <Box className="thumbnail-images">
              {product.images.slice(1).map((img, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={img}
                  alt={`${product.name} ${index}`}
                  className="thumbnail"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </Box>
          </Card>
        </Grid>

        {/* 🔹 Right Side - Product Details */}
        <Grid item xs={12} md={7}>
          <Typography variant="h4">{product.name}</Typography>

          {/* ✅ Size Selection */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Choose Size:
          </Typography>
          <Select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            fullWidth
            className="white-select"
          >
            {product.sizes.map((size, index) => (
              <MenuItem key={index} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>

          {/* ✅ Color Selection */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Choose Color:
          </Typography>
          <Select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            fullWidth
            className="white-select"
          >
            {product.colors.map((color, index) => (
              <MenuItem key={index} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>

          {/* ✅ Quantity Selection */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Quantity:
          </Typography>
          <Box className="quantity-control">
            <IconButton
              className="white-icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6">{quantity}</Typography>
            <IconButton
              className="white-icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <AddIcon />
            </IconButton>
          </Box>

          {/* ✅ Price & Buy Button */}
          <Typography variant="h5" sx={{ mt: 2 }}>
            Price: Rs. {product.price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="buy-now"
            onClick={handleBuyNow} // ✅ Redirects to checkout
          >
            Buy Now
          </Button>

          {/* ✅ Product Description */}
          <Typography variant="body1" sx={{ mt: 3 }}>
            {product.description}
          </Typography>
        </Grid>
      </Grid>

      {/* 🔹 Related Products Section */}
      <RelatedProducts product={product} />
    </Container>
  );
};

export default ProductDetails;
