import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CatalogPage from "./pages/CatalogPage";
import ContactPage from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
import ProductDetailsPage from "./pages/ProductDetailsPage"; // ✅ Import Product Details Page
import "./App.css"; // ✅ Ensure global styles are applied

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you/:orderNumber" element={<ThankYouPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />{" "}
          {/* ✅ Added Product Details Page */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
