const express = require("express");
const {
  getProducts,
  getProductById,
  searchProducts,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/search", searchProducts);

module.exports = router;
