import productModel from "../model/ProductSchema.js";
import mongoose from "mongoose";
// cteate  product
const createProduct = async (req, res) => {
    try {
        let { title, brand, category, description, price, stock, rating, numReviews, image, colors, sizes } = req.body;
        
        let product = await productModel.create({ title, brand, category, description, price, stock, rating, numReviews, image, colors, sizes  });

        res.status(201).json(product);
        console.log("Product Created:", product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: error.message });
    }
};
// getproduct
const getProducts = async (req, res) => {
    try {
        let products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



//deleteproduct
const deleteproduct = async (req, res, next) => {
    try {
        let { _id } = req.body;
        console.log("Deleting Product ID:",_id);

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID format" });
        }
        
        let product = await productModel.deleteOne( {_id} );
        res.status(200).json({ success: true, _id });
        
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await productModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {createProduct,getProducts,deleteproduct}