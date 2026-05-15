import mongoose from "mongoose";

const Category = mongoose.model("Categories", {
    category: {
        type: String,
        max: 50,
        required: true
    },
    created_at: {
        type: date,
        required: true
    },
    modified_by: {
        type: String,
        max: 50,
        required: true
    }
});

export default Category;