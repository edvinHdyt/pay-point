import mongoose from "mongoose";

const User = mongoose.model("User", {
    name: {
        type: String,      
        max: 50,
        required: true
    },
    email: {
        type: String,
        max: 100,
        unique: true,
        required:true
    },
    password: {
        type: String,
        max: 255,
        required: true
    },
    password_verified: {
        type: Date
    },
    profile_pict: {
        type: String,
        max: 100
    },
    created_at: {
        type: Date,
        require: true
    },
    modified_by: {
        type: String,
        max: 50,
        required: true
    }
})

export default User;