import { createBrowserRouter,createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import {useEffect} from 'react'
import Home from './components/Home/Home.jsx'
import Layout from './Layout.jsx'
import Cart from './components/Cart/Cart.jsx'
import Authentication from './components/Authentication/Authentication.jsx'
import axios from 'axios'
import { useDispatch,useSelector } from "react-redux"
import { login } from "./features/loginSlicer.js"
import { ChatBox1, ChatBox2, ChatBox3, ChatBox4, ChatBox5, ChatBox6, ChatBox7, ChatBox8 } from "./components/Home/ChatBoxes.jsx"
import {io} from 'socket.io-client'
import CreateProduct from "./components/Products/CreateProduct.jsx"
import ShowProducts from "./components/Products/ShowProducts.jsx"
import AboutUs from "./components/Footer/AboutUs.jsx"
import Profile from "./components/Header/Profile.jsx"


export const socket = io(import.meta.env.VITE_BACKEND_API)

const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/auth' element={<Authentication/>}></Route>
          <Route path='/chatbox1' element={<ChatBox1/>}></Route>
          <Route path='/chatbox2' element={<ChatBox2/>}></Route>
          <Route path='/chatbox3' element={<ChatBox3/>}></Route>
          <Route path='/chatbox4' element={<ChatBox4/>}></Route>
          <Route path='/chatbox5' element={<ChatBox5/>}></Route>
          <Route path='/chatbox6' element={<ChatBox6/>}></Route>
          <Route path='/chatbox7' element={<ChatBox7/>}></Route>
          <Route path='/chatbox8' element={<ChatBox8/>}></Route>
          <Route path='/addproduct' element={<CreateProduct />}></Route>
          <Route path='/showproducts' element={<ShowProducts/>}></Route>
          <Route path='/aboutus' element={<AboutUs/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Route>
      </>
    )
)



const App = () => {
    console.log(import.meta.env)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/user/getuser`, {
              withCredentials: true,
            });
            
            if (res.status < 400) {
              console.log("Redux has logged-in user");
              console.log(`${import.meta.env.VITE_BACKEND_API}/user/getuser`)
              console.log(res.data.data)
              if (res.data.data){
                dispatch(login(res.data.data))
              }
              
            } else {
              console.log("Redux has not logged-in user");
            }
          } catch (err) {
            console.log("Axios error while fetching user");
            console.log(err.message);
          }
        };
      
        fetchUser(); // Calling the async function
      }, []);


    return (
        <>
            <RouterProvider router = {router} />
        </>
    )
}


export default App