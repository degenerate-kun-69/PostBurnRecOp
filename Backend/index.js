import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./db/connectDB.js";
import router from "./routes/Auth.Routes.js";
import UserRouter from "./routes/UserRoutes.js";

import errormiddleware from "./Middlewares/ErrorMiddleWare.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/v1/auth", router);
app.use("/api/v1/users", UserRouter);

app.use(errormiddleware);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
app.post("/create-account",async(req, res) => {
  const {name, password}=req.body;
  if(!name || !password){
     return res.status(400).json({success:false,message:"Please provide name and password"});
  }
 })
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});