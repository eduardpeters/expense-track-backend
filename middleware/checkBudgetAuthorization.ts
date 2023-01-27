import { Request, Response, NextFunction } from "express";
import Budget from "../models/budget";
import { User } from "../types/user";

async function checkBudgetAuthorization(req: Request, res: Response, next: NextFunction) {
    const user = (req as Request & {user: User}).user;
    const requestBudget = req.params.budgetId;
    if (requestBudget) {
        try {
            const budgetDocument = await Budget.findById(requestBudget);
            if (budgetDocument && budgetDocument.users) {
                if (budgetDocument.users.includes(user.id)) {
                    (req as Request & {user: User}).user.budgetId = budgetDocument._id;
                    next();
                    return;
                }
            }
            return res.status(401).send("Unable to access resource");
        }
        catch (error) {
            return res.status(500).send("Error ocurred when authorizing budget access");
        }
    }
    else {
        res.status(400).send("No budget reference found");
    }
}

export default checkBudgetAuthorization;