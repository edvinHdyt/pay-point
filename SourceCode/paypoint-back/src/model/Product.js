import mongoose from "mongoose";

const Product = mongoose.model("Product", {
    product_name: {
        type:String,
        max: 100,
        required: true
    },
    product_image: {
        type: String,
        max: 255,
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
    created_at: {
        type: Date,
        required: true
    },
    modified_by: {
        type:String,
        max: 100,
        required: true
    },
    id_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

export default Product;