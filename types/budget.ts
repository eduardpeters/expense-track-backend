import mongoose from "mongoose";

export interface Budget {
    id?: mongoose.Types.ObjectId;
    title: string;
    users: mongoose.Types.ObjectId[];
    accounts: string[]
};