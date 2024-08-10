/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import "./TrackOrder.css";

export default function TrackOrder(prop) {

    let order = prop.cubeData.order;


    const pathRef = useRef(null);

    useEffect(() => {

        function handleTrackbar() {

            if (pathRef.current) {


                let path = pathRef.current.querySelector(".colorPath");
                let orderPlaced = pathRef.current.querySelector(".orderPlaced");
                let orderShipped = pathRef.current.querySelector(".orderShipped");
                let orderDelivered = pathRef.current.querySelector(".orderDelivered");

                let progress = order.progress;


                orderPlaced.style.backgroundColor = "#34bbff";
                path.style.width = `${progress}%`;

                if (progress >= 50) {
                    orderShipped.style.backgroundColor = "#34bbff";
                }
                if (progress == 100) {
                    orderDelivered.style.backgroundColor = "#34bbff";
                }
            }

        }

        handleTrackbar();

    }, [order]);

    return (
        <div className="trackPath" ref={pathRef}>
            <div className="path">
                <div className="colorPath">
                    <div className="highlightPath"></div>
                    <div className="highlightPath">
                    </div>
                    <div className="progressName"
                        style={{
                            backgroundColor: order?.state == "ORDER PLACED" ? "#28a745" : order?.state == "ORDER SHIPPED" ? "#007bff" : order?.state == "DELIVERED" ? "#fd7e14" : "red"
                        }}
                    >{order?.state}
                        <div className="triangle"

                            style={{
                                borderTopColor: order?.state == "ORDER PLACED" ? "#28a745" : order?.state == "ORDER SHIPPED" ? "#007bff" : order?.state == "DELIVERED" ? "#fd7e14" : "red"
                            }}                    ></div>
                    </div>
                </div>
                <div className="orderPlaced" title="Ordered"></div>
                <div className="orderShipped" title="Shipped"></div>
                <div className="orderDelivered" title="Delivered"></div>
            </div>
        </div>
    );
}
