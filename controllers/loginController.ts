import {Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

async function login(req: Request, res: Response) {
    const userLoggingIn = req.body;

    User.findOne({username: userLoggingIn.username})
        .then(dbUser => {
            if (!dbUser) {
                return res.status(401).json({
                    message: "Invalid username or password"
                });
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        const payload = {
                            id: dbUser._id,
                            username: dbUser.username
                        }
                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {expiresIn: 86400},
                            (error, token) => {
                                if (error) {
                                    return res.json({message: error});
                                }
                                return res.status(200).json({
                                    message: "Sucess",
                                    token: "Bearer " + token
                                });
                            }
                        );
                    }
                    else {
                        return res.status(401).json({
                            message: "Invalid username or password"
                        });
                    }
                });
        });
}

export default { login };