const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./src/config/db");
const productRoutes = require("./src/routes/productRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend.vercel.app"], // Add your Vercel URL here
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/products", productRoutes);

// Root route (helpful for verifying deployment)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Vercel needs the app exported
module.exports = app;

// Dynamic port for production
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`Server running on port http://localhost:${PORT}`),
  );
}
