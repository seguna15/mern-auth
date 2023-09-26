import * as argon2 from "argon2";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    },
    Session: [String]
    
}, {timestamps: true});

// Hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    
    this.password = await argon2.hash(this.password,10);
});

const User = mongoose.model('User', userSchema);

export default User;



