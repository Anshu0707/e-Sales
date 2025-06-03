import React from "react";
import Cart from "../../components/Cart";
import "./CartPage.css";

const CartPage = () => {
  return (
    <div className="cart-page-container">
      <h1>Your Shopping Cart</h1>
      <Cart />
    </div>
  );
};

export default CartPage;
