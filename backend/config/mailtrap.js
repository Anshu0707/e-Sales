const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const sendOrderEmail = async (order, transactionStatus) => {
  let subject, message;

  const productDetails = order.products
    .map(
      (product) => `
        <li>
          <strong>${product.name}</strong> (${product.variant})<br />
          Quantity: ${product.quantity}<br />
          Price: ₹${product.price}
        </li>
      `
    )
    .join("");

  if (transactionStatus === "Approved") {
    subject = `✅ Order #${order.orderNumber} Confirmed`;
    message = `
      <h2>Thank you for your order, ${order.customerName}!</h2>
      <p><strong>Order Number:</strong> ${order.orderNumber}</p>
      <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
      
      <h3>Customer Details:</h3>
      <p>Email: ${order.email}</p>
      <p>Phone: ${order.phoneNumber}</p>
      <p>Shipping Address: ${order.address}, ${order.cityStateZip}</p>

      <h3>Ordered Products:</h3>
      <ul>${productDetails}</ul>

      <p>We will ship your items soon!</p>
    `;
  } else {
    subject = `❌ Order #${order.orderNumber} Failed`;
    message = `
      <h2>Transaction Failed</h2>
      <p>Reason: ${transactionStatus}</p>
      <p>Customer: ${order.customerName} (${order.email})</p>
      <p>Please try again or contact support.</p>
    `;
  }

  await transporter.sendMail({
    from: '"E-Commerce Support" <support@yourstore.com>',
    to: order.email,
    subject,
    html: message,
  });
};

module.exports = sendOrderEmail;
