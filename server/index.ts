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
  updateProductStock,
} from "./routes/products";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserProfile,
  getUserAddresses,
  addUserAddress,
  getUserCart,
  addToCart,
  removeFromCart,
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
} from "./routes/users";
import { UserServiceJson } from "./services/userServiceJson.js";
import { testAuthFlow } from "./routes/testAuth.js";
// import "./database/init.js"; // Initialize database on startup - disabled until PostgreSQL is configured

export function createServer() {
  const app = express();

  // Initialize user service to ensure database is ready
  new UserServiceJson();

  // Middleware
  app.use(
    cors({
      origin: true, // Allow all origins in development
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  app.use(express.json({ limit: "10mb" })); // Increased limit for image uploads
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Add request logging middleware for debugging
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  // Health check routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Test auth endpoint
  app.get("/api/test-auth", testAuthFlow);

  // Product API routes
  app.get("/api/products", getAllProducts);
  app.get("/api/products/:id", getProductById);
  app.post("/api/products", createProduct);
  app.put("/api/products/:id", updateProduct);
  app.delete("/api/products/:id", deleteProduct);
  app.put("/api/products/:id/stock", updateProductStock);

  // User Authentication routes
  app.post("/api/auth/register", registerUser);
  app.post("/api/auth/login", loginUser);
  app.post("/api/auth/logout", logoutUser);
  app.get("/api/auth/me", getCurrentUser);

  // User Profile routes
  app.put("/api/users/profile", updateUserProfile);
  app.get("/api/users/addresses", getUserAddresses);
  app.post("/api/users/addresses", addUserAddress);

  // User Cart routes
  app.get("/api/users/cart", getUserCart);
  app.post("/api/users/cart", addToCart);
  app.delete("/api/users/cart/:itemId", removeFromCart);

  // User Wishlist routes
  app.get("/api/users/wishlist", getUserWishlist);
  app.post("/api/users/wishlist", addToWishlist);
  app.delete("/api/users/wishlist/:productId", removeFromWishlist);

  return app;
}
