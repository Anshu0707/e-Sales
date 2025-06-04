import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import CheckoutForm from "../../components/CheckoutForm";
import CheckoutSummary from "../../components/CheckoutSummary";
import { useCart } from "../../context/CartContext";
import "./CheckoutPage.css";
const API_BASE_URL = process.env.REACT_APP_API_URL;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("productId");
  const selectedSize = searchParams.get("size") || "";
  const selectedColor = searchParams.get("color") || "";
  const quantityParam = parseInt(searchParams.get("quantity")) || 1;

  const { cartItems, clearCart } = useCart();

  const [productsToCheckout, setProductsToCheckout] = useState([]);

  const [order, setOrder] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    address: "",
    cityStateZip: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    transactionType: "1",
  });

  useEffect(() => {
    if (productId) {
      const saved = localStorage.getItem("selectedProduct");

      if (saved) {
        const product = JSON.parse(saved);
        console.log("🟢 Buy Now Flow — LocalStorage Product:", product);
        setProductsToCheckout([product]);
      } else {
        axios
          .get(`${API_BASE_URL}/api/products/${productId}`)
          .then((response) => {
            const fallbackProduct = {
              ...response.data,
              selectedSize: selectedSize || response.data.sizes[0] || "",
              selectedColor: selectedColor || response.data.colors[0] || "",
              quantity: quantityParam,
            };
            setProductsToCheckout([fallbackProduct]);
          })
          .catch((error) => {
            console.error("Error fetching product:", error);
            setProductsToCheckout([]);
          });
      }
    } else {
      setProductsToCheckout(cartItems);
    }
  }, [productId, selectedSize, selectedColor, quantityParam, cartItems]);

  const subtotal = productsToCheckout.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const estimatedTaxes = subtotal * 0.15;
  const total = subtotal + estimatedTaxes;

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/checkout`, {
        products: productsToCheckout.map((item) => ({
          productId: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        })),
        totalAmount: total,
        ...order,
      });

      alert(
        `Transaction ${response.data.message}! Order Number: ${response.data.orderNumber}`
      );

      // If checkout came from cart, clear it after successful order
      if (!productId) clearCart();

      navigate(`/thank-you/${response.data.orderNumber}`);
    } catch (error) {
      console.error("Checkout Failed:", error.response?.data || error.message);
      alert("Something went wrong!");
    }
  };

  return (
    <Container className="checkout-container">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">Checkout</Typography>
          <CheckoutForm
            order={order}
            onChange={handleChange}
            onSubmit={handleCheckout}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          {productsToCheckout.length > 0 ? (
            <>
              <Typography variant="h5">Order Summary</Typography>
              <CheckoutSummary
                products={productsToCheckout}
                subtotal={subtotal}
                estimatedTaxes={estimatedTaxes}
                total={total}
              />
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Your cart is empty.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
