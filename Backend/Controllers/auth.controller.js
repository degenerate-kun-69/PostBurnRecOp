import mongoose from "mongoose";
import { User } from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, password } = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{ name, password: hashedPassword }], { session });

        const token = jwt.sign({ userId: newUsers[0]._id }, process.env.JWT_SECRET, { expiresIn: "1hr" });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUsers[0],
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};


export const signin = async (req, res, next) => {
    try {
        const { name, password } = req.body;

        const user = await User.findOne({ name });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1hr" });

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token,
                user,
            }
        });
    } catch (error) {
        next(error);
    }
};
