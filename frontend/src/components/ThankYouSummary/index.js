import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import "./ThankYouSummary.css";

const ThankYouSummary = ({ orderDetails }) => {
  if (!orderDetails) return null;

  // Calculate subtotal from products
  const subtotal = orderDetails.products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const estimatedTaxes = subtotal * 0.15;

  return (
    <Paper className="thank-you-summary-container" elevation={3}>
      <Typography
        variant="h4"
        align="center"
        className="thank-you-summary-header"
      >
        Thank You for Your Order!
      </Typography>

      <Typography
        variant="body1"
        align="center"
        className="thank-you-summary-message"
        paragraph
      >
        Your order has been successfully processed. You will receive a
        confirmation email shortly.
      </Typography>

      <Box className="thank-you-summary-info">
        <Typography>
          <strong>Order Number:</strong> {orderDetails.orderNumber}
        </Typography>
        <Typography>
          <strong>Customer Name:</strong> {orderDetails.customerName}
        </Typography>
        <Typography>
          <strong>Email:</strong> {orderDetails.email}
        </Typography>
        <Typography>
          <strong>Phone Number:</strong> {orderDetails.phoneNumber}
        </Typography>
        <Typography>
          <strong>Address:</strong> {orderDetails.address}
        </Typography>
        <Typography>
          <strong>City, State, Zip Code:</strong> {orderDetails.cityStateZip}
        </Typography>
      </Box>

      <Typography variant="h5" className="thank-you-summary-order-title">
        Order Summary
      </Typography>

      <List>
        {orderDetails.products.map((product, index) => (
          <ListItem key={index} className="thank-you-summary-list-item">
            <ListItemText
              primary={`${product.name} x ${product.quantity}`}
              secondary={`Size: ${product.selectedSize || "N/A"}, Color: ${
                product.selectedColor || "N/A"
              } - Rs. ${(product.price * product.quantity).toFixed(2)}`}
              primaryTypographyProps={{
                className: "thank-you-summary-list-primary",
              }}
              secondaryTypographyProps={{
                className: "thank-you-summary-list-secondary",
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Subtotal and Estimated Taxes */}
      <Box className="thank-you-summary-totals">
        <Typography variant="body1" className="subtotal-line">
          Subtotal: Rs. {subtotal.toFixed(2)}
        </Typography>
        <Typography variant="body1" className="taxes-line">
          Estimated Taxes 15%: Rs. {estimatedTaxes.toFixed(2)}
        </Typography>
      </Box>

      <Typography variant="h6" className="thank-you-summary-total">
        Total Amount: Rs. {orderDetails.totalAmount.toFixed(2)}
      </Typography>
    </Paper>
  );
};

export default ThankYouSummary;
