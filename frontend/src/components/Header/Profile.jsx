// import { useSearchParams } from 'react-router-dom'
// import {useState, useEffect} from 'react'
// import axios from 'axios'


// const Profile = () => {
//     const [searchParams] = useSearchParams()
//     const username = searchParams.get('username')
//     const [user, setUser] = useState({
//         username: 'none',
//         avatar:'',
//         isFarmer: false,
//         products: [],
//         email: 'none'
//     })

//     useEffect(() => {
//         axios.post(`${import.meta.env.VITE_BACKEND_API}/user/searchuser`, {username})
//         .then((res) => {
//             if (res.status<400){
//                 if (!res.data.user) return
//                 setUser(res.data.user)
//                 console.log(user.products)
//             }
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     }, [username])

//     return (
//         <div className="flex flex-col items-center min-h-screen bg-[#31352E] p-6 w-full">
//         <div className="bg-[#EBEBE8] shadow-lg rounded-xl w-full max-w-4xl p-6 text-center">
//             <div className="flex flex-col items-center">
//             <img
//                 className="w-40 h-40 rounded-full border-4 border-green-500"
//                 src={user.avatar}
//                 alt="Profile"
//             />
//             <div className="mt-4">
//                 <h2 className="text-3xl font-bold">Username :  {user.username}</h2>
//                 <p className="text-gray-600 text-lg">Email :  {user.email}</p>
//             </div>
//             </div>
//         </div>

//         <div className="bg-[#EBEBE8] shadow-lg rounded-xl w-full max-w-4xl p-6 mt-6">
//             <h3 className="text-2xl font-semibold mb-2">About Me</h3>
//             <p className="text-gray-700 text-lg">
//             Welcome to my profile!
//             </p>
//         </div>
//         {user.isFarmer && (
//             <div className="bg-[#EBEBE8] shadow-lg rounded-xl w-full max-w-4xl p-6 mt-6">
//             <h3 className="text-2xl font-semibold mb-2 text-center">
//                 Your Listings
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
//             {user.products.length > 0 ? (
//                 user.products.map((product) => (
//                 <div
//                     key={product._id}
//                     className="p-4 bg-gray-200 rounded-lg shadow w-full"
//                 >
//                     <img
//                     className="w-full h-48 object-cover rounded"
//                     src={product.photo}
//                     alt={product.name}
//                     />
//                     <h4 className="font-semibold mt-2 text-xl">{product.name}</h4>
//                     <p className="text-green-600 font-bold text-lg">₹{product.price}</p>
//                     <p className="text-gray-700 text-md">{product.description}</p>
//                     <p className="text-gray-500 text-sm">
//                     Category: {product.category} | Region: {product.region}
//                     </p>
//                 </div>
//                 ))
//             ) : (
//                 <p className="text-center text-gray-500">No products listed.</p>
//             )}
//             </div>
//             </div>
//         )}
//         </div>
//     )
// }

// export default Profile


import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Profile = () => { // Pass logged-in user as a prop
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const username = searchParams.get('username')
    const curuser = useSelector((state) => state.login.user) || {username: '', email: '', avatar: '#'}
    const isLogin =  useSelector((state) => state.login.isLogin)
    const [user, setUser] = useState({
        username: 'none',
        avatar: '',
        isFarmer: false,
        products: [],
        email: 'none'
    })

    useEffect(() => {
        if (!isLogin){
            navigate('/')
        }
        axios.post(`${import.meta.env.VITE_BACKEND_API}/user/searchuser`, { username })
            .then((res) => {
                if (res.status < 400) {
                    if (!res.data.user) return
                    setUser(res.data.user)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [username])

    const handleSendMessage = () => {
        console.log(`Sending message to ${user.username}`)
        navigate(`/chat?with=${encodeURIComponent(user.username)}`)
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#31352E] p-6 w-full">
            <div className="bg-[#EBEBE8] shadow-lg rounded-xl w-full max-w-4xl p-6 text-center">
                <div className="flex flex-col items-center">
                    <img
                        className="w-40 h-40 rounded-full border-4 border-green-500"
                        src={user.avatar}
                        alt="Profile"
                    />
                    <div className="mt-4">
                        <h2 className="text-3xl font-bold">Username: {user.username}</h2>
                        <p className="text-gray-600 text-lg">Email: {user.email}</p>
                    </div>
                    
                    {/* Send Message Button (Only if NOT current user) */}
                    {curuser.username !== user.username && (
                        <button
                            onClick={handleSendMessage}
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Send Message
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-[#EBEBE8] shadow-lg rounded-xl w-full max-w-4xl p-6 mt-6">
                <h3 className="text-2xl font-semibold mb-2">About Me</h3>
                <p className="text-gray-700 text-lg">
                    Welcome to my profile!
                </p>
            </div>

            {user.isFarmer && (
                <div className="bg-[#EBEBE8] shadow-lg rounded-xl w-full max-w-4xl p-6 mt-6">
                    <h3 className="text-2xl font-semibold mb-2 text-center">
                        Your Listings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {user.products.length > 0 ? (
                            user.products.map((product) => (
                                <div
                                    key={product._id}
                                    className="p-4 bg-gray-200 rounded-lg shadow w-full"
                                >
                                    <img
                                        className="w-full h-48 object-cover rounded"
                                        src={product.photo}
                                        alt={product.name}
                                    />
                                    <h4 className="font-semibold mt-2 text-xl">{product.name}</h4>
                                    <p className="text-green-600 font-bold text-lg">₹{product.price}</p>
                                    <p className="text-gray-700 text-md">{product.description}</p>
                                    <p className="text-gray-500 text-sm">
                                        Category: {product.category} | Region: {product.region}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No products listed.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
