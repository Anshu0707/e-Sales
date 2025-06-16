import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Slide,
  Fade,
} from "@mui/material";
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

  // Typewriter effect setup (Fixed logic)
  const fullText = "Contact Us";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, index + 1));
        setIndex((prev) => prev + 1);
      }, 200); // typing speed
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setErrors({
        ...errors,
        email: emailRegex.test(value) ? "" : "Invalid email format",
      });
    }

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
      <Typography variant="h3" className="contact-heading">
        {typedText}
      </Typography>

      <Fade in={messageSent} timeout={500}>
        <Typography variant="body1" className="contact-message">
          ✅ Thanks for contacting us. We'll get back to you as soon as
          possible.
        </Typography>
      </Fade>

      <Slide direction="up" in={true} timeout={1000} mountOnEnter unmountOnExit>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="contact-form"
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "white",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
          }}
        >
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
      </Slide>
    </Container>
  );
};

export default Contact;
