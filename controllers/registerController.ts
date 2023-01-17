import {Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

async function register(req: Request, res: Response) {
    const newUser = req.body;
    const takenUsername = await User.findOne({username: newUser.name});
    const takenEmail = await User.findOne({email: newUser.email});

    if (takenUsername || takenEmail) {
        res.status(400).json({message: "Username or email has already been taken"});
    }
    else {
        newUser.password = await bcrypt.hash(req.body.password, 10);
    
        const dbUser = new User({
            username: newUser.username.toLowerCase(),
            email: newUser.email.toLowerCase(),
            password: newUser.password
        });
        dbUser.save();
        res.status(200).json({message: "Success"});
    }
}

export default { register };