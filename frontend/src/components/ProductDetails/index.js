import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import RelatedProducts from "../RelatedProducts/index";
import "./ProductDetails.css";
const API_BASE_URL = process.env.REACT_APP_API_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setSelectedImage(response.data.images[0]);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color before proceeding.");
      return;
    }

    const selectedProduct = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    };

    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));

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

        <Grid item xs={12} md={7}>
          <Typography variant="h4">{product.name}</Typography>

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

          <Typography variant="h5" sx={{ mt: 2 }}>
            Price: Rs. {product.price.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="buy-now"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {product.description}
          </Typography>
        </Grid>
      </Grid>

      <RelatedProducts product={product} />
    </Container>
  );
};

export default ProductDetails;
