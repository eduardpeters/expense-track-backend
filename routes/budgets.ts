import express from "express";
import budgetsController from "../controllers/budgetsController";

const router = express.Router();

router.get("/", budgetsController.getAll);
router.post("/", budgetsController.add);

export default router;