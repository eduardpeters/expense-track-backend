import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
    }
});

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;