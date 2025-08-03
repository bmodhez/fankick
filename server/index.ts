import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock
} from "./routes/products";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '10mb' })); // Increased limit for image uploads
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health check routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Product API routes
  app.get("/api/products", getAllProducts);
  app.get("/api/products/:id", getProductById);
  app.post("/api/products", createProduct);
  app.put("/api/products/:id", updateProduct);
  app.delete("/api/products/:id", deleteProduct);
  app.put("/api/products/:id/stock", updateProductStock);

  return app;
}
