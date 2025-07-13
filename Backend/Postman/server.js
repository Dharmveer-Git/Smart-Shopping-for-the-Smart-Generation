// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js'; // renamed for clarity
import router from './routes/userlogin.js';
import productRouter from './routes/productRoutes.js';

dotenv.config({ path: "config/config.env" });

const app = express();

app.use(express.json());

// Routes
app.use('/user', router);
app.use('/product', productRouter);

// Custom Middleware
const validateUser = (req, res, next) => {
  if (!req.body.user) {
    return res.status(200).json({ error: "User is required" });
  }
  next();
};

app.get('/user', validateUser, (req, res) => {
  res.json({ message: "User Registered Successfully!", data: req.body });
});

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
