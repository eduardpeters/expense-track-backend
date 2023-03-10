import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types/user";

function verifyJWT(req: Request & { user?: User }, res: Response, next: NextFunction) {
    const token = (req.headers["authorization"] as string)?.split(' ')[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                id: (decoded as User).id,
                username: (decoded as User).username
            }
            next();
        }
        catch (error) {
            return res.status(401).json({
                isLoggedIn: false,
                message: "Failed to authenticate"
            });
        }
    }
    else {
        res.status(401).json({ isLoggedIn: false, message: "Incorrect Token Given" });
    }
}

export default verifyJWT;