import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import "./Contact.css";

const Contact = () => {
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({ email: "", phone: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Validate Email
    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setErrors({
        ...errors,
        email: emailRegex.test(value) ? "" : "Invalid email format",
      });
    }

    // Validate Phone (10-digit Indian format)
    if (name === "phone") {
      const phoneRegex = /^[6-9]\d{9}$/;
      setErrors({
        ...errors,
        phone: phoneRegex.test(value) ? "" : "Invalid phone number (10 digits)",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!errors.email && !errors.phone) {
      setMessageSent(true);
    }
  };

  return (
    <Container maxWidth="sm" className="contact-container">
      <Typography variant="h4" className="contact-heading">
        Contact Us
      </Typography>

      {messageSent && (
        <Typography variant="body1" className="contact-message">
          ✅ Thanks for contacting us. We'll get back to you as soon as
          possible.
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} className="contact-form">
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          required
          fullWidth
          className="input-field"
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          required
          fullWidth
          type="email"
          className="input-field"
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          name="phone"
          label="Phone Number"
          variant="outlined"
          required
          fullWidth
          type="tel"
          className="input-field"
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          name="message"
          label="Message"
          variant="outlined"
          required
          multiline
          rows={4}
          fullWidth
          className="input-field"
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="submit-btn"
        >
          Send Message
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;
