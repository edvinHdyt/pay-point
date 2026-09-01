import mongoose from "mongoose";
import {Category, categorySchema} from "./Category.js";

const productSchema = new mongoose.Schema({
    product_name: {
        type:String,
        max: 100,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    desc_product: {
        type: String,
        max: 255, 
        required: true
    },
    
    image: {
        image_id: {
            type: String,
            max: 100,
            required: true
        },
        image_url: {
            type: String,
            max: 255,
            required: true
        },
        image_name: {
            type: String,
            max: 255,
            required: true
        }
    },
    created_at: {
        type: Date,
        required: true
    },
    modified_by: {
        type:String,
        max: 100,
        required: true
    },
    category: {
        _id: {
            type: mongoose.Schema.Types.ObjectId, // Tipe data asli ID dari MongoDB
            required: true
        },
        category: {
            type: String,
            max: 50,
            required: true
        },
    },
    price_range_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Product = new mongoose.model("Product", productSchema)
export {productSchema, Product};