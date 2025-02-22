import express from "express";
import connectDB from "./db/connectDB.js";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/reportRoutes.js";
import Volunteer from "./routes/Volunteer.js";

dotenv.config();

const app = express(); // ✅ Define app first
app.use(express.json());
app.use(cors());

connectDB(); // ✅ Call after app initialization

app.use("/api/reports", router);
app.use("/api/volunteers", Volunteer);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.post("/create-account", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ success: false, message: "Please provide name and password" });
  }
  res.status(201).json({ success: true, message: "Account created successfully!" }); // ✅ Fixed
});

app.use((err, req, res, next) => { // ✅ Error handling middleware
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
