import express from 'express'
import { createProduct, getProducts, deleteproduct, updateProduct } from '../controller/productController.js'

const router = express.Router()

router.post("/api", createProduct)
router.get("/api", getProducts)
router.delete("/api", deleteproduct)
router.patch("/api/:id", updateProduct)

export default router