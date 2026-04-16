import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// configure env
dotenv.config();

// database config
connectDB();

// ESM fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// API routes (এগুলো আগে রাখো)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, "client/build")));

// Fallback route for React (non-API GET requests)
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  } else {
    next();
  }
});

// PORT
const PORT = process.env.PORT || 5152;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.bgCyan.white)
);