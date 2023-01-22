import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    budget: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    account: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;