import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Product from "../models/product.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";


const createProduct = async (req, res) => {
    try{
        const {name, price, description, category, region, owner} = req.body
        let photo = req.file?.path

        console.log(name, price, description, category, region, owner, photo)

        photo = await uploadOnCloudinary(photo)
        photo = photo?.url
        if (!name || !price || !description || !category || !region) {
            throw new ApiError(400, "Please Fill all the fields")
        }
        if (!photo){
            throw new ApiError(400, "Photo is required")
        }

        const product = await Product.create({
            name, price, description, category, region, photo, owner
        })

        const user = await User.findById(owner)

        console.log(user.products)

        if (user.products){
            user.products = [...user.products, product._id]
        }
        else{
            user.products = [product._id]
        }

        await user.save({validateBeforeSave:false})

        return res
        .status(200)
        .json(
            new ApiResponse(200, "Product successfully created")
        )

    } catch(err){
        return res.status(500).json(err.message)
    }
}


export {createProduct}