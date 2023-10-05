import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.mernAuthToken;

    if(!token) return next(new ErrorHandler("Unauthenticated user", 401));;

    //verify to return either error or the user
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return next(new ErrorHandler("Token is not valid", 403));

        req.user = user;
        next();
    });
}