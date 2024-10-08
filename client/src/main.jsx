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
import Order from './components/Order/Order.jsx';
import Address from './components/Address/Address.jsx';
import Payment from './components/Payment/Payment.jsx';

import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { VerifyAuth } from './components/VerifyAuth/VerifyAuth.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="" element={<Home />} />
      <Route path="collections/">
        <Route loader={async ({ params }) => params} path=":product" element={<CubeList />} />
      </Route>
      <Route path="buy" element={<ProductDisplay />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="user/">
        <Route path="" element={<VerifyAuth />}>
          <Route path="" element={<User />} >
            <Route path="" element={<Order />} />
            <Route path="address" element={<Address />} />
          </Route>
          <Route path="cart/" element={<Cart />} >
          </Route>
          <Route path="order" element={<Payment />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
