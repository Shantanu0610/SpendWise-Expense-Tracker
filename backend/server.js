
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json({ limit: "10kb" }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many requests. Please try again later."
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many authentication attempts. Try again later."
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "SpendWise Secure REST API is running."
  });
});

app.use("/api", apiLimiter);

app.use("/api/users", (req, res, next) => {
  if (req.path === "/login" || req.path === "/register") {
    return authLimiter(req, res, next);
  }
  next();
});

app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "API endpoint not found."
  });
});

// Centralized error handling
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error("Request error:", err.message);

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      message: "Invalid JSON request body."
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Invalid data."
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid identifier."
    });
  }

  return res.status(500).json({
    message: "Internal server error."
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    throw new Error("MONGODB_URI and JWT_SECRET must be configured.");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected successfully.");

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1);
});
