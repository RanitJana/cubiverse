import { useLoaderData, useParams } from "react-router-dom";
import "./CubeList.css";
import CubeBox from "../CubeBox/CubeBox.jsx";
import Filter from "../Filter/Filter.jsx";
import { createContext, useEffect, useState } from "react";

const cubeContext = createContext();

export { cubeContext };

export default function CubeList() {

    const initialData = useLoaderData();

    const [cubeData, setCubeData] = useState(initialData);

    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        setCubeData(cubeData);
    }, [cubeData]);


    return (
        <cubeContext.Provider value={{ setCubeData, setLoadingState }}>
            <main>
                <section className="filter">
                    <Filter />
                </section>
                <section className="cubeList">
                    {
                        loadingState ? <div className="loadingAnimation"></div> : ""
                    }

                    <div className="top">
                        <div className="apiBasicInfo">
                            <h1 style={{ marginBottom: "1rem" }}>{useParams().product?.toLocaleUpperCase()}</h1>
                            <p>{cubeData.length} Product{cubeData.length > 1 ? "s" : ""}</p>
                        </div>
                    </div>
                    <div className="bottom">

                        {
                            cubeData.map((cube, idx) => {
                                return <CubeBox key={idx} cube={{ cube }} />
                            })
                        }

                    </div>
                </section>
            </main>
        </cubeContext.Provider>
    )
}
