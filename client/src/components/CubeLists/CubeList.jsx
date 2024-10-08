/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useSearchParams } from "react-router-dom";
import "./CubeList.css";
import CubeBox from "../CubeBox/CubeBox.jsx";
import Filter from "../Filter/Filter.jsx";
import { createContext, useEffect, useState } from "react";
import BouncingLoader from "../BouncingLoader/BouncingLoader.jsx";
import axios from "axios";

const cubeContext = createContext();

export { cubeContext };

export default function CubeList() {

    const params = useLoaderData();
    const [initialData, setInitialData] = useState(null);

    const [cubeData, setCubeData] = useState(null);

    const [isFullLoad, setFullLoad] = useState(false);

    const [loadingState, setLoadingState] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const [sortBy, setSortBy] = useState('manual');

    useEffect(() => {
        async function handleCubeListData() {
            setFullLoad(true);
            try {
                let response = (await axios.get(`https://cubiverse-bakend.vercel.app/api/v1/product/${params.product}`, { withCredentials: true })).data;
                setCubeData(JSON.parse(response));
                setInitialData(JSON.parse(response));

            } catch (error) {
                console.log(error);
                setInitialData([]);
                setCubeData([]);
            }
            setFullLoad(false);
        }
        handleCubeListData();
    }, [params.product]);


    function handleSortBylogic(e) {

        if (searchParams.get("sort_by") === e.target.value) return;

        setSortBy(e.target.value);

    }


    return (
        <cubeContext.Provider value={{ setCubeData, setLoadingState, searchParams, setSearchParams, sortBy }}>
            {
                isFullLoad || !initialData ?
                    <BouncingLoader />
                    :
                    <main>

                        <section className="filter">
                            <Filter value={initialData} />
                        </section>

                        <section className="cubeList">
                            {
                                loadingState ? <div className="loadingAnimation"></div> : ""
                            }

                            <div className="top">
                                <div className="apiBasicInfo">
                                    <h1 style={{ marginBottom: "1rem" }}>{params.product?.toLocaleUpperCase()}</h1>
                                    <div className="apiBasicBottom">
                                        <p>{cubeData.length} Product{cubeData.length > 1 ? "s" : ""}</p>
                                        <div className="sort">
                                            <p>
                                                Sort By
                                            </p>
                                            <select name="productChoice" id="productChoice" onChange={handleSortBylogic}>
                                                <option value="manual" style={{ display: 'none' }}>Default</option>
                                                <option value="selling">Best Selling</option>
                                                <option value="discount">Discount</option>
                                                <option value="a-z">Alphabetically, A-Z</option>
                                                <option value="z-a">Alphabetically, Z-A</option>
                                                <option value="low-high">Price, low to high</option>
                                                <option value="high-low">Price, high to low</option>
                                                <option value="old-new">Date, old to new</option>
                                                <option value="new-old">Date, new to old</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                cubeData.length ?
                                    <div className="bottom">
                                        {
                                            cubeData.map((cube, idx) => {
                                                return <CubeBox key={idx} cube={{ cube }} />
                                            })
                                        }
                                    </div>
                                    :
                                    <div className="cubeListEmpty">
                                        <img src="/images/icons8-empty-box-100.png" alt="" />
                                        <p>No product is found</p>
                                    </div>
                            }

                        </section>
                    </main>
            }
        </cubeContext.Provider>
    )
}
