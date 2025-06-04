import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ThankYouSummary from "../../components/ThankYouSummary";
import "./ThankYouPage.css";
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
    return <p className="loading-text">Loading order details...</p>;

  return (
    <div className="thank-you-page-container">
      <ThankYouSummary orderDetails={orderDetails} />
    </div>
  );
};

export default ThankYouPage;
