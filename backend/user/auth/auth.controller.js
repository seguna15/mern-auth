import Joi from "joi";
import User from "../user.model.js";
import ErrorHandler from "../../utils/ErrorHandler.js";

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
      const newUser = new User({username, email, password});
      await newUser.save();

      return res.status(201).json({message: "User created successfully"});
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    
  console.log(req.body);
  return res.status(200).send(req.body);
}