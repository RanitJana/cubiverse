import "./App.css";

import Footer from "./components/Footer/Footer.jsx"
import Header from "./components/Header/Header.jsx"

import { Outlet } from "react-router-dom"

export default function App() {



  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}