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

export const socket = io('http://localhost:8001/')

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
        </Route>
      </>
    )
)



const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await axios.get("http://localhost:8001/user/getuser", {
              withCredentials: true,
            });
            
            if (res.status < 400) {
              console.log("Redux has logged-in user");
              console.log(res.data.data)
              dispatch(login(res.data.data))
              
            } else {
              console.log("Redux has not logged-in user");
            }
          } catch (err) {
            console.log("Axios error");
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