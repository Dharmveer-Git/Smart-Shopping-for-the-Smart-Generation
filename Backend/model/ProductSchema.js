import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true, trim: true },
  brand: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  description: { type: String },
  price: { type: Number, required: true, index: true },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0, index: true },
  numReviews: { type: Number, default: 0 },
  image: { type: String },
  colors: [String],
  sizes: [String],
}, {
  timestamps: true
});

// Compound index for common filter queries
productSchema.index({ category: 1, brand: 1 });
productSchema.index({ category: 1, price: 1 });

const productModel = mongoose.model('productModel', productSchema);

export default productModel;