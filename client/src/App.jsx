/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import "./App.css";

import Footer from "./components/Footer/Footer.jsx"
import Header from "./components/Header/Header.jsx"
import RecentlyViewed from "./components/RecentlyViewed/RecentlyViewed.jsx";

import { Outlet } from "react-router-dom"

import { useState, createContext } from "react";

const recentViewContext = createContext();

export { recentViewContext };

export default function App() {

  const [products, setProducts] = useState([]);

  return (
    <recentViewContext.Provider value={{ products, setProducts }}>
      <Header />
      <Outlet />
      <RecentlyViewed />
      <Footer />
    </recentViewContext.Provider>
  )
}