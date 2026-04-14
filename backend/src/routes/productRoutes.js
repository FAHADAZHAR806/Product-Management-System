const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// ── ROUTES ──

// Saare products lene ke liye
router.get("/", productController.getProducts);

// FIX: Specific product lene ke liye (Iske baghair View/Edit nahi chalega)
router.get("/:id", productController.getProductById);

// Naya product banane ke liye
router.post("/", productController.createProduct);

// Update karne ke liye
router.put("/:id", productController.updateProduct);

// Delete karne ke liye
router.delete("/:id", productController.deleteProduct);

module.exports = router;
