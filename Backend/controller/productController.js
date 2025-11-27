import productModel from "../model/ProductSchema.js";
import mongoose from "mongoose";

// Create product
const createProduct = async (req, res) => {
    try {
        const { title, brand, category, description, price, stock, rating, numReviews, image, colors, sizes } = req.body;
        
        const product = await productModel.create({ title, brand, category, description, price, stock, rating, numReviews, image, colors, sizes });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get products with pagination
const getProducts = async (req, res) => {
    try {
        // Pagination with validation to prevent DoS
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
        const skip = (page - 1) * limit;

        const products = await productModel.find()
            .skip(skip)
            .limit(limit)
            .lean(); // Use lean() for better read performance

        const total = await productModel.countDocuments();

        res.status(200).json({
            products,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalProducts: total
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete product
const deleteproduct = async (req, res, next) => {
    try {
        const { _id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID format" });
        }
        
        const product = await productModel.deleteOne({ _id });
        res.status(200).json({ success: true, _id });
        
    } catch (error) {
        next(error);
    }
};

// Update product
// Note: Schema validation limits fields that can be updated
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Only allow updating specific fields to prevent mass assignment
    const { title, brand, category, description, price, stock, rating, numReviews, image, colors, sizes } = req.body;
    const updateData = { title, brand, category, description, price, stock, rating, numReviews, image, colors, sizes };
    
    // Remove undefined values
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
    
    const updated = await productModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createProduct, getProducts, deleteproduct, updateProduct };