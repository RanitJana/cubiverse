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


                orderPlaced.style.backgroundColor = "blue";
                path.style.width = `${progress}%`;

                if (progress >= 50) {
                    orderShipped.style.backgroundColor = "blue";
                }
                if (progress == 100) {
                    orderDelivered.style.backgroundColor = "blue";
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
                    <div className="highlightPath"></div>

                </div>
                <div className="orderPlaced" title="Ordered"></div>
                <div className="orderShipped" title="Shipped"></div>
                <div className="orderDelivered" title="Delivered"></div>
            </div>
        </div>
    );
}
