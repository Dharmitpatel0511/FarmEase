import { createBrowserRouter,createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import {useEffect} from 'react'
import Home from './components/Home.jsx'
import Layout from './Layout.jsx'
import Cart from './components/Cart/Cart.jsx'
import Authentication from './components/Authentication/Authentication.jsx'
import axios from 'axios'
import { useDispatch,useSelector } from "react-redux"
import { login } from "./features/loginSlicer.js"


const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/auth' element={<Authentication/>}></Route>
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