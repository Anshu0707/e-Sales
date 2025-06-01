import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ThankYouPage.css";
const ThankYouPage = () => {
  const { orderNumber } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    console.log("Fetching order details for order:", orderNumber);
    console.log(orderDetails);
    axios
      .get(`http://localhost:5000/api/orders/${orderNumber}`)
      .then((res) => {
        console.log("Order details received:", res.data);
        setOrderDetails(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch order details:", err);
      });
  }, [orderNumber]);

  if (!orderDetails) return <p>Loading order details...</p>;

  return (
    <div className="thank-you-container">
      <h2>Thank You for Your Order!</h2>
      <p>
        Your order has been successfully processed. You will receive a
        confirmation email shortly.
      </p>

      <p>
        <strong>Order Number:</strong> {orderDetails.orderNumber}
      </p>
      <p>
        <strong>Customer Name:</strong> {orderDetails.customerName}
      </p>
      <p>
        <strong>Email:</strong> {orderDetails.email}
      </p>
      <p>
        <strong>Phone Number:</strong> {orderDetails.phoneNumber}
      </p>
      <p>
        <strong>Address:</strong> {orderDetails.address}
      </p>
      <p>
        <strong>City, State, Zip Code:</strong> {orderDetails.cityStateZip}
      </p>

      <h3>Order Summary</h3>
      <ul>
        {orderDetails.products.map((product, index) => (
          <li key={index}>
            {product.name} (Size: {product.selectedSize || "N/A"}, Color:{" "}
            {product.selectedColor || "N/A"}) x {product.quantity} - Rs.{" "}
            {(product.price * product.quantity).toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>Total Amount: Rs. {orderDetails.totalAmount.toFixed(2)}</h3>
    </div>
  );
};

export default ThankYouPage;
