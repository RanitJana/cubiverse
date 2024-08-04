/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { globalContext } from "../../App.jsx"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Payment.css";
import PaymentSuccess from "../PaymentSuccess/PaymentSuccess.jsx";
import LoadingCube from "../LoadingCube/LoadingCube.jsx";

export default function Payment() {

    const { userData, setChangeUserState, changeUserState, setVisible, setMessage, setColor } = useContext(globalContext);
    const [cartItemInfo, setCartItemInfo] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [delivaryCost, setDelivaryCost] = useState(0);
    const [paymentType, setPaymentType] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [isSuccessOrder, setSuccessOrder] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setCartItemInfo(userData.data.user.cart);
        handleGetAllCartCube();
    }, [userData, cartItemInfo])

    async function handleGetAllCartCube() {
        if (!userData) return;
        let tempPrice = 0;
        let tempOfferPrice = 0;
        setLoading(true);
        try {

            let tempCubes = await Promise.all(

                cartItemInfo.map(async (val) => {

                    let cube = await axios.get(`/api/v1/product/id?product=${val.productId}`, { withCredentials: true });
                    cube = JSON.parse(cube.data);

                    tempPrice += val.count * cube.price;
                    tempOfferPrice += val.count * (cube.price - Math.floor(cube.price * (cube.discount / 100)));
                    return cube;
                })

            );
            navigate('/user/order');
            setTotalCost(tempOfferPrice);
            setCartItems(tempCubes);

        } catch (error) {
            console.log(error);
            setCartItems([]);
        }
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }

    useEffect(() => {
        document.querySelectorAll('.address').forEach((val, index) => {
            if (selectedAddress == index) {
                val.style.borderColor = "orangeRed"
                val.style.backgroundColor = "white"

                val.childNodes[2].style.backgroundColor = "orangeRed"
            }
            else {
                val.style.backgroundColor = "rgb(231, 231, 231)"
                val.style.borderColor = "rgb(231, 231, 231)"
                val.childNodes[2].style.backgroundColor = "gray"
            }
        });

    }, [selectedAddress])

    useEffect(() => {
        document.querySelectorAll('.paymentCard').forEach((val, index) => {
            if (paymentType == index) {
                val.style.borderColor = "orangeRed"
                val.style.backgroundColor = "white"

                val.childNodes[1].style.backgroundColor = "orangeRed"
            }
            else {
                val.style.backgroundColor = "rgb(231, 231, 231)"
                val.style.borderColor = "rgb(231, 231, 231)"
                val.childNodes[1].style.backgroundColor = "gray"
            }
        });

    }, [paymentType])

    async function handleOrderPlace(e) {
        setSuccessOrder(false);
        try {

            let response = await axios.post("/api/v1/order",
                {
                    cartItems,
                    address: `${userData.data.user.address[selectedAddress].location} , Pincode: ${userData.data.user.address[selectedAddress].pincode}`,
                    payment: "CASH ON DELIVARY"
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )


            // setColor('green')
            // setMessage(response.data.message);
            // setVisible(true);

            // // setChangeUserState(prev => prev + 1);


            setSuccessOrder(true);

            setTimeout(() => {
                setSuccessOrder(false);
                setChangeUserState(prev => prev + 1);
            }, 2500);

        } catch (error) {
            console.log(error);

            setColor('red')
            setMessage(error.response.data.message);
            setVisible(true);

            setChangeUserState(prev => prev + 1);
        }
    }

    if (!userData) return;

    return (
        <div className="payment">
            {
                isSuccessOrder && (
                    <div className="successOrdered">
                        <PaymentSuccess />
                        <p>Order placed !!</p>
                    </div>
                )
            }
            <div className="paymentDetails">
                <div className="orderSummary">
                    <h2>Order summery</h2>
                    <div className="childOrders">
                        {
                            !isLoading ?
                                (cartItems.length > 0 ?
                                    cartItems.map((cube, index) => {
                                        return (
                                            <div className="childBox" key={index}>
                                                <div className="childBoxImage">
                                                    <img src={cube.images[0]} alt="" />
                                                </div>
                                                <div className="childBoxDetails">
                                                    <p>
                                                        <Link style={{ textDecoration: "none" }} to={`/buy?product=${cube._id}`}>
                                                            {cube.name}
                                                        </Link>
                                                    </p>
                                                    <p style={{ fontStyle: "italic" }}>Price : ₹{Math.floor(cube.price - Math.floor(cube.price * cube.discount / 100))}</p>
                                                    <p>Quantity : {cartItemInfo[index]?.count}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    "Add Items to cart!")
                                :
                                <>
                                    <LoadingCube />
                                    <LoadingCube />
                                </>
                        }
                    </div>
                </div>
                <div className="shippingAddress">
                    <h2>Shipping address</h2>
                    <div className="allAddresses">
                        <div className="storeAddress">

                            {
                                userData.data.user.address.map((val, index) => {
                                    return (
                                        <div
                                            className="address"
                                            key={index}
                                            onClick={e => { setSelectedAddress(index); }}
                                        >
                                            <p>
                                                {val.location}
                                            </p>
                                            <p>
                                                Pin code : {val.pincode}
                                            </p>
                                            <div className="tick" >
                                                <img src="/images/icons8-tick-24.png" alt="Tick" decoding="async" />
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="addAddress" onClick={e => navigate('/user/address')}>
                            <div className="add"></div>
                            <p>Create a new address</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="paymentOrder">
                <h2>Payment</h2>
                <div className="PayTotal">
                    <div className="payOptions">
                        <div className="paymentCard" onClick={e => setPaymentType(0)}>
                            <p>Cash on delivary</p>
                            <div className="tick" >
                                <img src="/images/icons8-tick-24.png" alt="Tick" decoding="async" />
                            </div>
                        </div>
                        <div className="paymentCard" onClick={e => setPaymentType(1)}>
                            <p>Cash on delivary</p>
                            <div className="tick" >
                                <img src="/images/icons8-tick-24.png" alt="Tick" decoding="async" />
                            </div>
                        </div>
                        <div className="paymentCard" onClick={e => setPaymentType(2)}>
                            <p>Cash on delivary</p>
                            <div className="tick" >
                                <img src="/images/icons8-tick-24.png" alt="Tick" decoding="async" />
                            </div>
                        </div>
                        <div className="paymentCard" onClick={e => setPaymentType(3)}>
                            <p>Cash on delivary</p>
                            <div className="tick" >
                                <img src="/images/icons8-tick-24.png" alt="Tick" decoding="async" />
                            </div>
                        </div>
                    </div>
                    <div className="finalTotal">
                        <h2>Total</h2>
                        <div className="calculation">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Subtotal</td>
                                        <td>₹{totalCost}</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping</td>
                                        <td>
                                            {
                                                delivaryCost ? `₹${delivaryCost}` : "FREE"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>To Pay</td>
                                        <td>₹{totalCost + delivaryCost}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button className="proceed" onClick={e => { if (cartItems.length > 0) handleOrderPlace(e) }}
                        style={{ backgroundColor: cartItems.length > 0 ? "orangered" : "gray", cursor: cartItems.length > 0 ? "pointer" : "not-allowed" }}
                    >Place order</button>
                </div>
            </div>
            {/* <PaymentSuccess /> */}
        </div >
    )
}