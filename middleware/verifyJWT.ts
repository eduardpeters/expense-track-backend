import { Request, Response, RequestHandler, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface User {
    id: string;
    username:  string;
}

function verifyJWT(req: Request & {user: User}, res: Response, next: NextFunction) {
    const token = (req.headers["x-access-token"] as string)?.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET), (error: Error, decoded: User) => {
            if (error) {
                return res.json({
                    isLoggedIn: false,
                    message: "Failed to authenticate"
                });
            }
            req.user = {
                id: decoded.id,
                username: decoded.username
            }
            next();
        }
    }
    else {
        res.json({message: "Incorrect Token Given", isLoggedIn: false});
    }
}

export default verifyJWT;