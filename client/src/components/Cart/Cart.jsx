/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import "./Cart.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { globalContext } from "../../App.jsx";
import CartCube from "../CartCube/CartCube.jsx";

export default function Cart() {

    let response = useLoaderData();
    const navigate = useNavigate();

    const { userData, changeUserState } = useContext(globalContext);

    function handleDisplayCartCubes() {
        return (
            userData ?
                userData.data.user.cart.map((val, index) => {
                    return <CartCube key={index} product={val} productAllCosts={{ setAfterOfferCost, setTotalCost, totalCost, afterOfferCost }} />
                })
                :
                "Empty.."
        )
    }

    useEffect(() => {
        console.log(userData);
        if (!userData) navigate('/login');
    }, [changeUserState, userData])

    useEffect(() => {
        handleDisplayCartCubes();
    }, [changeUserState, userData])

    const [totalCost, setTotalCost] = useState(Number(0));
    const [afterOfferCost, setAfterOfferCost] = useState(Number(0));

    return (
        <div className="cart">
            <h2>My cart</h2>
            <div className="cartCollections">

                <div className="cubes">{handleDisplayCartCubes()}</div>
                <div className="total">
                    <div className="top">
                        <span>Total</span>
                        <span>₹{afterOfferCost.toLocaleString()}</span>
                    </div>
                    <div className="middle">
                        <p>You saved ₹{(totalCost - afterOfferCost).toLocaleString()}!</p>
                    </div>
                    <p>Tax included. Shipping calculated at checkout</p>
                    <button>PLACE ORDER</button>
                </div>
            </div>
        </div>
    )
}