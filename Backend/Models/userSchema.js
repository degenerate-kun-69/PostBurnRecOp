import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "User Password is required"],
        minLength: 6,
        select: false,  // Do not return password in queries by default
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
