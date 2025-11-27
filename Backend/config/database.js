// database.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "config/config.env" });

const connectDB = async () => {
  try {
    // Removed deprecated options useNewUrlParser and useUnifiedTopology
    // These options are no longer needed in MongoDB Node.js driver 4.0+
    await mongoose.connect(process.env.DB_STRING);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
