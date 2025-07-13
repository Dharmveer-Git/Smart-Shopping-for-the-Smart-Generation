import express from 'express'
import { createProduct, getProducts,deleteproduct } from '../controller/productController.js'

const router = express.Router()

router.post("/api",createProduct)

router.get("/api",getProducts)
router.delete("/api",deleteproduct)


export default router