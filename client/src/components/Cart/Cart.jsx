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

    const { userData, changeUserState, setChangeUserState, isLoading, setLoading } = useContext(globalContext);

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

                    let cube = await axios.get(`https://cubiverse-bakend.vercel.app/api/v1/product/id?product=${val.productId}`, { withCredentials: true });
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

        setCartLoading(false);

    }

    const [confirmErase, setConfirmErase] = useState(false);
    const [product, setProduct] = useState('');


    useEffect(() => {
        handleGetAllCartCube();
    }, [changeUserState, userData])



    async function removeItem(e) {

        setLoading(true);

        try {

            let response = await axios.post(`https://cubiverse-bakend.vercel.app/api/v1/product/cart/erase/${product}`, {},
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
        setLoading(false);
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
                            cubes?.length > 0 ? (
                                cubes.map((val, index) => {
                                    let userInfo = userData.data.user.cart[index];
                                    return (
                                        <CartCube
                                            key={index}
                                            product={{ val, userInfo, setConfirmErase, setProduct, setCartLoading, handleGetAllCartCube }}
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

                    <button onClick={e => { if (cubes.length && !isCartLoading) navigate('/user/order') }} style={{
                        backgroundColor: cubes.length && !isCartLoading ? "orangered" : "gray",
                        cursor: cubes.length && !isCartLoading ? "pointer" : "not-allowed"
                    }} >PLACE ORDER</button>
                </div>
            </div>
        </div>
    )
}