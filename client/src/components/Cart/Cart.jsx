/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { globalContext } from "../../App.jsx";
import CartCube from "../CartCube/CartCube.jsx";
import LoadingCube from "../LoadingCube/LoadingCube.jsx";
import axios from "axios";


export default function Cart() {

    const navigate = useNavigate();

    const { userData, changeUserState, setChangeUserState, isLoading } = useContext(globalContext);

    const [cubes, setCubes] = useState([]);
    const [price, setPrice] = useState(0);
    const [offerPrice, setOfferPrice] = useState(0);
    const [isCartLoading, setCartLoading] = useState(true);

    async function handleGetAllCartCube() {
        if (!userData) return;
        let tempPrice = 0;
        let tempOfferPrice = 0;

        setCartLoading(true);

        try {

            let tempCubes = await Promise.all(

                userData.data.user.cart.map(async (val) => {

                    let base = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000';
                    let cube = await axios.get(`${base}/api/v1/product/id?product=${val.productId}`, { withCredentials: true });
                    cube = JSON.parse(cube.data);

                    tempPrice += val.count * cube.price;
                    tempOfferPrice += val.count * (cube.price - Math.floor(cube.price * (cube.discount / 100)));
                    return cube;
                })

            );

            setPrice(tempPrice);
            setOfferPrice(tempOfferPrice);

            setCubes(tempCubes);
        } catch (error) {
            console.log(error);
            setCubes([]);
        }

        setTimeout(() => {
            setCartLoading(false);
        }, 500);
    }

    const [confirmErase, setConfirmErase] = useState(false);
    const [product, setProduct] = useState('');


    useEffect(() => {
        handleGetAllCartCube();
    }, [changeUserState, userData, product])



    async function removeItem(e) {

        try {
            let base = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000';
            let response = await axios.post(`${base}/api/v1/product/cart/erase/${product}`, {},
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            setChangeUserState(prev => prev + 1);
        } catch (error) {
            console.log(error);
        }
        setProduct('');
        setConfirmErase(false);
    }

    return (
        <div className="cart">
            {
                confirmErase &&
                <>
                    <div className="confirmEraseBlackCover"></div>
                    <div className="confirmErase">
                        <p>Do you want to remove this product from your cart?</p>
                        <div className="buttons">
                            <Link onClick={removeItem}>Yes</Link>
                            <Link onClick={e => setConfirmErase(false)} >cancel</Link>
                        </div>
                    </div>
                </>
            }
            <h2>My cart</h2>
            <div className="cartCollections">
                <div className="cubes">
                    {
                        !isCartLoading ? (
                            cubes && cubes.length > 0 ? (
                                cubes.map((val, index) => {
                                    let userInfo = userData.data.user.cart[index];
                                    return (
                                        <CartCube
                                            key={index}
                                            product={{ val, userInfo, setConfirmErase, setProduct }}
                                        />
                                    );
                                })
                            ) : (
                                <div className="emptyCart">
                                    <img src="/images/icons8-empty-box-100.png" alt="Empty" />
                                    <p>Your cart is empty!!</p>
                                </div>
                            )
                        ) :
                            (
                                <>
                                    <LoadingCube />
                                    <LoadingCube />
                                </>
                            )
                    }

                </div>
                <div className="total">
                    <div className="top">
                        <span>Total</span>
                        <span>₹{offerPrice.toLocaleString()}</span>
                    </div>
                    <div className="middle">
                        <p>You saved ₹{(price - offerPrice).toLocaleString()}!</p>
                    </div>
                    <p>Tax included. Shipping calculated at checkout</p>

                    <button onClick={e => { if (cubes.length) navigate('/user/order') }} style={{
                        backgroundColor: cubes.length ? "orangered" : "gray",
                        cursor: cubes.length ? "pointer" : "not-allowed"
                    }} >PLACE ORDER</button>
                </div>
            </div>
        </div>
    )
}