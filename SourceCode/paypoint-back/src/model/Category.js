import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        max: 50,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    modified_by: {
        type: String,
        max: 50,
        required: true
    }
});

const Category = new mongoose.model("Category", categorySchema);

export {Category, categorySchema};