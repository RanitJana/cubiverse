/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate, Link } from "react-router-dom";
import { globalContext } from "../../App.jsx";
import { useContext, useEffect, useState } from "react";
import "./Order.css"
import axios from "axios";
import LoadingCube from "../LoadingCube/LoadingCube.jsx";
import TrackOrder from "../TrackOrder/TrackOrder.jsx";

export default function Order(user) {

    const navigate = useNavigate();

    const { userData } = useContext(globalContext);
    const [orderData, setOrderData] = useState([]);
    const [orderItemDetails, setOrderItemDetails] = useState([]);
    const [isLoading, setLoading] = useState(true);

    async function handleGetAllCartCube() {
        if (!userData) return;

        setLoading(true);
        try {

            let tempCubes = await Promise.all(

                orderData.map(async (val) => {
                    let base = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000';

                    let cube = await axios.get(`https://cubiverse-bakend.vercel.app/api/v1/product/id?product=${val.product}`, { withCredentials: true });
                    cube = JSON.parse(cube.data);
                    return cube;
                })

            );

            setOrderItemDetails(tempCubes);

        } catch (error) {
            console.log(error);
        }
        setLoading(false);

    }

    useEffect(() => {

        setOrderData(userData?.data.user.orderHistory);

        handleGetAllCartCube();
        // if (orderData.length > 0) {
        // }
    }, [userData, orderData])

    return (
        <>
            <div className="orderEmpty">
                <div className="top">My orders</div>
                {
                    isLoading ?
                        <>
                            <LoadingCube />
                            <LoadingCube />
                        </>
                        :
                        orderData && orderData.length && orderItemDetails ?
                            orderData.map((order, index) => {
                                return (
                                    <div className="pathAndCube" key={index}>
                                        <TrackOrder cubeData={{ order, index }} />
                                        <div className="orderCube">
                                            <div className="orderCubeImage">
                                                <img src={orderItemDetails[index]?.images[0]} alt="" />
                                            </div>
                                            <div className="orderCubeDetails">
                                                <Link to={`/buy?product=${order.product}`}>{orderItemDetails[index]?.name}</Link>
                                                <p>Price : <span>₹{order.finalPrice}</span></p>
                                                <p>Quantity : {order.count}</p>
                                                <p>Order date : {(new Date(order.orderedDate)).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div className="tempBottom">
                                <img src="/images/icons8-empty-box-100.png" alt="" />
                                <Link to="/collections/all">Make your first order</Link>
                            </div>
                }
            </div>
        </>
    )
}