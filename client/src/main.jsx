/* eslint-disable no-unused-vars */
import axios from 'axios';

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './components/Home/Home.jsx';
import CubeList from './components/CubeLists/CubeList.jsx';
import ProductDisplay from "./components/ProductDisplay/ProductDisplay.jsx";
import NotFound from './components/NotFound/NotFound.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import User from './components/User/User.jsx';
import Cart from './components/Cart/Cart.jsx';

import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom";


const handleUserData = async () => {
  try {

    let response = await axios.get("http://localhost:5000/api/v1/user", { withCredentials: true })
    return response.data;

  } catch (error) {
    return error.response;
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path=""
        loader=
        {
          async () => {
            try {

              document.cookie = "limit=10; path=/";
              let response = await (await axios.get(`http://localhost:5000/api/v1/product/most-favourite`, { withCredentials: true })).data
              return JSON.parse(response);
            } catch (error) {
              console.log(error);
              return [];
            }
          }
        }
        element={<Home />}
      />
      <Route path="collections/">
        <Route
          loader=
          {
            async ({ params }) => {
              try {
                let response = (await axios.get(`http://localhost:5000/api/v1/product/${params.product}`, { withCredentials: true })).data;
                return JSON.parse(response);
              } catch (error) {
                console.log(error);
                return {}
              }
            }
          }
          path=":product"
          element={<CubeList />} />
      </Route>
      <Route path="buy" element={<ProductDisplay />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="user/" loader={handleUserData}>
        <Route path="" element={<User />} />
        <Route path="cart" element={<Cart />} />
      </Route>
      {/* <Route path='*' Component={<NotFound />} /> */}
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
