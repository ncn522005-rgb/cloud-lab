require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(cors());

app.use(express.json());

// Câu 45: API kiểm tra Backend
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Express Backend!" });
});

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