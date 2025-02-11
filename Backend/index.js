import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";


import connectDB from "./db/connectDB.js";

connectDB(); // Call the function to establish the DB connection




import router from "./routes/Auth.Routes.js";
import UserRouter from "./routes/UserRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/v1/auth", router);
app.use("/api/v1/auth", UserRouter);



app.get("/", (req, res) => {
	res.send("API is running...");
})

app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});