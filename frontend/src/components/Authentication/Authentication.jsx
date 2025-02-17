import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {login, logout} from '../../features/loginSlicer.js'

const Authentication = () => {
    const [slider, changeSlider] = useState('signin')
    const [regForm, setRegForm] = useState({username: '',email: '', isFarmer: false, password: ''})
    const [logForm, setLogForm] = useState({username: '', password: ''})
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }

    const handleRegChange = (e) => {
        const {name, value} = e.target
        setRegForm({...regForm, [name]:value})
    }

    const handleLogChange = (e) => {
        const {name, value} = e.target
        setLogForm({...logForm, [name]:value})
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        Object.entries(regForm).forEach(([key, value]) => {
            formdata.append(key, value)
        })
        if(file){
            formdata.append("avatar", file)
        }

        await axios.post(`${import.meta.env.VITE_BACKEND_API}/user/create`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
        .then((res) => {
            if(res.status<400){
                console.log('successfully registered')
                console.log(res.data.data)
                dispatch(login(res.data.data))
                navigate('/')
            }
            else{
                console.log('fail to register')
            }
        })
        .catch((err) => {
            console.log('error while registering user', err)
        })

    }
    const loginHandler = async (e) => {
        const loginData = {}
        Object.entries(logForm).forEach(([key, value]) => {
            loginData[key] = value
        })
        e.preventDefault()
        await axios.post(`${import.meta.env.VITE_BACKEND_API}/user/login`,loginData,{
            withCredentials: true
        })
        .then((res) =>  {
            if(res.status<400){
                console.log('successfully logged in')
                console.log(res.data.data)
                dispatch(login(res.data.data))
                navigate('/')
            }
            else {
                console.log('fail to login')
            }
        })
        .catch((err) => {
            console.log("failed to login with axios", err.message)
        })
        .finally(() => {
            console.log('viral dobariya')
        })

    }


    useEffect(() => {
        const signin = document.getElementById('signin')
        const signup = document.getElementById('signup')
        const scroller  = document.getElementById('scroller')
        if(slider==='signin'){
            signin.style.borderBottomWidth = '2px'
            signup.style.borderBottomWidth = '0px'
            scroller.style.transform = 'translateX(0%)'
        }
        else{
            signin.style.borderBottomWidth = '0px'
            signup.style.borderBottomWidth = '2px'
            scroller.style.transform = 'translateX(-100%)'
        }
    }, [slider])
    return (
        <>
            <div className = 'w-full h-[170vh] flex justify-center items-center'>
                <div className = ' bg-emerald-50 overflow-hidden w-[40%] h-[70%] flex flex-col justify-center items-center rounded-xl border-gray-300 border-2'>
                    <div className = ' bg-emerald-100 border-b-2 border-b-gray-300 font-semibold text-lg px-28 pt-4 w-full h-[20%] flex justify-around items-center'>
                        <div id='signin' onClick={() => {changeSlider('signin')}} className='border-b-red-800 flex-1 cursor-pointer flex justify-center items-center transition duration-400'>
                            Sign In
                        </div>
                        <div id='signup' onClick={() => {changeSlider('signup')}} className='border-b-red-800 flex-1 cursor-pointer flex justify-center items-center transition duration-400'>
                            Sign up
                        </div>
                    </div>
                    <div id='scroller' className = ' transition-transform duration-700 ease-in-out w-full h-[80%] flex overflow-visible'>

                        <div className="min-w-[100%] p-6 pt-12">
                            <form onSubmit = {loginHandler} className = 'flex flex-col gap-6'>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username or email address *</label>
                                <input value={logForm.username} onChange={handleLogChange} name='username' type="text" id="username" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Enter your username or email"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password *</label>
                                <input  value={logForm.password} onChange={handleLogChange} name='password' type="password" id="password" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Enter your password"/>
                            </div>
                            <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                LOG IN
                            </button>
                            <p className=" cursor-pointer mt-4 text-sm text-red-500">Lost your password?</p>
                            </form>
                        </div>


                        <div className="min-w-[100%] p-6 pt-2">
                            <form onSubmit = {registerHandler} className = 'pt-4 flex flex-col gap-1'>
                            <div className="mb-4">
                                <label htmlFor="username1" className="block text-sm font-medium text-gray-700">Username*</label>
                                <input  value={regForm.username} onChange={handleRegChange} required name='username' type="text" id="username1" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Enter your username"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address *</label>
                                <input value={regForm.email} onChange={handleRegChange} required name='email' type="text" id="email" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Enter your email"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Profile Picture (optional)</label>
                                <input onChange={handleFileChange} name='avatar' type="file" id="avatar" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"/>
                            </div>
                            <div className="mb-4">
                                <p className = 'text-sm font-medium text-gray-700'>Role</p>
                                <input onChange={handleRegChange} name='isFarmer' value={true} type="radio" id="farmer" className="border"/>
                                <label htmlFor="farmer" className="text-sm font-medium text-gray-700 pl-2 pr-12">Farmer</label>
                                <input onChange={handleRegChange} name='isFarmer' value={false} defaultChecked type="radio" id="consumer" className="border"/>
                                <label htmlFor="consumer" className="text-sm font-medium text-gray-700 pl-2">Consumer</label>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password1" className="block text-sm font-medium text-gray-700">Password *</label>
                                <input value={regForm.password} onChange={handleRegChange} required name='password' type="password" id="password1" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Enter your password"/>
                            </div>
                            <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                Register
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Authentication