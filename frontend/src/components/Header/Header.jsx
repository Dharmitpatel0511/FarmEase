import logo from  '../../assets/logo.png'
import {NavLink,Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useState, useRef, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../features/loginSlicer.js'
import axios from 'axios'
// import tempimg from "../../assets/aboutus.jpg"
const Header = () => {
    const isLogin = useSelector((state) => state.login.isLogin)
    const user = useSelector((state) => state.login.user)
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [search, setSearch] = useState('')
    const [searchPopup, setSearchPopup]  = useState(false)
    const menuRef = useRef(null)
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

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                
                setIsProfileOpen(false);
            }
            const dotsMenu = document.querySelector('.dots-menu');
            if (dotsMenu && !dotsMenu.contains(event.target) && !event.target.closest('.dots-button')) {
                setIsDotsOpen(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
        setSearch('');
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
            <div id="header" className="relative z-20 flex flex-col items-center justify-around w-full h-20 bg-green-50/85 backdrop-blur-sm">
                <div id="subheader1" className="z-10 h-full flex items-center justify-around w-full border-b border-green-950 p-[1%]">
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
                            }} onChange={(e) => setSearch(e.target.value)} name="searchbox" id="searchbox" placeholder="search products" className="pl-3 h-[50%] w-full border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>
                    </div>
                    <div className=" flex flex-[3_1_0%] h-full justify-center items-center">
                        <NavLink to="/cart" className="h-full flex justify-center items-center">
                            {/* <div className="px-4 bg-green-950 text-white rounded-full h-[70%] flex gap-2 justify-center items-center">
                                <img className="h-[70%] object-fill" src="https://img.icons8.com/?size=100&id=9671&format=png&color=FFFFFF" />
                                Cart
                            </div> */}
                            <button
  class="cursor-pointer bg-gradient-to-b from-green-700 to-green-800 px-6 py-3 rounded-full border-[1px] border-green-900 text-white font-medium group"
>
  <div class="relative overflow-hidden">
    <p
      class="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]"
    >
      Cart 🛒
    </p>
    <p
      class="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]"
    >
      Cart 🛒
    </p>
  </div>
</button>


                        </NavLink>
                    </div>

                    <div className=" flex flex-[4_1_0%] h-full justify-center items-center relative">
                        {isLogin ? (
                            <>
                            {/* Profile Avatar */}
                            <div className="z-100 relative" ref={menuRef}>
                                <div
                                onClick={() => setIsProfileOpen((v) => !v)}
                                className="z-50 min-w-[8vw] cursor-pointer flex justify-center items-center"
                                >
                                    <img
                                        src={user.avatar}
                                        // src={tempimg}
                                        className="h-12 w-12 rounded-full border-2 border-green-800 hover:opacity-80 transition"
                                        alt="Profile"
                                    />
                                </div>

                                {/* Profile Dropdown */}
                                <div
                                className={`w-36 absolute right-0 mt-2 bg-green-900 border-green-950 border-2 rounded-xl shadow-md transition-all 
                                    ${isProfileOpen ? "opacity-100 visible z-20" : "opacity-0 invisible pointer-events-none"}`}
                                >
                                    <div
                                        onClick={() => setIsProfileOpen(false)}
                                        className="cursor-pointer text-white text-xl font-bold p-2 text-right"
                                    >
                                        ×
                                    </div>
                                    <div onClick={(e) => {
                                        setIsProfileOpen(false)
                                        navigate(`/profile?username=${encodeURIComponent(user.username)}`)
                                    }} className=" cursor-pointer text-white px-6 py-2 border-b border-amber-950 hover:bg-green-800">
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
                            {user.isFarmer && <Link to="/addproduct" className="">
                                {/* <div className="rounded-full bg-green-950 px-6 py-2 text-white text-center hover:bg-green-800 transition">
                                Add Products
                                </div> */}
                                <button
  class="relative flex items-center px-8 py-3 w-auto min-w-[150px] overflow-hidden font-medium transition-all bg-green-700 rounded-full border-2 border-green-900 group"
>
  <span
    class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-900 rounded-full group-hover:-mr-4 group-hover:-mt-4"
  >
    <span
      class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
    ></span>
  </span>
  <span
    class="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-900 rounded-full group-hover:-ml-4 group-hover:-mb-4"
  >
    <span
      class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
    ></span>
  </span>
  <span
    class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-green-800 rounded-full group-hover:translate-x-0"
  ></span>
  <span
    class="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-white"
  >
    Add Products
  </span>
</button>

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

                    

                    {/* <div className="flex flex-[2_1_0%] h-full justify-center items-center">
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
                                <div onClick={() => setIsDotsOpen(false)} className="cursor-pointer text-white px-6 py-2 border-b border-amber-950 hover:bg-green-800">
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
                    </div> */}

                     <div className="flex flex-auto h-full justify-center items-center">
                        <div onClick={(e) => setIsDotsOpen(!isDotsOpen)} className="dots-button cursor-pointer px-4 bg-green-950 text-white rounded-full w-14 h-[70%] flex justify-center items-center">
                           {
                                isDotsOpen ?(
                                    <span className="text-2xl font-bold">×</span>
                                ) :(
                                    
                                    <img className="h-[70%] object-fill" src="https://img.icons8.com/?size=100&id=21622&format=png&color=FFFFFF" />
                                )
                           }
                           
                        </div>
                        <div
                            className={` dots-menu w-36 absolute right-12 mt-24 bg-green-900 border-green-950 border-2 rounded-xl shadow-md transition-all  
                                ${isDotsOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
                        >
                                <NavLink to='/usersearch'>
                                <div onClick={() => setIsDotsOpen(false)} className="cursor-pointer text-white px-6 py-2 border-b border-amber-950 hover:bg-green-800  rounded-xl">
                                    Search User
                                </div>
                                </NavLink>
                        </div>
                    </div>

                </div>
                </div>

                <div id="subheader2" className="sticky top-0 z-10  bg-green-50/85 backdrop-blur-sm h-14 flex items-center justify-around w-full p-[1%] shadow-xl rounded-b-3xl">
                    <NavLink to="/" className="flex justify-center items-center flex-[1_1_0%] h-full">
                        <div className="flex justify-center items-center h-full">Home</div>
                    </NavLink>
                    <div onClick={onAboutUs} className="cursor-pointer flex justify-center items-center flex-[1_1_0%] h-full">About Us</div>
                    <div className="flex justify-center items-center flex-[1_1_0%] h-full">
                        <div className="flex flex-col items-center justify-center h-full">
                            
                            <select value={category} onChange = {(e) => {
                                setCategory(e.target.value)
                            }} className="px-3 py-1.5 bg-white/90 border border-green-300 rounded-lg shadow-md 
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
    hover:border-green-400 transition-all duration-200 
    text-gray-700 font-medium cursor-pointer mb-1">
                                <option value="See Options" disabled >Change Category</option>
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
                            
                            <select value={region} onChange = {(e) => {
                                setRegion(e.target.value)
                            }} className="px-3 py-1.5 bg-white/90 border border-green-300 rounded-lg shadow-md 
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
    hover:border-green-400 transition-all duration-200 
    text-gray-700 font-medium cursor-pointer mb-1">
                                <option value="See Options" disabled>Change Region</option>
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


            
            
        </>
    )
}

export default Header