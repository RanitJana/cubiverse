/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useSearchParams, Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";

import "./ProductDisplay.css";
import { globalContext } from "../../App.jsx";
import axios from "axios";
import LoadingCube from "../LoadingCube/LoadingCube.jsx";
import BouncingLoader from "../BouncingLoader/BouncingLoader.jsx";

import Faq from "../Faq/Faq.jsx";

export default function ProductDisplay() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [productDetails, setProductDetails] = useState("");

    const [reviews, setReviews] = useState([]);

    const [reviewSize, setReviewSize] = useState(0);

    const [reviewViewMoreLimit, setReviewViewMoreLimit] = useState(3);

    const [monitorImage, setMonitorImage] = useState("");

    const [isProductLoading, setProductLoading] = useState(true);

    const { setProducts, setChangeUserState, setVisible, setMessage, setColor, setLoading, isLoading } = useContext(globalContext);

    async function handleFetchData() {
        setProductLoading(true);
        try {
            const productID = searchParams.get("product");
            let base = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000';
            let response = await axios.get(`https://cubiverse-bakend.vercel.app/api/v1/product/id?product=${productID}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            let productDetails = JSON.parse(response.data);

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
        } catch (error) {
            console.log(error);
            let message = error.response.data.message;
            setVisible(true);
            setMessage(message);
            setColor('red');
        }

        setProductLoading(false);


    }

    async function handleGetReview() {
        setProductLoading(true);
        try {

            let productID = searchParams.get('product');

            let base = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000';
            let response = await axios.get(`https://cubiverse-bakend.vercel.app/api/v1/review/${productID}?limit=${reviewViewMoreLimit}`, { withCredentials: true });

            setReviewSize(response.data.total);

            setReviews(response.data.reviews);


        } catch (error) {
            console.log(error);
            let message = error.response.data.message;
            setVisible(true);
            setMessage(message);
            setColor('red');
        }

        setProductLoading(false);
    }

    const location = useLocation();

    useEffect(() => {
        handleFetchData();
    }, [location])

    useEffect(() => {
        handleGetReview();

    }, [reviewViewMoreLimit, location,])


    function handleRatings(ratings) {
        try {

            let avarage = parseInt(ratings.count) ? parseInt(ratings.result) / parseInt(ratings.count) : 0;

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

            return starUI;

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

    const [addCartLoading, setAddCartLoading] = useState(false);

    async function handleAddCart(e) {
        if (addCartLoading) return;
        setAddCartLoading(true);

        e.target.style.backgroundColor = "rgb(255, 142, 100)";
        e.target.style.cursor = "not-allowed";
        try {
            const productID = searchParams.get("product");
            let base = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000';
            let res = await axios.post(`https://cubiverse-bakend.vercel.app/api/v1/product/${productID}`, {}, { withCredentials: true });
            setChangeUserState(prev => prev + 1);

            let message = res.data.message;
            setVisible(true);
            setMessage(message);
            setColor('green');

        } catch (error) {

            console.log(error);

            let message = error.response.data.message;
            setVisible(true);
            setMessage(message);
            setColor('red');
        }

        e.target.style.backgroundColor = "orangered";
        e.target.style.cursor = "pointer";
        setAddCartLoading(false);

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
            else {
                productInfo.style.position = 'static';
            }
        })

        setReviewViewMoreLimit(3);

    }, []);


    async function handleReviewForm(e) {
        e.preventDefault();
        setLoading(true);
        setChangeUserState(prev => prev + 1);
        try {

            const formData = new FormData();

            const reviewImage = e.target[0].files[0];
            formData.append('reviewImage', reviewImage);

            let ratings = 0;
            for (let i = 5; i > 0; --i) {
                if (e.target[i].checked) {
                    ratings = i;
                    break;
                }
            }
            formData.append('ratings', ratings);

            const content = e.target[6].value;
            formData.append('content', content);

            const productID = searchParams.get("product");

            let base = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000';
            let response = await axios.post(`https://cubiverse-bakend.vercel.app/api/v1/review/${productID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });


            let message = response.data.message;
            setVisible(true);
            setMessage(message);
            setColor('green');

            setTimeout(() => {
                setLoading(false);
            }, 500);

        } catch (error) {

            console.log(error);
            let message = error.response.data.message;
            setVisible(true);
            setMessage(message);
            setColor('red');

            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        setChangeUserState(prev => prev + 1);

    }

    const writeReviewSection = useRef(null);
    const formReviewSection = useRef(null);

    function handleCloseReviewFrom(e) {
        if (writeReviewSection.current && !formReviewSection.current.contains(e.target)) {
            e.target.style.display = 'none';
        }
    }

    function handleOpenReview(e) {
        document.querySelector('.writeReview').style.display = "flex";
    }

    function handleReviewImage(e) {
        try {
            let label = document.querySelector("#reviewImage+label")
            label.innerHTML = `✔     ${e.target.value}`;
        } catch (error) {
            console.log(error);
        }

    }

    function handleReviewRatings(e) {

        let parentNode = e.target.parentNode;

        let childs = Array.from(parentNode.childNodes).filter((_, idx) => !(idx & 1));

        childs.map((child, index) => {
            if (index + 1 <= parseInt(e.target.getAttribute('id').replace('rating-', ''), 10)) {
                child.nextElementSibling.style.color = "#FFD700";
            }
            else
                child.nextElementSibling.style.color = "rgb(176, 176, 176)";
        })

    }

    return (
        <>
            {
                !isLoading ?
                    <>
                        {
                            isProductLoading &&
                            <BouncingLoader />
                        }
                        <div className="writeReview" onClick={handleCloseReviewFrom} ref={writeReviewSection}>
                            <form encType="multipart/form-data" onSubmit={handleReviewForm} ref={formReviewSection}>
                                <h2>Write a Review</h2>
                                <input type="file" id="reviewImage" name="reviewImage" accept="image/*" required onChange={handleReviewImage} />
                                <label htmlFor="reviewImage">+ Upload product image</label>

                                <div className="rating-container">
                                    <p>Rating</p>
                                    <div>
                                        <input type="radio" name="ratings" id="rating-1" onChange={handleReviewRatings} required />
                                        <label htmlFor="rating-1">&#9733;</label>
                                        <input type="radio" name="ratings" id="rating-2" onChange={handleReviewRatings} required />
                                        <label htmlFor="rating-2">&#9733;</label>
                                        <input type="radio" name="ratings" id="rating-3" onChange={handleReviewRatings} required />
                                        <label htmlFor="rating-3">&#9733;</label>
                                        <input type="radio" name="ratings" id="rating-4" onChange={handleReviewRatings} required />
                                        <label htmlFor="rating-4">&#9733;</label>
                                        <input type="radio" name="ratings" id="rating-5" onChange={handleReviewRatings} required />
                                        <label htmlFor="rating-5">&#9733;</label>
                                    </div>
                                </div>
                                <p>Description</p>
                                <textarea name="content" id="content" placeholder="Describe your experience using this product.." required></textarea>
                                <input type="submit" id="addReview" value="Add review" style={{ fontSize: "1rem", padding: "10px" }} />
                            </form>
                        </div>
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
                                        <div className="bottom" style={{ display: "flex" }}>
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
                                        {
                                            productDetails.stock ?
                                                <button onClick={handleAddCart}>
                                                    {
                                                        addCartLoading ?
                                                            "Loading..."
                                                            :
                                                            "Add to cart"
                                                    }
                                                </button> :
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
                            <div className="productReview">
                                <div className="reviewTop">
                                    <span>{reviews.length} reviews</span>
                                    <button onClick={handleOpenReview}>Write a review</button>
                                </div>
                                <div className="reviewDetails">
                                    {
                                        !isProductLoading ?
                                            (
                                                reviews.length > 0 ?
                                                    reviews.map((review, index) => {
                                                        return (<div className="reviewBox" key={index}>
                                                            <div className="reviewImage">
                                                                <img src={review.image} alt="" />
                                                            </div>
                                                            <div className="reviewContent">
                                                                <div>
                                                                    <div className="reviewStars">
                                                                        {
                                                                            handleRatings({ count: 1, result: review.ratings })
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        <div className="reviewer">{review.user}, </div>
                                                                        <div className="reviewDate">{review.createdAt}</div>
                                                                    </div>
                                                                </div>
                                                                <p>
                                                                    {
                                                                        review.content
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>)
                                                    })
                                                    :
                                                    "🤐 Needs review"
                                            )
                                            :
                                            <>
                                                <LoadingCube />
                                                <LoadingCube />
                                            </>
                                    }
                                </div>
                                <div className="viewProductReviewMore">
                                    {
                                        reviews.length > 0 && reviewSize > reviews.length ?
                                            <button id="viewMoreReview"
                                                onClick={e => {
                                                    if (reviews.length != reviewSize) {
                                                        setProductLoading(true);
                                                        setReviewViewMoreLimit(prev => prev + 1);
                                                        setProductLoading(false);
                                                    }
                                                }}>View more</button>
                                            :
                                            <button id="viewMoreReview"
                                                style={{
                                                    backgroundColor: "gray",
                                                    cursor: "not-allowed"
                                                }}
                                                onClick={e => {
                                                    if (reviews.length != reviewSize) {
                                                        setProductLoading(true);
                                                        setReviewViewMoreLimit(prev => prev + 10);
                                                        setProductLoading(false);
                                                    }
                                                }}>View more</button>
                                    }
                                </div>
                            </div>
                        </div >
                    </>
                    :
                    <BouncingLoader />
            }
        </>
    )
}