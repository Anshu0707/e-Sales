import React from "react";
import { useCart } from "../../context/CartContext";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import "./Cart.css";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <Typography variant="h6" align="center" className="empty-cart">
        Your cart is empty.
      </Typography>
    );
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Box className="cart-container">
      <Stack spacing={3} className="cart-stack">
        {cartItems.map((item) => (
          <Card
            key={`${item._id}-${item.selectedSize}-${item.selectedColor}`}
            className="cart-item"
          >
            <CardMedia
              component="img"
              image={item.images[0]}
              alt={item.name}
              className="cart-item-image"
            />
            <CardContent className="cart-item-details">
              <Typography variant="h6" className="cart-item-name">
                {item.name}
              </Typography>
              <Typography className="cart-item-info">
                Color: {item.selectedColor}
              </Typography>
              <Typography className="cart-item-info">
                Size: {item.selectedSize}
              </Typography>
              <Typography className="cart-price">
                Price: Rs. {item.price.toFixed(2)}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                className="quantity-controls"
              >
                <IconButton
                  onClick={() => updateQuantity(item, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  color="primary"
                  className="qty-btn"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <Typography className="quantity">{item.quantity}</Typography>
                <IconButton
                  onClick={() => updateQuantity(item, item.quantity + 1)}
                  color="primary"
                  className="qty-btn"
                >
                  <AddCircleOutlineIcon />
                </IconButton>

                <IconButton
                  onClick={() => removeFromCart(item)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="remove-btn"
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        ))}

        <Typography variant="h6" className="cart-price total">
          Total: Rs. {total.toFixed(2)}
        </Typography>

        <Box className="checkout-section">
          <Button
            variant="contained"
            color="success"
            size="large"
            className="checkout-btn"
            onClick={() => (window.location.href = "/checkout")}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Cart;
