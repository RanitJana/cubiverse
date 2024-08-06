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

import BouncingLoader from "./components/BouncingLoader/BouncingLoader.jsx";

const globalContext = createContext();

export { globalContext };

export default function App() {

  const [products, setProducts] = useState([]);

  const [userData, setUserData] = useState(null);

  const [isLoading, setLoading] = useState(true);

  const handleServeUserData = async () => {
    async function fetchData() {
      setLoading(true)
      try {
        let base = import.meta.env.VITE_BACKEND_URI || "http://localhost:5000";

        let response = await axios.get(`/api/v1/user`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true
          }
        );

        console.log(response);


        setTimeout(() => {
          setLoading(false);
        }, 500);
        return response;

      } catch (error) {
        console.log(error);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        return null;
      }
    }

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

  const [showRecentlyViewed, setShowRecentlyViewed] = useState(false);

  useEffect(() => {
    const pathsToBlock = ['/register', '/login', '/user', '/user/address', '/user/order'];
    if (!pathsToBlock.includes(location)) {
      setShowRecentlyViewed(true);
    } else {
      setShowRecentlyViewed(false);
    }
  }, [location]);

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
        setColor,
        isLoading,
        setLoading
      }}
    >
      {
        !isLoading ?
          (
            <>
              <Header />
              <PopupMessage />
              <Outlet />
              {showRecentlyViewed && <RecentlyViewed />}
              <Footer />
            </>
          )
          :
          <>
            <BouncingLoader />
          </>
      }
    </globalContext.Provider>
  )
}