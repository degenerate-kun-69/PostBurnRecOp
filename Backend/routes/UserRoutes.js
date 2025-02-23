import { Router } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/userSchema.js';

const Users = Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined in environment variables");
}

// ✅ Signup Route
Users.post('/signup', async (req, res) => {
  try {
    const { name, password } = req.body;

    // ✅ Check if name & password are provided
    if (!name || !password) {
      return res.status(400).json({ success: false, message: "Name and password are required" });
    }

    // ✅ Enforce password security (at least 6 characters)
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // ✅ Hash password and save user
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ name, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ✅ Login Route
Users.post('/signin', async (req, res) => {
  try {
    const { name, password } = req.body;

    // ✅ Validate input
    if (!name || !password) {
      return res.status(400).json({ success: false, message: "Name and password are required" });
    }

    // ✅ Check if user exists
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // ✅ Compare passwords
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // ✅ Send token securely via HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === 'production', // Secure in production
      sameSite: 'strict', // Prevent CSRF attacks
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("❌ Signin Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default Users;
