import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./RelatedProducts.css";
const API_BASE_URL = process.env.REACT_APP_API_URL;

const RelatedProducts = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products?category=${product.category}`)
      .then((res) => {
        const filteredProducts = res.data.filter(
          (p) => p.category === product.category && p._id !== product._id
        );
        setRelatedProducts(filteredProducts.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, [product.category, product._id]);

  return (
    <div className="related-products">
      <Typography variant="h4" sx={{ mt: 5 }}>
        Related Products
      </Typography>
      <Grid container spacing={2} direction="row" className="related-grid">
        {relatedProducts.map((related) => (
          <Grid item xs={6} sm={3} key={related._id}>
            <Card
              className="related-product-card"
              onClick={() => navigate(`/product/${related._id}`)}
            >
              <CardMedia
                component="img"
                image={related.images[0]}
                alt={related.name}
                className="small-product-image"
              />
              <CardContent>
                <Typography variant="h6">{related.name}</Typography>
                <Typography variant="subtitle1">Rs. {related.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RelatedProducts;
