require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express Backend!" });
});

app.use("/api/students", studentRoutes);

const mongoUri =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/studentdb";

mongoose
  .connect(mongoUri, { family: 4, serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log(" MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error(" MongoDB connection error:", error.message || error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT}`);
});