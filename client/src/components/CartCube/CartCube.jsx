/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./CartCube.css";
import axios from 'axios';
import { globalContext } from "../../App";
import BouncingLoader from "../BouncingLoader/BouncingLoader";
import LoadingCube from "../LoadingCube/LoadingCube";

export default function CartCube(prop) {

    const { setChangeUserState } = useContext(globalContext);

    const [cubeData, setCubeData] = useState(null);


    useState(() => {
        setCubeData(prop.product.val)
    }, [])

    if (!cubeData) return <h1>loading..</h1>

    async function handleSendRequestToAddOrRemoveCartProduct(e) {
        prop.product.setCartLoading(true);
        try {

            await axios.post(`https://cubiverse-bakend.vercel.app/api/v1/product/user/cart`,
                {
                    productId: prop.product.userInfo.productId,
                    operation: e.target.value
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )
            await prop.product.handleGetAllCartCube();
            setChangeUserState(prev => prev + 1);
        } catch (error) {
            console.log(error);
        }
        prop.product.setCartLoading(false);
    }

    async function handleErase(e) {
        prop.product.setConfirmErase(true);
        prop.product.setProduct(prop.product.userInfo.productId);
    }

    return (
        <div className="cartCube">
            <div className="cartCubeImage">
                <img src={cubeData.images[0]} alt="cube image" />
            </div>
            <div className="cartCubeDetails">
                <Link to={`/buy?product=${prop.product.userInfo?.productId}`}>{cubeData.name}</Link>
                <div className="price">
                    {
                        cubeData.discount ?
                            (<>
                                <div className="finalPrice">₹{Number(cubeData.price - Math.floor(cubeData.price * (cubeData.discount / 100))).toLocaleString()}</div>
                                <div className="actualPrice">₹{Number(cubeData.price).toLocaleString()}</div>
                            </>)
                            :
                            (<>
                                <div className="finalPrice">₹{Number(cubeData.price).toLocaleString()}</div>
                            </>)
                    }
                </div>
            </div>
            <div className="eraseAndupdate">

                <div className="cartCubeAddRemove">
                    <button value={"-"} onClick={handleSendRequestToAddOrRemoveCartProduct}>-</button>
                    <div className="count">{prop.product.userInfo?.count}</div>
                    <button value={"+"} onClick={handleSendRequestToAddOrRemoveCartProduct}>+</button>
                </div>

                <div className="eraseProduct" onClick={handleErase} >Remove</div>
            </div>
        </div>

    )
}