const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorMiddleware");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const userRoutes = require("./routes/userRoutes");

// Middleware setup
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
    origin: ["http://localhost:5173", "https://shopitoapp.vercel.app"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("Home Page...");
});

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Graceful shutdown
const shutdown = async () => {
    console.log("Shutting down gracefully...");
    try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
    } catch (error) {
        console.error("Error closing MongoDB connection:", error);
    } finally {
        process.exit(0);
    }
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
