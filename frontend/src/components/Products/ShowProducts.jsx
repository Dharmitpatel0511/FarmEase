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
        <>
            {loading && (
                <>
                <div className="z-[100] opacity-10 top-0 left-0 min-h-[100vh] min-w-[100vw] fixed bg-black" />
                <Loader2 className="z-[100] opacity top-[45vh] left-[45vw] min-h-[10vh] min-w-[10vw] fixed flex justify-center w-10 opacity-100 h-10 animate-spin text-gray-800 " />
                </>
            )}
            <div className="flex min-h-screen bg-gray-100 p-4">
                {/* Sidebar Filter */}
                <div className="w-1/5 bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Filter</h2>
                    <ul className="space-y-2">
                    {categories.map((category, index) => (
                        <li
                        key={index}
                        onClick = {onCatClick}
                        className="cursor-pointer text-gray-600 hover:text-blue-600 transition"
                        >
                        {category}
                        </li>
                    ))}
                    </ul>
                </div>

                {/* Product Grid */}
                <div className="w-4/5 grid grid-cols-3 gap-6 p-4">
                    {products.map((product) => (
                        <ProductBox product = {product}/>
                    ))}
                </div>
                </div>
        </>
    )
}


export default ShowProducts