import Joi from "joi";
import User from "../user.model.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import { sendAccessToken } from "../../utils/SendToken.js";

export const createUser = async (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return next(new ErrorHandler(error.details[0].message, 400)); 
    const {username, email, password} = req.body;

    try {
      const existingUsername = await User.findOne({username});
      if (existingUsername)
        return next(new ErrorHandler("Record already exist", 409));
      const existingMail = await User.findOne({ email});
      if (existingMail)
        return next(new ErrorHandler("Record already exist", 409));

      const newUser = new User({username, email, password});
      await newUser.save();

      return res.status(201).json({message: "User created successfully"});
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(user) {
      await sendAccessToken(user, 201, res);
      const { password: hashedPassword, ...rest } = user._doc;
      return res.status(200).json(rest);
    }else{
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: generatedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      await sendAccessToken(newUser, 201, res);
      const { password: hashedPassword, ...rest } = newUser._doc;
      return res.status(200).json(rest);
    }
  
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}


export const login = async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const validUser = await User.findOne({email});
    if(!validUser) return next( new ErrorHandler('User not found', 404));
    
    const validPassword = await validUser.comparePassword(password);
    if (!validPassword) return next( new ErrorHandler("Wrong credentials", 401));
    const {password:hashedPassword,...rest} = validUser._doc;
    await sendAccessToken(validUser, 201, res);
    return res.status(200).json(rest);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}