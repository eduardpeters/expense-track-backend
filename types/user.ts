import mongoose from "mongoose";

export interface User {
    id: mongoose.Types.ObjectId;
    username: string;
    budgetId?: mongoose.Types.ObjectId;
};