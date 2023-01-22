import { Request, Response } from "express";
import Entry from "../models/entry";
import { User } from "../types/user";

async function getAll(req: Request, res: Response) {
    const user = (req as Request & {user: User}).user;

    const allEntries = await Entry.find({ budget: user.budgetId });

    return res.status(200).json(allEntries);
}

async function add(req: Request, res: Response) {
    const newEntry = { ...req.body };
    
    const dbEntry = new Entry({...newEntry});
    dbEntry.save();
    
    return res.status(201).json(newEntry);
}

export default { getAll, add };