/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./CartCube.css";
import axios from 'axios';
import { globalContext } from "../../App";

async function handleCubeDataFetch(id, setCubeData, prop) {

    try {

        let response = await axios.get(`http://localhost:5000/api/v1/product/id?product=${id}`, { withCredentials: true });

        response = JSON.parse(response.data);

        console.log(response);
        setCubeData(response);

        prop.productAllCosts.setTotalCost(prev => prev + (prop.product.count * response.price));
        prop.productAllCosts.setAfterOfferCost(prev => prev + (prop.product.count * (response.price - Math.floor(response.price * (response.discount / 100)))));

        return response;
    } catch (error) {
        console.log(error);
    }
}

export default function CartCube(prop) {

    const { setChangeUserState } = useContext(globalContext);

    const [cubeData, setCubeData] = useState(null);
    useEffect(() => {
        prop.productAllCosts.setTotalCost(0);
        prop.productAllCosts.setAfterOfferCost(0);
        handleCubeDataFetch(prop.product.productId, setCubeData, prop);
    }, [])


    if (!cubeData) return <h1>loading..</h1>

    async function handleSendRequestToAddOrRemoveCartProduct(e) {
        try {
            let response = await axios.post('http://localhost:5000/api/v1/product/user/cart',
                {
                    productId: prop.product.productId,
                    operation: e.target.value
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )

            if (e.target.value == '+') {
                prop.productAllCosts.setTotalCost(prev => prev + response.data.price);
                prop.productAllCosts.setAfterOfferCost(prev => prev + Number(response.data.price - Math.floor(response.data.price * (response.data.offer / 100))));
            }
            else {
                prop.productAllCosts.setTotalCost(prev => prev - response.data.price);
                prop.productAllCosts.setAfterOfferCost(prev => prev - Number(response.data.price - Math.floor(response.data.price * (response.data.offer / 100))));
            }
            setChangeUserState(prev => prev + 1);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="cartCube">
            <div className="cartCubeImage">
                <img src={cubeData.images[0]} alt="" />
            </div>
            <div className="cartCubeDetails">
                <Link to={`/buy?product=${prop.product.productId}`}>{cubeData.name}</Link>
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
            <div className="cartCubeAddRemove">
                <button value={"-"} onClick={handleSendRequestToAddOrRemoveCartProduct}>-</button>
                <div className="count">{prop.product.count}</div>
                <button value={"+"} onClick={handleSendRequestToAddOrRemoveCartProduct}>+</button>
            </div>
        </div>
    )
}