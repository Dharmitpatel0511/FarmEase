import ProductBox from './ProductBox'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

const ShowProducts = () => {
    const categories = ['All', 'Fruits', 'Vegetables', 'Dairy Products', 'Farm Core', 'Dryfruits']
    const [searchParams] = useSearchParams()
    const [searched, setSearched] = useState(searchParams.get('search'))
    const [category, setCategory] = useState(searchParams.get('category'))
    const [region, setRegion] = useState(searchParams.get('region'))
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setSearched(searchParams.get('search'))
        setCategory(searchParams.get('category'))
        setRegion(searchParams.get('region'))
    }, [searchParams])

    const onCatClick = (e) => {
        let cat = e.target.innerHTML
        setSearched('')
        setCategory(cat)
    }

    useEffect(() => {
        console.log(searched, searchParams)
        setLoading(true)
        if (searched){
            axios.post(`${import.meta.env.VITE_BACKEND_API}/product/searchproduct`, {search: searched}, {
                withCredentials: true
            })
            .then((res) => {
                if (res.status < 400){
                    setProducts(res.data)
                }
                else{
                    console.log('bad request while searching product')
                }
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
                setLoading(false)
            })
        }
        else{
            axios.post(`${import.meta.env.VITE_BACKEND_API}/product/filterproduct`, {category, region}, {
                withCredentials: true
            })
            .then((res) => {
                if (res.status < 400){
                    setProducts(res.data)
                }
                else{
                    console.log('bad request while searching product')
                }
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
                setLoading(false)
            })
        }
    }, [searched, category, region])

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-green-50 to-green-100">
            {/* Loading Overlay */}
            {loading && (
                <>
                    <div className="z-[100] fixed inset-0 bg-black/30 backdrop-blur-sm" />
                    <div className="z-[100] fixed inset-0 flex items-center justify-center">
                        <Loader2 className="w-12 h-12 animate-spin text-green-600" />
                    </div>
                </>
            )}

            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-800 mb-2">Our Products</h1>
                    <p className="text-gray-600">Fresh from the farm to your table</p>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filter */}
                    <div className="w-64 shrink-0">
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg sticky top-24">
                            <h2 className="text-xl font-semibold text-green-800 mb-4">Categories</h2>
                            <div className="space-y-2">
                                {categories.map((cat, index) => (
                                    <button
                                        key={index}
                                        onClick={onCatClick}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                                            category === cat 
                                                ? 'bg-green-100 text-green-700 font-medium'
                                                : 'hover:bg-green-50 text-gray-600'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product, index) => (
                                    <ProductBox key={index} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white/80 backdrop-blur-sm rounded-2xl p-8">
                                <svg
                                    className="w-16 h-16 text-gray-400 mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
                                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowProducts