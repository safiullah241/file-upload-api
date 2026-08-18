const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const fileRoutes = require("./routes/fileRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/files", fileRoutes);

app.get("/health", (req, res) =>
{
    res.json({
        success: true,
        message: "File Upload API is running"
    });
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() =>
    {
        console.log("MongoDB Connected");

        app.listen(process.env.PORT, () =>
        {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) =>
    {
        console.error("MongoDB connection failed:", error.message);
    });