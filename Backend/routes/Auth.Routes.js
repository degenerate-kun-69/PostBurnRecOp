
import { Router } from "express";

const router = Router();



router.post("/signup", (req,res)=>{
	res.send({
		message:"Signup route"
	})
});

router.post ("/signin",(req,res)=>{
	res.send({
        message:"Login route"
    })
})

router.post("/logout",(req,res)=>{
	res.send({
		message:"Logout route"
	})
})






export default router;