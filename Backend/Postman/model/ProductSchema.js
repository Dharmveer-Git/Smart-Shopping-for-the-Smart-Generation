import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true, trim: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  image: { type: String },
  colors: [String],
  sizes: [String],
}, {
  timestamps: true
});

  const productModel = mongoose.model('productModel', productSchema);

  export default productModel

