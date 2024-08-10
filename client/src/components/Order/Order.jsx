/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { globalContext } from "../../App.jsx";
import { useContext, useEffect, useState } from "react";
import "./Order.css"
import axios from "axios";
import LoadingCube from "../LoadingCube/LoadingCube.jsx";
import TrackOrder from "../TrackOrder/TrackOrder.jsx";

export default function Order(user) {

    const { userData, setChangeUserState, setProducts, setVisible, setMessage, setColor } = useContext(globalContext);
    const [orderData, setOrderData] = useState([]);
    const [orderItemDetails, setOrderItemDetails] = useState([]);
    const [isLoading, setLoading] = useState(true);

    async function handleGetAllCartCube() {
        if (!userData) return;

        setLoading(true);
        try {

            let tempCubes = await Promise.all(

                orderData.map(async (val) => {

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

    async function handleOrderCancel(e, order) {
        setLoading(true);
        try {

            let response = await axios.post(`https://cubiverse-bakend.vercel.app/api/v1/order/${order._id}/${order.product}/${order.count}`, {}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            let message = response.data.message;
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
        setChangeUserState(prev => prev + 1);
    }

    useEffect(() => {

        setOrderData(userData?.data.user.orderHistory);

        handleGetAllCartCube();

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
                                            {
                                                order.state != "DELIVERED" && order.state != "CANCELLED" &&
                                                < button className="orderCancel" onClick={e => handleOrderCancel(e, order)}>Cancel order</button>
                                            }
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
            </div >
        </>
    )
}