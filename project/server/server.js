require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

app.listen(5000, "0.0.0.0", () => {
    console.log("Server running on port 5000");
});