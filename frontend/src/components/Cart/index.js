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

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ color: "white" }}>
        Your cart is empty.
      </Typography>
    );
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        p: 3,
        bgcolor: "#fafafa",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Stack spacing={3}>
        {cartItems.map((item) => (
          <Card
            key={`${item._id}-${item.selectedSize}-${item.selectedColor}`}
            sx={{ display: "flex", p: 2 }}
          >
            <CardMedia
              component="img"
              image={item.images[0]}
              alt={item.name}
              sx={{
                width: 120,
                height: 120,
                borderRadius: 2,
                objectFit: "cover",
              }}
            />
            <CardContent sx={{ flexGrow: 1, position: "relative" }}>
              <Typography variant="h6" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="body2">
                Color: {item.selectedColor}
              </Typography>
              <Typography variant="body2">Size: {item.selectedSize}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Price: Rs. {item.price.toFixed(2)}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                <IconButton
                  onClick={() => updateQuantity(item, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  color="primary"
                  size="small"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{ minWidth: 25, textAlign: "center" }}
                >
                  {item.quantity}
                </Typography>
                <IconButton
                  onClick={() => updateQuantity(item, item.quantity + 1)}
                  color="primary"
                  size="small"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Stack>

              <IconButton
                onClick={() => removeFromCart(item)}
                aria-label={`Remove ${item.name} from cart`}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "error.main",
                }}
              >
                <CloseIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}

        <Typography
          variant="h6"
          sx={{ textAlign: "right", mt: 3, color: "black" }}
        >
          Total: Rs. {total.toFixed(2)}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="success"
            size="large"
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
