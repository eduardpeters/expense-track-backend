import { Request, Response } from "express";
import Entry from "../models/entry";

interface User {
    id: string;
    username: string;
}

async function getAll(req: Request, res: Response) {
    const user = (req as Request & {user: User}).user;

    const allEntries = await Entry.find({ user: user.id });

    return res.status(200).json(allEntries);
}

async function add(req: Request, res: Response) {
    const user = (req as Request & {user: User}).user;
    const newEntry = { user: user.id, ...req.body };

    const dbEntry = new Entry({...newEntry});
    dbEntry.save();
    return res.status(201).json(newEntry);
}

export default { getAll, add };