import { Request, Response } from "express";
import Budget from "../models/budget";
import { User } from "../types/user"

async function getAll(req: Request, res: Response) {
    const user = (req as Request & {user: User}).user;
    
    const allBudgets = await Budget.find({ users: user.id });
    
    return res.status(200).json(allBudgets);
}

async function add(req: Request, res: Response) {
    const user = (req as Request & {user: User}).user;
    const newBudget = { users: [user.id], ...req.body };
    
    const dbBudget = new Budget({...newBudget});
    dbBudget.save();
    
    return res.status(201).json(newBudget);
}

export default { getAll, add };