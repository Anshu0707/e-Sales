import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import "./Catalog.css";
const API_BASE_URL = process.env.REACT_APP_API_URL;

const Catalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("❌ Error fetching products:", error));
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        className="catalog-grid"
      >
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} showBuyNow={false} />{" "}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Catalog;
