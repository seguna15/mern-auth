import * as argon2 from "argon2";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const {sign} = jwt;

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

userSchema.methods.getJwtAccessToken = function () {
  return sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};


userSchema.methods.comparePassword = async function (enteredPassword) {
  return await argon2.verify(this.password, enteredPassword);
};

const User = mongoose.model('User', userSchema);

export default User;



