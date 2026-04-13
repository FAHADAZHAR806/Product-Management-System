const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./src/config/db");
const productRoutes = require("./src/routes/productRoutes");

const app = express();

// Middleware
app.use(cors()); // CRITICAL: Allows React to talk to Node
app.use(express.json()); // Allows parsing of JSON bodies

// Connect Database
connectDB();

// Routes
app.use("/api/products", productRoutes);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);
