const express = require("express");
const {
  getProducts,
  getProductById,
  searchProducts,
} = require("../controllers/productController");

const router = express.Router();

router.get("/search", searchProducts); // 👈 Put this before /:id
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
