import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/Home.jsx'
import Layout from './Layout.jsx'
import {RouterProvider, createBrowserRouter, Route, createRoutesFromElements} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}></Route>
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router = {router} />
  </>,
)
