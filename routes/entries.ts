import express from "express";
import entriesController from "../controllers/entriesController";
import checkBudgetAuthorization from "../middleware/checkBudgetAuthorization";

const router = express.Router();

router.get("/", checkBudgetAuthorization,entriesController.getAll);
router.post("/", checkBudgetAuthorization,entriesController.add);

export default router;