
import { Router } from "express";
import { signin, signup } from "../Controllers/auth.controller.js";

const router = Router();



router.post("/signup", signup);

router.post ("/signin",signin)

//router.post("/logout",signout)





export default router;