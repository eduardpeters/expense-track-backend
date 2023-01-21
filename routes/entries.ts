import express, { Request, Response } from "express";
import verifyJWT from "../middleware/verifyJWT";
import entriesController from "../controllers/entriesController";

const router = express.Router();

router.get("/", verifyJWT, entriesController.getAll);
router.post("/", verifyJWT, entriesController.add);

export default router;