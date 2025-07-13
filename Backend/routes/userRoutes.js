import express from 'express'
import {getUser,createUser,validateUser,updateUser,deleteUser}  from  '../controller/userController.js';

const router = express.Router()
let checkage = (req, res, next) => {
  let { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: "age not found" });
  }
  next(); // ✅ Add this
};


// global 
// router 
 //✅ Create user (Sign Up)
router.post('/api/create', createUser);

// ✅ Validate user login
router.post('/api/login', validateUser);

// ✅ Get all users or user info (optional use-case)
router.get('/api/users', getUser);

// ✅ Update user by ID
router.patch('/api/users/:id', updateUser);

// ✅ Delete user by ID
router.delete('/api/users/:id', deleteUser);


  export default router 