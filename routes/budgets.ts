import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import budgetsController from "../controllers/budgetsController";

const router = express.Router();

router.get("/", verifyJWT, budgetsController.getAll);
router.post("/", verifyJWT, budgetsController.add);

export default router;