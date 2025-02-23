import User from "../Models/userSchema.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  try {
    const { name, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ name }); 
    if (existingUser) return res.status(400).json({ error: "User already exists" });
    
    // Create new user
    const newUser = new User({ name, password });
    await newUser.save();
    
    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
}