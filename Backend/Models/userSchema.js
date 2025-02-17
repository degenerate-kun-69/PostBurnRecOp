import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    password: {
        type: String,
        required: [true, "User Password is required"],
        minLength: 6,
    
},
createdOn:{
    type:Date,
    default:Date.now    
}


}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
