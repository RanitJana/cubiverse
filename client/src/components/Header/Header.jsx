/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import "./Header.css";
import "./Nav.css"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useRef, useEffect, useContext } from "react";
import CubeCollection from "../CubeTop/CubeCollection";
import { globalContext } from "../../App.jsx";
import Cookies from 'js-cookie';


export default function Header() {

    const hambergRef = useRef(null);
    const navRef = useRef(null);
    const blackCoverRef = useRef(null);

    let sideNavOpen = false;

    useEffect(() => {
        let navBar = hambergRef.current;
        navBar.addEventListener('click', () => {
            blackCoverRef.current.classList.toggle("navOpen");
            sideNavOpen = !sideNavOpen;
            navRef.current.classList.toggle("navOpen");

            if (sideNavOpen) document.querySelector('body').style.overflow = "hidden";

        })

        document.addEventListener('click', e => {

            if (sideNavOpen && e.x > Math.max(320, e.width)) {
                blackCoverRef.current.classList.toggle("navOpen");
                sideNavOpen = !sideNavOpen;
                navRef.current.classList.toggle("navOpen");
                document.querySelector('body').style.overflow = "auto";
            }
        })
        console.log(userData)
    }, [])

    const { userData, handleServeUserData, changeUserState, setChangeUserState } = useContext(globalContext);

    const location = useLocation().pathname;

    return (
        <>
            <header>
                <div className="blackCover" ref={blackCoverRef}></div>
                <div className="top">
                    <div className="navMenu" ref={hambergRef}>
                        <img src="/images/hamburger-menu.png" alt="menu" />
                    </div>
                    <Link className="left" to="/">
                        <img src="/images/rubik's-cube-black.png" alt="Logo" />
                        <h1>
                            <span>Cubi</span>
                            <span style={{ color: "orangered" }}>verse</span>
                        </h1>
                    </Link>
                    <div className="middle">
                        <input type="text" name="searchCube" id="searchCube" placeholder="Search your puzzle" />
                        <img src="/images/search.png" alt="Search" />
                        <ul>

                        </ul>
                    </div>
                    <div className="right">
                        {
                            !userData ?
                                <div className="left">
                                    <Link to="/login">Login</Link>
                                    <Link to="/login" className="userLogin">
                                        <img src="/images/user.png" alt="user" />
                                    </Link>
                                    <span style={{ color: "white" }}> | </span>
                                    <Link to="/register">Signup</Link>
                                </div>
                                :
                                <Link to="/user" className="userLoggedIn">
                                    <img src="/images/user.png" style={{ width: "2rem" }} alt="user" />
                                </Link>
                        }
                        <Link className="right" to="/user/cart">
                            <div className="carParent">
                                <img src="/images/cart.png" alt="Cart" />
                                <span>{userData ? userData.data.user.cart.length : 0}</span>
                            </div>
                            <span>Cart</span>
                        </Link>
                    </div>
                </div>
                <nav ref={navRef}>
                    <NavLink activeclassname="active" to="/collections/new">New</NavLink>
                    <NavLink activeclassname="active" to="/collections/bestsellers">Bestsellers</NavLink>
                    <NavLink activeclassname="active" to="/collections/most-favourite">Most favourite</NavLink>
                    {/* <NavLink activeclassname="active" to="/collections/shopby">Shop By</NavLink> */}
                    <NavLink activeclassname="active" to="/collections/sale">Sale</NavLink>
                </nav>
            </header>
            {
                location !== '/buy' && location !== '/register' && location !== '/login' && location != '/user/cart' ? <CubeCollection /> : ""
            }
        </>
    )
}