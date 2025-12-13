import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, max: 300 },
    price: { type: Number, required: true },   
    oldPrice: { type: Number, default: null },
    category: { type: String, required: true },     
    brand: { type: String, required: true },     
    images: {
        main: { type: String, required: true },
       gallery: [{ type: String, required: true }]
    },
    stock: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default Product