/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import "./Header.css";
import "./Nav.css"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useRef, useEffect, useContext } from "react";
import CubeCollection from "../CubeTop/CubeCollection";
import { globalContext } from "../../App.jsx";
import axios from "axios";

export default function Header() {
    async function handleSearchGoogle() {
        // try {
        //     let res = await axios.post("https://cse.google.com/cse.js?cx=e573ce9d386f94e76", {}, { withCredentials: true });
        //     console.log(res);

        // }
        // catch (err) {
        //     console.log(err);

        // }
    }

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

            if (sideNavOpen && e.x > Math.max(256, e.width)) {
                blackCoverRef.current.classList.toggle("navOpen");
                sideNavOpen = !sideNavOpen;
                navRef.current.classList.toggle("navOpen");
                document.querySelector('body').style.overflow = "auto";
            }
        })

    }, [])

    const { userData, isLoading } = useContext(globalContext);

    const location = useLocation().pathname;

    function handleSuggestionFocus(e) {
        e.preventDefault();
        let suggestion = document.querySelector('.middle >ul');
        suggestion.style.height = Math.min(suggestion.scrollHeight, 500) + "px";
        suggestion.style.padding = "0.5rem 0";
    }
    function handleSuggestionBlur(e) {
        e.preventDefault();
        let suggestion = document.querySelector('.middle >ul');
        setTimeout(() => {

            suggestion.style.height = "0px";
            suggestion.style.padding = "0";
        }, 200)
    }
    function handleSearchBarInput(e) {
        let lists = document.querySelectorAll(".middle ul li");

        lists.forEach((list, index) => {
            let keywords = list.childNodes[0].textContent.toLocaleLowerCase();
            if (keywords.includes(e.target.value.toLocaleLowerCase())) {
                list.parentNode.prepend(list);
            }
        })
    }
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
                        <input
                            type="text"
                            name="searchCube"
                            id="searchCube"
                            placeholder="Search your puzzle"
                            onFocus={handleSuggestionFocus}
                            onBlur={handleSuggestionBlur}
                            onInput={handleSearchBarInput}
                        />
                        <img src="/images/search.png" alt="Search" onClick={handleSearchGoogle} />
                        <ul style={{ height: 0, padding: 0 }}>
                            <li>
                                <Link to="/collections/all">All cubes</Link>
                            </li>
                            <li>
                                <Link to="/collections/3x3">3x3 cubes</Link>
                            </li>
                            <li>
                                <Link to="/collections/4x4">4x4 cubes</Link>
                            </li>
                            <li>
                                <Link to="/collections/pyraminx">Pyraminx</Link>
                            </li>
                            <li>
                                <Link to="/collections/megaminx">Meagaminx</Link>
                            </li>
                            <li>
                                <Link to="/collections/2x2">2x2 cubes</Link>
                            </li>
                            <li>
                                <Link to="/collections/mirror cube">Mirror Cuebs</Link>
                            </li>
                            <li>
                                <Link to="/collections/big cubes">Big Cubes</Link>
                            </li>
                            <li>
                                <Link to="/collections/timer">Timer</Link>
                            </li>
                            <li>
                                <Link to="/collections/lubricants">Lubricants</Link>
                            </li>
                            <li>
                                <Link to="/collections/odd shape">Odd shapes</Link>
                            </li>
                            <li>
                                <Link to="/collections/new">New cubes</Link>
                            </li>
                            <li>
                                <Link to="/collections/bestsellers">Bestsellers</Link>
                            </li>
                            <li>
                                <Link to="/collections/most favourite">Most Favourite</Link>
                            </li>
                            <li>
                                <Link to="/collections/sales">Sales</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="right">
                        {
                            !isLoading ?
                                (!userData ?
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
                                        <p style={{ textAlign: "center", width: "2rem", height: "2rem", backgroundColor: "purple", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }} >
                                            {userData.data.user.firstName.split("")[0]}
                                        </p>
                                    </Link>)
                                : <Link className="userLoggedIn">
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
                location !== '/buy' && location !== '/register' && location !== '/login' && location != '/user/cart' && location !== '/user/order' ? <CubeCollection /> : ""
            }
        </>
    )
}