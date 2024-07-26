/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate, Link } from "react-router-dom";
import { globalContext } from "../../App.jsx";
import { useContext, useEffect, useState } from "react";
import "./Order.css"

export default function Order(user) {

    const navigate = useNavigate();

    const { userData } = useContext(globalContext);
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        setOrderData(userData?.data?.user?.orderHistory);
    }, [userData])

    return (
        <>
            <div className="orderEmpty">
                <div className="top">My orders</div>
                {
                    orderData && orderData.length ?
                        orderData.map((order, index) => {
                            return order
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