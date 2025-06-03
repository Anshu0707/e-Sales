import React from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

const CheckoutSummary = ({ products, subtotal, estimatedTaxes, total }) => {
  return (
    <Box sx={{ bgcolor: "#D78C3D", p: 3, borderRadius: 2, boxShadow: 1 }}>
      <List disablePadding>
        {products.map((item, index) => (
          <ListItem key={`${item._id}-${index}`} sx={{ py: 1, px: 0 }}>
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={item.images && item.images[0]}
                alt={item.name}
                sx={{ width: 60, height: 60, borderRadius: 1, mr: 2 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${item.name} (${item.selectedColor}, ${item.selectedSize})`}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography
              variant="body2"
              sx={{ minWidth: 80, textAlign: "right" }}
            >
              Rs. {(item.price * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}

        <Divider />

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Subtotal" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Rs. {subtotal.toFixed(2)}
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Estimated Taxes (15%)" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Rs. {estimatedTaxes.toFixed(2)}
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            Rs. {total.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default CheckoutSummary;
