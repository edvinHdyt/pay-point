import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
    price_start : {
        type: Number,
        required: true
    },
    price_end : {
        type: Number,
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

const Price = new mongoose.model("Price", priceSchema);

export default Price;