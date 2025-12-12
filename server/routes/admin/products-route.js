import { addProduct, deleteProduct, getProducts, handleImageUpload, updateProduct } from "../../controllers/admin/product-controller.js";
import {upload} from "../../helpers/cloudinary-helper.js"
import express from "express"
const productRouter = express.Router()
// productRouter.post('/upload-image',upload.single("my_file"), (req, res, next) => {
//     console.log("Multer passed, file:", req.file);
//     next();
//   },handleImageUpload)
productRouter.post('/upload-image',upload.single("my_file"),handleImageUpload)
productRouter.post('/add-product',addProduct)
productRouter.put('/update-product/:id',updateProduct)
productRouter.get('/get-products',getProducts)
productRouter.delete('/delete-product/:id',deleteProduct)
export default productRouter