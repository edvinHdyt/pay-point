import mongoose, { Mongoose } from "mongoose";

const cartSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId
    },
    product: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            max: 100,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            max: 50,
            required: true
        },
        image: {
            image_url: {
                type: String,
                max: 255,
                required: true
            },
            image_name: {
                type: String,
                max: 50,
                required: true
            }
        }
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Cart = new mongoose.model("Cart", cartSchema);

export default Cart;