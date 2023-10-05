import ErrorHandler from "../utils/ErrorHandler.js"
import User from "./user.model.js";

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(new ErrorHandler("You can only update your own account", 401));
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            }, 
            {new: true}
        )
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}

