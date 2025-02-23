import logo from  '../../assets/logo.png'
import {NavLink,Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useState, useRef, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../features/loginSlicer.js'
import axios from 'axios'

const Header = () => {
    const isLogin = useSelector((state) => state.login.isLogin)
    const user = useSelector((state) => state.login.user)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [searchPopup, setSearchPopup]  = useState(false)
    const menuRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [category, setCategory] = useState('See Options')
    const [region, setRegion] = useState('See Options')
    const [isDotsOpen, setIsDotsOpen] = useState(false)

    useEffect(() => {
        if (category==='See Options' && region==='See Options') return;
        if (category==='See Options') setCategory('All');
        if (region==='See Options') setRegion('All');
        navigate(`/showproducts?search=${encodeURIComponent('')}&category=${encodeURIComponent(category)}&region=${encodeURIComponent(region)}`)
    }, [category, region])

    const logoutHandler = () => {
        setIsProfileOpen(false)
        dispatch(logout())
        axios.get(`${import.meta.env.VITE_BACKEND_API}/user/logout`, {
            withCredentials: true
        })
        .then((res) => {
            console.log('logout',res)
        })
        .catch((err) => {
            console.log('cannot logout', err.message)
        })
        .finally(() => {
            console.log("something happend to logout handler")
        })
    }

    const onContactUs = (e) => {
        let footer = document.querySelector('#footer')
        footer.scrollIntoView({behavior: 'smooth'})
    }

    const onAboutUs = (e) => {
        navigate('/aboutus')
    }

    const searchHandler = (e) => {
        let searched = search
        if (!searched) {
            setSearchPopup(true)
            return
        }
        navigate(`/showproducts?search=${encodeURIComponent(searched)}&category=${encodeURIComponent('All')}&region=${encodeURIComponent('All')}`)
    }

    return (
        <>
            {searchPopup && (
                <div className="z-50 fixed inset-0 flex justify-center h-48">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center mt-8">
                    <h2 className="text-xl font-bold mb-2">Empty Search</h2>
                    <p className="mb-4">Please type something before searching</p>
                    <button
                    onClick={() => setSearchPopup(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                    Close
                    </button>
                </div>
                </div>
            )}
            <div id="header" className="flex flex-col items-center justify-around w-full h-32 bg-green-300">
                <div id="subheader1" className="h-[60%] flex items-center justify-around w-full border-b-2 border-green-950 p-[1%]">
                    <div className=" flex flex-[4_1_0%] h-full justify-center">
                        <NavLink to="/">
                            <img src={logo} className="h-full object-fill" />
                        </NavLink>
                    </div>
                    <div className="flex h-full flex-[7_1_0%]">
                        <div className="flex-[1_1_0%] h-full flex justify-center items-center">
                            <button onClick = {searchHandler}><i className="fa fa-search"></i></button>
                        </div>
                        <div className="flex-[7_1_0%] flex items-center justify-center">
                            <input type="text" value={search} onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    searchHandler(e)
                                }
                            }} onChange={(e) => setSearch(e.target.value)} name="searchbox" id="searchbox" placeholder="search products" className="pl-3 h-[50%] w-full border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>
                    </div>
                    <div className="flex flex-[3_1_0%] h-full justify-center items-center">
                        <NavLink to="/cart" className="h-full flex justify-center items-center">
                            <div className="px-4 bg-green-950 text-white rounded-full h-[70%] flex gap-2 justify-center items-center">
                                <img className="h-[70%] object-fill" src="https://img.icons8.com/?size=100&id=9671&format=png&color=FFFFFF" />
                                Cart
                            </div>
                        </NavLink>
                    </div>

                    <div className=" flex flex-[4_1_0%] h-full justify-center items-center relative">
                        {isLogin ? (
                            <>
                            {/* Profile Avatar */}
                            <div className="relative" ref={menuRef}>
                                <div
                                onClick={() => setIsProfileOpen((v) => !v)}
                                className=" min-w-[8vw] cursor-pointer flex justify-center items-center"
                                >
                                <img
                                    src={user.avatar}
                                    className="h-12 w-12 rounded-full border-2 border-green-800 hover:opacity-80 transition"
                                    alt="Profile"
                                />
                                </div>

                                {/* Profile Dropdown */}
                                <div
                                className={`z-10 w-36 absolute right-0 mt-2 bg-green-900 border-green-950 border-2 rounded-xl shadow-md transition-all 
                                    ${isProfileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
                                >
                                <div
                                    onClick={() => setIsProfileOpen(false)}
                                    className="cursor-pointer text-white text-xl font-bold p-2 text-right"
                                >
                                    ×
                                </div>
                                <div onClick={(e) => {
                                    navigate(`/profile?username=${encodeURIComponent(user.username)}`)
                                }} className="cursor-pointer text-white px-6 py-2 border-b border-amber-950 hover:bg-green-800">
                                    My Profile
                                </div>
                                <div
                                    onClick={logoutHandler}
                                    className="cursor-pointer text-white px-6 py-2 hover:bg-red-800 rounded-b-xl"
                                >
                                    Log out
                                </div>
                                </div>
                            </div>

                            {/* Add Products Button */}
                            {user.isFarmer && <Link to="/addproduct" className="ml-8">
                                <div className="rounded-full bg-green-950 px-6 py-2 text-white text-center hover:bg-green-800 transition">
                                Add Products
                                </div>
                            </Link>}
                            </> 
                        ) : (
                            <NavLink to="/auth" className="h-full flex justify-center items-center">
                                <div className="px-4 bg-green-950 text-white rounded-full h-[70%] flex justify-center items-center">
                                    Sign in/Sign up
                                </div>
                            </NavLink>
                        )}
                    </div>

                    <div className="flex flex-[2_1_0%] h-full justify-center items-center">
                        <div onClick={(e) => setIsDotsOpen(true)} className="cursor-pointer px-4 bg-green-950 text-white rounded-full h-[70%] flex justify-center items-center">
                            <img className="h-[70%] object-fill" src="https://img.icons8.com/?size=100&id=21622&format=png&color=FFFFFF" />
                        </div>
                            <div
                                className={`z-10 w-36 absolute right-12 mt-56 bg-green-900 border-green-950 border-2 rounded-xl shadow-md transition-all 
                                    ${isDotsOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
                                >
                                <div
                                    onClick={() => setIsDotsOpen(false)}
                                    className="cursor-pointer text-white text-xl font-bold p-2 text-right"
                                >
                                    ×
                                </div>
                                <NavLink to='/usersearch'>
                                <div className="cursor-pointer text-white px-6 py-2 border-b border-amber-950 hover:bg-green-800">
                                    Search User
                                </div>
                                </NavLink>
                                <div className="cursor-pointer text-white px-6 py-2 border-b border-amber-950 hover:bg-green-800">
                                    Coming...
                                </div>
                                <div
                                    className="cursor-pointer text-white px-6 py-2 hover:bg-red-800 rounded-b-xl"
                                >
                                    Coming...
                            </div>
                        </div>
                    </div>
                </div>

                <div id="subheader2" className="bg-green-100 h-[40%] flex items-center justify-around w-full p-[1%]">
                    <NavLink to="/" className="flex justify-center items-center flex-[1_1_0%] h-full">
                        <div className="flex justify-center items-center h-full">Home</div>
                    </NavLink>
                    <div onClick={onAboutUs} className="cursor-pointer flex justify-center items-center flex-[1_1_0%] h-full">About Us</div>
                    <div className="flex justify-center items-center flex-[1_1_0%] h-full">
                        <div className="flex flex-col items-center justify-center h-full">
                            Change Category
                            <select value={category} onChange = {(e) => {
                                setCategory(e.target.value)
                            }} className="px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-1">
                                <option value="See Options">See Options</option>
                                <option value="All">All</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="Dairy Products">Dairy Products</option>
                                <option value="Farm Core">Farm Core</option>
                                <option value="Dryfruits">Dryfruits</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-[1_1_0%] h-full">
                        <div className="flex flex-col items-center justify-center h-full">
                            Change Region
                            <select value={region} onChange = {(e) => {
                                setRegion(e.target.value)
                            }} className="px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-1">
                                <option value="See Options">See Options</option>
                                <option value="All">All</option>
                                <option value="Northern India">Northern India</option>
                                <option value="Eastern India">Eastern India</option>
                                <option value="Southern India">Southern India</option>
                                <option value="Western India">Western India</option>
                                <option value="Central India">Central India</option>
                                <option value="Northeastern India">Northeastern India</option>
                            </select>
                        </div>
                    </div>
                    <div onClick = {onContactUs} className="cursor-pointer flex justify-center items-center flex-[1_1_0%] h-full">Contact Us</div>
                </div>
            </div>
        </>
    )
}

export default Header