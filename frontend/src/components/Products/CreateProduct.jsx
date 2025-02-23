import {useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Loader2 } from 'lucide-react'


const CreateProduct = () => {
    const [product, setProduct] = useState({})
    const user = useSelector((state) => state.login.user)
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleProductChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    }

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0])
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = new FormData()
        Object.entries(product).forEach(([key, value]) => {
            data.append(key, value)
        })

        if(photo) {
            data.append('photo', photo)
        }

        data.append('owner', user._id)

        axios.post(`${import.meta.env.VITE_BACKEND_API}/product/createproduct`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
        .then((res) => {
            if (res.status==200){
                console.log('product created successfully')
            }
            else{
                console.log('error while creating product')
            }
            setPhoto(null)
            setProduct({})
            e.target.reset()
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
        
    }
    
    return (
        <>
            {loading && (
                    <>
                    <div className="z-[100] opacity-10 top-0 left-0 min-h-[100vh] min-w-[100vw] fixed bg-black" />
                    <Loader2 className="z-[100] opacity top-[45vh] left-[45vw] min-h-[10vh] min-w-[10vw] fixed flex justify-center w-10 opacity-100 h-10 animate-spin text-gray-800 " />
                    </>
                )}
            <div class="min-h-screen bg-gray-100 flex items-center justify-center py-10">
                <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Sell Your Product</h2>
                    <form onSubmit={submitHandler}>
                    {/* <!-- Product Name --> */}
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                        name='name'
                        onChange={handleProductChange}
                        type="text"
                        id="name"
                        class="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter product name"
                        />
                    </div>

                    {/* <!-- Product Photo --> */}
                    <div class="mb-4">
                        <label for="photo" class="block text-sm font-medium text-gray-700">Upload Product Photo</label>
                        <input
                        name='photo'
                        onChange={handleFileChange}
                        type="file"
                        id="photo"
                        class="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* <!-- Product Price --> */}
                    <div class="mb-4">
                        <label for="price" class="block text-sm font-medium text-gray-700">Price (₹)</label>
                        <input
                        name='price'
                        onChange={handleProductChange}
                        type="number"
                        id="price"
                        class="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter product price"
                        />
                    </div>

                    {/* <!-- Product Description --> */}
                    <div class="mb-4">
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                        name='description'
                        onChange={handleProductChange}
                        id="description"
                        class="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        placeholder="Describe your product"
                        ></textarea>
                    </div>

                    {/* <!-- Category --> */}
                    <div class="mb-4">
                        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                        <select
                        name='category'
                        onChange={handleProductChange}
                        id="category"
                        class="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        >
                        <option value="" disabled selected>Select a category</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Dairy Products">Dairy Products</option>
                        <option value="Farm Core">Farm Core</option>
                        <option value="Dryfruits">Dryfruits</option>
                        </select>
                    </div>

                    {/* <!-- Region --> */}
                    <div class="mb-4">
                        <label for="region" class="block text-sm font-medium text-gray-700">Region</label>
                        <select
                        name='region'
                        onChange={handleProductChange}
                        id="region"
                        class="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        >
                        <option value="" disabled selected>Select a region</option>
                        <option value="Northern India">Northern India</option>
                        <option value="Southern India">Southern India</option>
                        <option value="Eastern India">Eastern India</option>
                        <option value="Western India">Western India</option>
                        <option value="Central India">Central India</option>
                        <option value="Northeastern India">Northeastern India</option>
                        </select>
                    </div>

                    {/* <!-- Submit Button --> */}
                    <div class="mt-6">
                        <button
                        type="submit"
                        class="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        >
                        Submit Product
                        </button>
                    </div>
                    </form>
                </div>
                </div>

        </>
    )
}


export default CreateProduct