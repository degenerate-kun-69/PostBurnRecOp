import express from "express";
import {
	login,
	logout,
	signup,
	

	checkAuth,
} from "../Controllers/auth.controller.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);




export default router;