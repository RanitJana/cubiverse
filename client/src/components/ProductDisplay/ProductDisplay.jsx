/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./ProductDisplay.css";


export default function ProductDisplay() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [productDetails, setProductDetails] = useState("");

    async function handleFetchData() {

        const productID = searchParams.get("product");
        let response = await fetch(`http://localhost:5000/api/v1/product/id?product=${productID}`);
        let jsonFormat = await response.json();
        let productDetails = JSON.parse(jsonFormat);
        console.log(productDetails);
        setProductDetails(productDetails);
    }

    useEffect(() => {
        handleFetchData();
    }, [])



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


    return (
        <>
            <div className="productDetails">
                <div className="productImages">
                    abc
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
                        {
                            productDetails.stock?
                                <div className="availStock">In stock</div>
                                : <div className="outStock">Out of stock</div>
                        }
                    </div>
                    <div className="productStatus"></div>
                </div>
                <div className="productUserReview">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam cum laboriosam facilis dolorum culpa iste quis officia deleniti, odit, recusandae quos? Aut, totam. Aperiam facilis ab reiciendis obcaecati voluptate non?
                </div>
            </div>
        </>
    )
}