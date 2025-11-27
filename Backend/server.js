// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/database.js';

import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js';

dotenv.config({ path: "config/config.env" });

const app = express();

// Middleware - cors and body parser should be before routes
app.use(cors());
app.use(express.json());

// Routes
app.use('/user', userRouter);
app.use('/product', productRouter);

// DB Connection
connectDB();

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});
