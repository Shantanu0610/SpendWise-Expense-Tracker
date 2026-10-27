import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;
const allowedOrigins = CLIENT_URL ? [CLIENT_URL, "http://localhost:5173"] : "*";

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "10kb" }));

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1
      ? "Connected"
      : mongoose.connection.readyState === 2
      ? "Connecting"
      : "Disconnected / Check IP Whitelist";

  res.json({
    message: "SpendWise API and WebSocket server are running.",
    database: dbStatus,
  });
});

app.use("/api/auth", authRoutes);

// Real-time communication
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("chatMessage", (data) => {
    if (
      !data ||
      typeof data.username !== "string" ||
      typeof data.message !== "string"
    ) {
      return;
    }

    const username = data.username.trim().slice(0, 30);
    const message = data.message.trim().slice(0, 500);

    if (!username || !message) return;

    io.emit("chatMessage", {
      username,
      message,
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "API route not found." });
});

// Start listening immediately so Render detects open port
httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Connect to MongoDB
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully.");
    })
    .catch((error) => {
      console.error(
        "MongoDB connection error (Whitelist 0.0.0.0/0 in MongoDB Atlas):",
        error.message
      );
    });
} else {
  console.warn("MONGO_URI not set. Running in offline/in-memory mode.");
}
