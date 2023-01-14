import express from "express";
import registerController from "../controllers/registerController";

const router = express.Router();

router.post("/", registerController.register);

export default router;