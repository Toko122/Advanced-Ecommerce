import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true, unique: true},
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'    
    },
    resetToken: {type: String},
    resetTokenExpire: {type: Date},
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User