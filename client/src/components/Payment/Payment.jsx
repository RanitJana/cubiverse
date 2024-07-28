/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { globalContext } from "../../App.jsx"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

export default function Payment() {

    const { userData } = useContext(globalContext);
    const [cartItemInfo, setCartItemInfo] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [delivaryCost, setDelivaryCost] = useState(0);
    const [payment, setPayment] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(userData);
        setCartItemInfo(userData.data.user.cart);
        handleGetAllCartCube();
    }, [userData, cartItemInfo])

    async function handleGetAllCartCube() {
        if (!userData) return;
        let tempPrice = 0;
        let tempOfferPrice = 0;
        try {

            let tempCubes = await Promise.all(

                cartItemInfo.map(async (val) => {

                    let cube = await axios.get(`http://localhost:5000/api/v1/product/id?product=${val.productId}`, { withCredentials: true });
                    cube = JSON.parse(cube.data);

                    tempPrice += val.count * cube.price;
                    tempOfferPrice += val.count * (cube.price - Math.floor(cube.price * (cube.discount / 100)));
                    return cube;
                })

            );
            setTotalCost(tempOfferPrice);
            setCartItems(tempCubes);

            console.log(tempCubes);
        } catch (error) {
            console.log(error);
            setCartItems([]);
        }
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
            // console.log(val.childNodes[2]);
        });

    }, [selectedAddress])

    function handleShrinkHeight() {

    }

    if (!userData) return;

    return (
        <div className="payment">
            <div className="paymentDetails">
                <div className="orderSummary">
                    <h2>Order summery</h2>
                    <div className="childOrders">
                        {
                            cartItems.map((cube, index) => {
                                return (
                                    <div className="childBox" key={index}>
                                        <div className="childBoxImage">
                                            <img src={cube.images[0]} alt="" />
                                        </div>
                                        <div className="childBoxDetails">
                                            <p>{cube.name}</p>
                                            <p>Price : ₹{Math.floor(cube.price - Math.floor(cube.price * cube.discount / 100))}</p>
                                            <p>Quantity : {cartItemInfo[index].count}</p>
                                        </div>
                                    </div>
                                )
                            })
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
                                                <img src="/images/icons8-tick-24.png" alt="" />
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
                        <div className="paymentCard">
                            <p>Cash on delivary</p>
                        </div>
                        <div className="paymentCard">
                            <p>Cash on delivary</p>
                        </div>
                        <div className="paymentCard">
                            <p>Cash on delivary</p>
                        </div>
                        <div className="paymentCard">
                            <p>Cash on delivary</p>
                        </div>
                    </div>
                    <div className="finalTotal">
                        {/* <h2>Total</h2> */}
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
                </div>
            </div>
        </div>
    )
}