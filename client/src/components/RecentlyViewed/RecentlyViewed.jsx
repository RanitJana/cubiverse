/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import "./RecentlyViewed.css";
import CubeBox from "../CubeBox/CubeBox.jsx";
import { recentViewContext } from "../../App.jsx";

export default function RecentlyViewed() {

    const { products, setProducts } = useContext(recentViewContext);

    useEffect(() => {

        let cubeInformation = localStorage.getItem("cubes");

        if (!cubeInformation) return;

        cubeInformation = JSON.parse(cubeInformation);

        setProducts(cubeInformation);

    }, [])

    return (
        <>
            <div className="pastViewed">
                <h2>Recently viewed products</h2>
                <div className="pastContainers">
                    {
                        products.map((cube, idx) => {
                            return < CubeBox key={idx} cube={{ cube: cube }} />
                        })
                    }
                </div>
            </div>
        </>
    )
}