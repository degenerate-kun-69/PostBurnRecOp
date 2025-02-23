import express from "express";
import connectDB from "./db/connectDB.js";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/reportRoutes.js";
import Volunteer from "./routes/Volunteer.js";
import Resources from "./routes/Resources.js";
import Auth from "./routes/Auth.routes.js";

dotenv.config();

const app = express();
app.use(express.json()); // Ensure Express can parse JSON
app.use(express.urlencoded({ extended: true })); // Allow form data parsing


app.use(express.json({ limit: "10mb" }));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

connectDB().catch(err => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});

app.use("/api/reports", router);
app.use("/api/volunteers", Volunteer);
app.use("/api/resources", Resources);
app.use("/api/auth", Auth);

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});