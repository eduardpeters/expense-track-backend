import { Request, Response } from "express";
import Budget from "../models/budget";
import { Budget as BudgetType } from "../types/budget";
import { User } from "../types/user"

async function getAll(req: Request, res: Response) {
    const user = (req as Request & {user: User}).user;
    
    const allBudgets = await Budget.find({ users: user.id });
    
    return res.status(200).json(allBudgets);
}

async function add(req: Request, res: Response) {
    const user = (req as Request & {user: User}).user;
    const newBudget = { users: [user.id], ...req.body };

    if (!checkNewBudgetBody(newBudget)) {
        return res.status(400).json({ message: "Invalid fields or contents" });
    }
    const dbBudget = new Budget({...newBudget});
    dbBudget.save();
    return res.status(201).json(newBudget);
}

function checkNewBudgetBody(newBudget: BudgetType) {
    const requiredFields = ["title", "users", "accounts"];
    const allFields = Object.keys(newBudget).every(key => requiredFields.includes(key));
    if (!allFields) {
        return (false);
    }
    const allContent = requiredFields.every(field => newBudget[field as keyof BudgetType]);
    if (!allContent) {
        return (false);
    }
    return (true);
}

export default { getAll, add };