import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Container } from "@mui/material";
import ThankYouSummary from "../../components/ThankYouSummary";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ThankYouPage = () => {
  const { orderNumber } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/orders/${orderNumber}`)
      .then((res) => setOrderDetails(res.data))
      .catch((err) => console.error(err));
  }, [orderNumber]);

  if (!orderDetails)
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Loading order details...
        </Typography>
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <ThankYouSummary orderDetails={orderDetails} />

      <Box
        mt={6}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          component="img"
          src="https://tenor.com/view/thank-you-pikachu-thank-you-gif-15371199.gif"
          alt="Thank you Pikachu"
          sx={{
            width: 220,
            borderRadius: 2,
            boxShadow: 3,
            mb: 2,
            animation: "zoomIn 0.8s ease",
          }}
        />
        <Typography variant="h6" color="white">
          Pikachu says thank you for shopping!
        </Typography>
      </Box>
    </Container>
  );
};

export default ThankYouPage;
