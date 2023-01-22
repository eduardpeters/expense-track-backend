import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import entriesController from "../controllers/entriesController";
import checkBudgetAuthorization from "../middleware/checkBudgetAuthorization";

const router = express.Router();

router.get("/", verifyJWT, checkBudgetAuthorization,entriesController.getAll);
router.post("/", verifyJWT, checkBudgetAuthorization,entriesController.add);

export default router;