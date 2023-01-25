import { Request, Response } from "express";
import { User } from "../types/user";

async function getUser(req: Request, res: Response) {
    const user = (req as Request & {user: User}).user;

    return res.status(200).json({isLoggedIn: true, username: user.username});
}

export default { getUser };