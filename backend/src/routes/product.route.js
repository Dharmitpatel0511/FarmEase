import {Router} from 'express'
import upload from '../middlewares/multer.middleware.js'
import { createProduct } from '../controllers/product.controller.js'


const productRouter = Router()


productRouter.post('/createproduct', upload.single('photo'), createProduct)


export default productRouter