# e-Sales: Full-Stack E-commerce Application

Welcome to **e-Sales**, a modern full-stack e-commerce platform built with React on the frontend and Express.js on the backend. This project demonstrates robust cart management, dynamic order summaries, seamless email notifications, and well-structured Express APIs.

---

## 🚀 Tech Stack

### Frontend
- **React** with functional components & hooks  
- **Material-UI** for sleek, responsive UI components  
- **React Router** for client-side routing  
- State management with React Context API  
- Axios for API calls  

### Backend
- **Node.js** with **Express.js** for APIs  
- MongoDB for data persistence  
- Nodemailer (Mailtrap) for email notifications  
- Environment-based configuration with `.env` files  

---


---

## 🛒 Cart Handling

- Cart state managed via React Context API for global accessibility  
- Persistent cart across pages with add, update, and remove product features  
- Dynamic updates on quantity, color, and size selections  
- Real-time total amount and summary recalculations  

---

## 📋 Dynamic Order Summary

- Displays detailed product info: name, selected size & color, quantity, and price  
- Calculates subtotal, estimated taxes (e.g., 15%), and total amount dynamically  
- Responsive UI using Material-UI components for clarity and elegance  

---

## 📧 Email Notifications

- Backend triggers order confirmation emails on successful checkout  
- Configured using Nodemailer with Mailtrap for safe testing  
- Email includes order details and customer information  

---

## ⚙️ Express APIs

- Structured RESTful routes using Express Router  
- APIs for fetching products, creating orders, and checkout processing  
- Controllers separate business logic from routing  
- Environment variables secure sensitive data (DB credentials, email credentials)  

---

## 🛠 Running the Project

### Backend
```bash
cd backend
npm install
npm start

![Screenshot 2025-06-03 210944](https://github.com/user-attachments/assets/5305e856-7107-4d96-8341-649f64a5fe4f)
![Screenshot 2025-06-03 210612](https://github.com/user-attachments/assets/e7ea2131-0798-4e46-8ed0-a4ac2339cdeb)
![Screenshot 2025-06-03 210714](https://github.com/user-attachments/assets/19c47760-39cf-4f5c-888a-68f43928e371)
![Screenshot 2025-06-02 025655](https://github.com/user-attachments/assets/594e1fc0-7910-4b06-9356-e5cf2ff43565)
![Screenshot 2025-06-02 025741](https://github.com/user-attachments/assets/992f527f-4cd5-457b-89d8-da486ac411f5)
![Screenshot 2025-06-03 210847](https://github.com/user-attachments/assets/638a5c86-0062-47da-b5b5-82da0e7fbe60)



