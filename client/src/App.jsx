/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import "./App.css";

import Footer from "./components/Footer/Footer.jsx"
import Header from "./components/Header/Header.jsx"
import RecentlyViewed from "./components/RecentlyViewed/RecentlyViewed.jsx";

import { Outlet, useLocation } from "react-router-dom"

import { useState, createContext } from "react";

const recentViewContext = createContext();

export { recentViewContext };

export default function App() {

  const [products, setProducts] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const location = useLocation().pathname;

  return (
    <recentViewContext.Provider value={{ products, setProducts, userLoggedIn, setUserLoggedIn }}>
      <Header />
      <Outlet />
      {
        location !== '/register' && location !== '/login' ?
          <RecentlyViewed />
          : ""
      }
      <Footer />
    </recentViewContext.Provider>
  )
}