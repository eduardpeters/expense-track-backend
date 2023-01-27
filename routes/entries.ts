import express from "express";
import entriesController from "../controllers/entriesController";
import checkBudgetAuthorization from "../middleware/checkBudgetAuthorization";

const router = express.Router();

router.get("/:budgetId", checkBudgetAuthorization, entriesController.getAll);
router.post("/", entriesController.add);

export default router;