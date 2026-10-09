import mongoose, { Types } from "mongoose";


const orderSchema = new mongoose.Schema({
    id_user: {
        Types: mongoose.Schema.Types.ObjectId
    },
    payment_type: {
        type: String,
        max: 10,
        required: true
    },
    customer_name: {
        type: String,
        max: 50,
        required: true
    },
    order_date: {
        type: Date,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    total_payment: {
        type: Number,
        required: true
    },
    cashback: {
        type: Number,
        required: true
    },
    product: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        enum: ["Belum Dibayar", "Terbayar"],
        default: "Belum Dibayar"
    },
    modified_by: {
        type: String,
        max: 50,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
});

const Order = new mongoose.model("Order", orderSchema);

export default Order;