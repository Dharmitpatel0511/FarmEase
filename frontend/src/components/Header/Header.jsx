import logo from  '../../assets/logo.png'
import {NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../features/loginSlicer.js'
import axios from 'axios'

const Header = () => {
    const isLogin = useSelector((state) => state.login.isLogin)
    const user = useSelector((state) => state.login.user)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const dispatch = useDispatch()
    const logoutHandler = () => {
        setIsProfileOpen(false)
        dispatch(logout())
        console.log('logout button')
        axios.get('http://localhost:8001/user/logout', {
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

    return (
        <>
            <div id="header" className="flex flex-col items-center justify-around w-full h-32 bg-green-300">
                <div id="subheader1" className="h-[60%] flex items-center justify-around w-full border-b-2 border-green-950 p-[1%]">
                    <div className=" flex flex-[4_1_0%] h-full justify-center">
                        <NavLink to="/">
                            <img src={logo} className="h-full object-fill" />
                        </NavLink>
                    </div>
                    <div className="flex h-full flex-[7_1_0%]">
                        <div className="flex-[1_1_0%] h-full flex justify-center items-center">
                            <button><i className="fa fa-search"></i></button>
                        </div>
                        <div className="flex-[7_1_0%] flex items-center justify-center">
                            <input type="text" name="searchbox" id="searchbox" placeholder="search products" className="pl-3 h-[50%] w-full border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500" />
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
                    <div className="flex flex-[4_1_0%] h-full justify-center items-center">
                        {isLogin ? (
                            <div className="h-full w-full flex flex-col">
                                <div onClick={() => { setIsProfileOpen((v) => !v) }} className="pt-4 cursor-pointer px-4 rounded-full h-[70%] flex justify-center items-center">
                                    <img src={user.avatar} className=" h-[3rem] w-[3rem] rounded-full"></img>
                                </div>
                                <div className={`justify-evenly ml-8 flex flex-col min-h-[25vh] min-w-[3vw] max-w-[15vw] bg-green-900 border-green-950 border-2 rounded-xl z-10 
                                                ${isProfileOpen ? ('') : ('hidden pointer-events-none')}`}>
                                    <div onClick={() => { setIsProfileOpen((v) => !v) }} className="mb-4 cursor-pointer relative self-end top-1 w-6 h-4 text-3xl flex justify-center items-center">×</div>
                                    <div className="cursor-pointer border-b-2 border-b-amber-950">My Profile</div>
                                    <div className="cursor-pointer border-b-2 border-b-amber-950">My Products</div>
                                    <div onClick={logoutHandler} className="cursor-pointer mb-4">Log out</div>
                                </div>
                            </div>
                        ) : (
                            <NavLink to="/auth" className="h-full flex justify-center items-center">
                                <div className="px-4 bg-green-950 text-white rounded-full h-[70%] flex justify-center items-center">
                                    Sign in/Sign up
                                </div>
                            </NavLink>
                        )}
                    </div>
                    <div className="flex flex-[2_1_0%] h-full justify-center items-center">
                        <div className="cursor-pointer px-4 bg-green-950 text-white rounded-full h-[70%] flex justify-center items-center">
                            <img className="h-[70%] object-fill" src="https://img.icons8.com/?size=100&id=21622&format=png&color=FFFFFF" />
                        </div>
                    </div>
                </div>

                <div id="subheader2" className="bg-green-100 h-[40%] flex items-center justify-around w-full p-[1%]">
                    <NavLink to="/" className="flex justify-center items-center flex-[1_1_0%] h-full">
                        <div className="flex justify-center items-center h-full">Home</div>
                    </NavLink>
                    <div className="cursor-pointer flex justify-center items-center flex-[1_1_0%] h-full">About Us</div>
                    <div className="flex justify-center items-center flex-[1_1_0%] h-full">
                        <div className="flex flex-col items-center justify-center h-full">
                            Change Category
                            <select className="px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-1">
                                <option value="all">All</option>
                                <option value="fruit">Fruits</option>
                                <option value="vegetable">Vegetables</option>
                                <option value="dairy">Dairy Products</option>
                                <option value="farmcore">Farm Core</option>
                                <option value="dryfruit">Dryfruits</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-[1_1_0%] h-full">
                        <div className="flex flex-col items-center justify-center h-full">
                            Change Region
                            <select className="px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-1">
                                <option value="all">All</option>
                                <option value="north">Northern India</option>
                                <option value="east">Eastern India</option>
                                <option value="south">Southern India</option>
                                <option value="west">Western India</option>
                                <option value="central">Central India</option>
                                <option value="northeastern">Northeastern India</option>
                            </select>
                        </div>
                    </div>
                    <div className="cursor-pointer flex justify-center items-center flex-[1_1_0%] h-full">Contact Us</div>
                </div>
            </div>
        </>
    )
}

export default Header