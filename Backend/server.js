import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import reportsRouter from "./src/routes/reportRoutes.js"; // pastikan path benar

dotenv.config();

const app = express();

// ⚡ CORS untuk frontend Netlify
app.use(cors({
  origin: "https://temusgd.netlify.app",
  methods: ["GET", "POST"]
}));

app.use(express.json());

// 🔹 CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ROUTE TEST
app.get("/", (req, res) => {
  res.json({ message: "Lost & Found API running..." });
});

// 🔹 ROUTE /REPORTS
app.use("/reports", reportsRouter);  // <- pastikan ini ada

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
