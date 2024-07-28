/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import "./App.css";
import PopupMessage from "./components/PopUp/PopUp.jsx";
import Footer from "./components/Footer/Footer.jsx"
import Header from "./components/Header/Header.jsx"
import RecentlyViewed from "./components/RecentlyViewed/RecentlyViewed.jsx";
import axios from "axios";

import { Outlet, useLocation } from "react-router-dom"

import { useState, createContext, useEffect } from "react";

const globalContext = createContext();

export { globalContext };


async function fetchData() {

  try {
    let response = await axios.get('http://localhost:5000/api/v1/user', { withCredentials: true });
    console.log(response);
    return response;

  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function App() {

  const [products, setProducts] = useState([]);

  const [userData, setUserData] = useState(null);

  const handleServeUserData = async () => {
    let response = await fetchData();
    setUserData(response);
  }

  const [changeUserState, setChangeUserState] = useState(false);
  const [isAuthUser, setAuthUser] = useState(false);

  useEffect(() => {
    handleServeUserData();  //when user will login then we set the state so that change will reflect all used values
  }, [changeUserState])

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState('red');

  const location = useLocation().pathname;

  return (
    <globalContext.Provider
      value={{
        products,
        setProducts,
        userData,
        setUserData,
        handleServeUserData,
        changeUserState,
        setChangeUserState,
        isAuthUser,
        setAuthUser,
        visible,
        setVisible,
        message,
        setMessage,
        color,
        setColor
      }}
    >
      <Header />
      <Outlet />
      <PopupMessage />
      {
        location !== '/register' && location !== '/login' && location !== '/user' && location !== '/user/address' && location!=='/user/order' ?
          < RecentlyViewed />
          : ""
      }
      <Footer />
    </globalContext.Provider>
  )
}