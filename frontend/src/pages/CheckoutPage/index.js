import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Box,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // ✅ Extract parameters from URL
  const productId = searchParams.get("productId");
  const selectedSize = searchParams.get("size") || "";
  const selectedColor = searchParams.get("color") || "";
  const [quantity, setQuantity] = useState(
    parseInt(searchParams.get("quantity")) || 1
  );
  const [product, setProduct] = useState(null);

  const [order, setOrder] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    address: "",
    cityStateZip: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    transactionType: "1", // ✅ Default Approved Transaction
  });

  console.log(
    "Checkout Params:",
    productId,
    selectedSize,
    selectedColor,
    quantity
  );

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:5000/api/products/${productId}`)
        .then((response) => {
          setProduct({
            ...response.data, // ✅ Keep backend product details
            selectedSize: selectedSize, // ✅ Preserve user-selected Size from URL
            selectedColor: selectedColor, // ✅ Preserve user-selected Color from URL
            quantity: quantity, // ✅ Preserve user-selected Quantity
          });
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [productId, selectedSize, selectedColor, quantity]);
  // **Order Summary Calculations**
  const subtotal = product ? product.price * quantity : 0;
  const estimatedTaxes = subtotal * 0.15;
  const total = subtotal + estimatedTaxes;

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/checkout", {
        products: [
          {
            productId: product._id,
            name: product.name,
            quantity,
            price: product.price,
            selectedSize,
            selectedColor,
          },
        ],
        totalAmount: total,
        customerName: order.customerName,
        email: order.email,
        phoneNumber: order.phoneNumber,
        address: order.address,
        cityStateZip: order.cityStateZip,
        cardNumber: order.cardNumber,
        expiryDate: order.expiryDate,
        cvv: order.cvv,
        transactionType: order.transactionType,
      });

      alert(
        `Transaction ${response.data.message}! Order Number: ${response.data.orderNumber}`
      );
      navigate(`/thank-you/${response.data.orderNumber}`);
    } catch (error) {
      console.error(
        "Checkout Failed:",
        error.response?.data || error.message || error
      );
      alert("Something went wrong!");
    }
  };

  return (
    <Container className="checkout-container">
      <Grid container spacing={4}>
        {/* 🔹 Left Side - User Form */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4">Checkout</Typography>
          <form onSubmit={handleCheckout} className="checkout-form">
            <TextField
              fullWidth
              label="Full Name"
              name="customerName"
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="City, State, Zip Code"
              name="cityStateZip"
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Card Number"
              name="cardNumber"
              type="text"
              inputProps={{ maxLength: 16, pattern: "[0-9]{16}" }}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Expiry Date"
              name="expiryDate"
              type="month"
              onChange={handleChange}
              required
              inputProps={{ min: new Date().toISOString().slice(0, 7) }}
            />
            <TextField
              fullWidth
              label="CVV"
              name="cvv"
              type="password"
              inputProps={{ maxLength: 3, pattern: "[0-9]{3}" }}
              onChange={handleChange}
              required
            />
            {/* ✅ Transaction Type Selection */}
            <Typography variant="subtitle1">Transaction Type:</Typography>
            <Select
              name="transactionType"
              value={order.transactionType}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="1">✅ Approved</MenuItem>
              <MenuItem value="2">❌ Declined</MenuItem>
              <MenuItem value="3">⚠️ Gateway Failure</MenuItem>
            </Select>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Place Order
            </Button>
          </form>
        </Grid>

        {/* 🔹 Right Side - Dynamic Order Summary */}
        {product && (
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Order Summary</Typography>
            <Card className="summary-card">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    image={product.images[0]}
                    alt={product.name}
                    className="summary-image"
                  />
                </Grid>
                <Grid item xs={8}>
                  <CardContent>
                    <Typography variant="h6">
                      {product.name} ({selectedSize}/{selectedColor}){" "}
                      {/* ✅ Size/Color dynamically displayed */}
                    </Typography>

                    {/* ✅ Quantity Selector */}
                    <Box className="quantity-control">
                      <IconButton
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="h6">{quantity}</Typography>
                      <IconButton onClick={() => setQuantity(quantity + 1)}>
                        <AddIcon />
                      </IconButton>
                    </Box>

                    <Typography variant="subtitle1">
                      Subtotal: Rs. {subtotal.toFixed(2)}
                    </Typography>
                    <Typography variant="subtitle1">
                      Estimated Taxes: Rs. {estimatedTaxes.toFixed(2)}
                    </Typography>
                    <Typography variant="h5">
                      Total: Rs. {total.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
