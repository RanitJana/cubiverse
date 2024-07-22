/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useSearchParams, Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";

import "./ProductDisplay.css";
import { globalContext } from "../../App.jsx";
import axios from "axios";

import Faq from "../Faq/Faq.jsx";

export default function ProductDisplay() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [productDetails, setProductDetails] = useState("");

    const [monitorImage, setMonitorImage] = useState("");

    const { setProducts, setChangeUserState } = useContext(globalContext);

    async function handleFetchData() {

        const productID = searchParams.get("product");
        let response = await fetch(`http://localhost:5000/api/v1/product/id?product=${productID}`);
        let jsonFormat = await response.json();
        let productDetails = JSON.parse(jsonFormat);

        setMonitorImage(productDetails.images[0]);
        setDetails(productDetails.description);
        setProductDetails(productDetails);

        let arr = [];

        if (!localStorage.getItem("cubes")) arr.push(productDetails);
        else {
            arr = JSON.parse(localStorage.getItem("cubes"));

            arr = arr.filter(val => {
                return val._id !== productDetails._id;
            })

            arr.unshift(productDetails);
            if (arr.length > 5) arr.pop();
        }

        localStorage.setItem("cubes", JSON.stringify(arr));

        setProducts(arr);

    }

    const location = useLocation();

    useEffect(() => {
        handleFetchData();
        window.scrollTo(0, 0);
    }, [location])


    function handleRatings(ratings) {
        try {

            let avarage = ratings.count ? ratings.result / ratings.count : 0;

            let fullStar = Math.floor(avarage);

            let halfStar = Math.ceil(avarage) - fullStar;

            let emptyStar = 5 - Math.ceil(avarage);

            let starUI = [];

            let key = 0;

            for (let i = 0; i < fullStar; i++) {
                starUI.push(<img src="/images/icons8-star-filled-48.png" alt="star" key={key++} />);
            }
            for (let i = 0; i < halfStar; i++) {
                starUI.push(<img src="/images/icons8-star-half-empty-50.png" alt="star" key={key++} />);
            }
            for (let i = 0; i < emptyStar; i++) {
                starUI.push(<img src="/images/icons8-star-48.png" alt="star" key={key++} />);
            }

            return starUI
        } catch (error) {
            return ""
        }
    }

    function handleDisplayMonitorImage(e) {
        document.querySelectorAll('.remoteBox').forEach(val => {
            val.style.borderColor = "white";
        })
        e.target.parentNode.style.borderColor = "orange";

        document.querySelector(".imageMonitor").style.animation = "appearMonitor 0.5s ease"
        setMonitorImage(e.target.getAttribute('src'));
    }

    const [details, setDetails] = useState("");

    async function handleDetails(e) {
        document.querySelectorAll(".productUserReview span").forEach(val => {
            val.style.borderColor = "#ccc";
            val.style.color = "gray";
        })

        e.target.style.borderColor = "orangered";
        e.target.style.color = "rgb(0,0,97)";

        if (e.target.innerText == "SPECIFICATIONS") {
            let specifications = JSON.parse(productDetails.specifications);
            const specTable = (
                <table>
                    <tbody>
                        {Object.entries(specifications).map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            );

            setDetails(specTable);
        }
        else if (e.target.innerText == "DESCRIPTION") {

            setDetails(productDetails.description)
        }
        else {
            setDetails(<Faq />);
        }
    }

    async function handleAddCart(e) {
        try {
            const productID = searchParams.get("product");
            let res = await axios.post(`http://localhost:5000/api/v1/product/${productID}`, {}, { withCredentials: true });
            setChangeUserState(prev => prev + 1);

        } catch (error) {

            console.log(error);
        }
    }

    const prevScrollY = useRef(0);

    useEffect(() => {
        const productInfo = document.querySelector('.productInfo');

        window.addEventListener('scroll', e => {

            if (window.innerWidth > 1000) {

                const rect = productInfo.getBoundingClientRect();
                const topBoundary = 11 * 16;
                const bottomBoundary = window.innerHeight - rect.height - 32;
                const currentScrollY = window.scrollY;
                const delScrollY = currentScrollY - prevScrollY.current;

                productInfo.style.position = 'sticky';

                if (delScrollY > 0 && rect.bottom > bottomBoundary) {

                    productInfo.style.top = `${bottomBoundary}px`;

                } else if (delScrollY < 0 && rect.top < topBoundary) {

                    productInfo.style.top = '11rem';
                }

                prevScrollY.current = currentScrollY;
            }
        })

    }, []);

    return (
        <>
            <div className="productDetails" id="top">
                <div className="productImages">
                    <div className="imageMonitor">
                        <img src={monitorImage} alt="image" />
                    </div>
                    <div className="imageRemote">
                        {
                            productDetails.images?.map(
                                (val, index) =>
                                (
                                    <div className="remoteBox" onClick={handleDisplayMonitorImage}

                                        key={index}>
                                        <img src={val} alt="cube" />
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
                <div className="productInfo">
                    <h2>{productDetails.name}</h2>
                    <div className="offers">
                        {
                            productDetails.New ?
                                <span className="new">new</span>
                                : ""
                        }
                        {
                            productDetails.ratings?.count >= 50 ?
                                <span className="bestseller">bestseller</span>
                                : ""
                        }
                        {
                            productDetails.discount ?
                                <span className="discount">{productDetails.discount}% off</span>
                                : ""
                        }
                    </div>
                    <div className="companyAndRatings">
                        <span>{productDetails.company}</span>
                        <span>{handleRatings(productDetails.ratings)} ({productDetails.ratings?.count})</span>

                    </div>
                    <div className="price">
                        <span>Price:</span>
                        <div className="value">
                            <div className="top">
                                {
                                    <span className="finalPrice">
                                        ₹{
                                            Number(productDetails.price - Math.floor((productDetails.price * productDetails.discount) / 100)).toLocaleString()
                                        }
                                    </span>
                                }
                                {
                                    productDetails.discount ?
                                        <span className="actualPrice">₹{Number(productDetails.price).toLocaleString()}</span>
                                        : ""
                                }
                            </div>
                            <div className="bottom">
                                Inclusive of all taxes
                            </div>
                        </div>
                    </div>
                    <div className="stock">
                        <span>
                            Stock:
                        </span>
                        {
                            productDetails.stock ?
                                <div className="availStock">In stock</div>
                                : <div className="outStock">Out of stock</div>
                        }
                    </div>
                    <div className="buyButtons">
                        <Link>
                            <button onClick={handleAddCart}>Add to cart</button>
                        </Link>
                        <Link>
                            {
                                productDetails.stock ?
                                    <button>Buy now</button> :
                                    <button style={{ backgroundColor: "gray" }} onMouseOver={e => e.target.style.cursor = "not-allowed"}>Out of stock</button>
                            }
                        </Link>
                    </div>
                    <div className="information">
                        <div className="div">
                            <img src="/images/icons8-truck-100.png" alt="" />
                            <span>Fast Delivery</span>
                        </div>
                        <div className="div">
                            <img src="/images/icons8-cart-100.png" alt="" />
                            <span>Easy Returns</span>
                        </div>
                    </div>
                </div>
                <div className="productDescriptions">
                    <div className="productUserReview">
                        <span onClick={handleDetails}>DESCRIPTION</span>
                        <span onClick={handleDetails}>FAQs</span>
                        <span onClick={handleDetails}>SPECIFICATIONS</span>
                    </div>
                    <div className="details">
                        <pre>
                            {details}
                        </pre>
                    </div>
                </div>
            </div >
        </>
    )
}