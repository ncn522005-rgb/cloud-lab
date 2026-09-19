require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// API kiểm tra Backend
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Express Backend!" });
});

// Student routes
app.use("/api/students", studentRoutes);

// Kết nối MongoDB (hỗ trợ đa dạng biến môi trường hoặc local fallback)
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/studentdb";
mongoose.connect(mongoUri)
    .then(() => {
        console.log("✅ MongoDB connected successfully!");
    })
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});