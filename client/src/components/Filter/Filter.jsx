import "./Filter.css";
import { useLoaderData } from "react-router-dom";
import { cubeContext } from "../CubeLists/CubeList.jsx";
import { useState, useEffect, useContext, useRef } from "react";

export default function Filter() {

    let data = useLoaderData();
    let max = 10000;

    const { setCubeData, setLoadingState, searchParams, setSearchParams, sortBy } = useContext(cubeContext);

    const [currMinRange, setCurrMinRange] = useState(0)
    const [currMaxRange, setCurrMaxRange] = useState(max)


    const [currChoosenCompany, setCompany] = useState('All');
    let [trackCompanyCheckbox, setCompanyCheckBox] = useState(() => {
        let arr = new Array(data.length + 1).fill(false);
        arr[0] = true;
        return arr;
    })
    const updateDuration = useRef(null);

    useEffect(() => {
        const highlightElem = document.querySelector('.range-highlight');

        const minPercent = (currMinRange / max) * 100;
        const maxPercent = (currMaxRange / max) * 100;

        if (highlightElem) {
            highlightElem.style.left = `${minPercent}%`;
            highlightElem.style.right = `${100 - maxPercent}%`;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currMinRange, currMaxRange]);

    useEffect(() => {
        let obj = {
            minPrice: currMinRange,
            maxPrice: currMaxRange,
            company: currChoosenCompany,
            sort_by: sortBy
        };

        addFilterQuery(obj);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, currMaxRange, currMinRange, currChoosenCompany, sortBy]);

    function addFilterQuery(obj) {
        if (updateDuration.current) {
            clearTimeout(updateDuration.current);
        }

        const newSearchParams = new URLSearchParams(obj);
        if (newSearchParams.toString() !== searchParams.toString()) {
            setLoadingState(true);
            updateDuration.current = setTimeout(() => {

                setSearchParams(newSearchParams);
                setCubeData(() => {
                    let ans = data.filter(val => {
                        let price = val.price * (1 - val.discount / 100);
                        return (
                            price >= Number(newSearchParams.get("minPrice")) &&
                            price <= Number(newSearchParams.get("maxPrice")) &&
                            (newSearchParams.get("company") === "All" || newSearchParams.get("company") === val.company)
                        );
                    });
                    //sort by logic
                    if (sortBy == "discount") {
                        ans.sort((a, b) => a.discount < b.discount ? 1 : -1)
                    }
                    else if (sortBy == "a-z") {
                        ans.sort((a, b) => a.name > b.name ? 1 : -1)
                    }
                    else if (sortBy == "z-a") {
                        ans.sort((a, b) => a.name < b.name ? 1 : -1)
                    }
                    else if (sortBy == "low-high") {
                        ans.sort((a, b) => {
                            let aPrice = a.price - Math.floor(a.price * (a.discount / 100));
                            let bPrice = b.price - Math.floor(b.price * (b.discount / 100))

                            return aPrice > bPrice ? 1 : -1;
                        })
                    }
                    else if (sortBy == "high-low") {
                        ans.sort((a, b) => {
                            let aPrice = a.price - Math.floor(a.price * (a.discount / 100));
                            let bPrice = b.price - Math.floor(b.price * (b.discount / 100))

                            return aPrice < bPrice ? 1 : -1;
                        })
                    }
                    else if (sortBy == "old-new") {
                        //no need to implement logic .. it'll give value by default
                    }
                    else if (sortBy == "new-old") {
                        ans.sort((a, b) => {
                            return (Date.parse(a.createdAt)) < (Date.parse(b.createdAt)) ? 1 : -1;
                        })
                    }
                    setLoadingState(false);
                    return ans;
                });
            }, 500);
        }
    }

    function handleCloseFilterTags(e) {

        let currNodeImage = e.target.lastChild;

        let toggleNode = e.target.parentNode.lastChild;

        if (toggleNode.style.height == "0px") {

            toggleNode.style.height = toggleNode.scrollHeight + 'px';
            toggleNode.style.marginTop = "1rem";
            toggleNode.style.opacity = 1;

            currNodeImage.style.transform = 'rotate(-90deg)';
        }
        else {
            toggleNode.style.height = '0px';
            toggleNode.style.marginTop = 0;
            toggleNode.style.opacity = 0;

            currNodeImage.style.transform = 'rotate(90deg)';
        }
    }

    function handleMinValue(e) {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value)) return;
        if (value <= currMaxRange) {
            setCurrMinRange(value);
        } else {
            setCurrMinRange(currMaxRange);
        }
    }

    function handleMaxValue(e) {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value) || value > max) return;
        if (value >= currMinRange) {
            setCurrMaxRange(value);
        } else {
            setCurrMaxRange(currMinRange);
        }
    }

    function handleCompanyName() {

        let companies = {};

        data.forEach(val => {
            companies[val.company] = companies[val.company] ? companies[val.company] + 1 : 1
        })
        let companyArr = [];

        for (let key in companies) {
            companyArr.push({
                name: key,
                stock: companies[key]
            })
        }
        return companyArr;
    }

    function handleQueryCompanyName(e) {
        if (e.target.name !== searchParams.get('company')) return setCompany(e.target.name);
        setCompany(null);
    }

    return (
        <div className="filter">
            <h2>Filters</h2>
            <form action="" onSubmit={e => e.preventDefault()}>

                <div className="filterPrice">
                    <p onClick={handleCloseFilterTags}>Price<img src="/images/icons8-arrow-48.png" alt="arrow" /></p>
                    <div className="filterPriceChild">

                        <div className="range-slider">
                            <div className="range-track"></div>
                            <div className="range-highlight"></div>
                            <input
                                type="range" name="minRange" id="minRange"
                                value={currMinRange}
                                min={0}
                                max={max}
                                onChange={handleMinValue}
                            />
                            <input
                                type="range" name="maxRange" id="maxRange"
                                value={currMaxRange}
                                min={0}
                                max={max}
                                onChange={handleMaxValue}
                            />
                        </div>
                        <div className="displayRange">
                            <div className="numberContainer">
                                <input type="number"
                                    value={currMinRange}
                                    min={0}
                                    max={max}
                                    onChange={handleMinValue}
                                />
                                <span>₹</span>
                            </div>
                            <span>-</span>
                            <div className="numberContainer">

                                <input type="number"
                                    value={currMaxRange}
                                    min={0}
                                    max={max}
                                    onChange={handleMaxValue}
                                />
                                <span>₹</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="filterCompany">
                    <p onClick={handleCloseFilterTags}>Company<img src="/images/icons8-arrow-48.png" alt="arrow" /></p>

                    <div className="filterCompanyChild">
                        <div key={Date.now() + 0} className="checkbox-container">
                            <input
                                type="checkbox"
                                name="All"
                                id={"checkBox"}
                                onClick={handleQueryCompanyName}
                                checked={trackCompanyCheckbox[0]}
                                onChange={() => {
                                    trackCompanyCheckbox = trackCompanyCheckbox.map((val, idx) => {
                                        return idx == 0 ? !val : false;
                                    })
                                    return setCompanyCheckBox(trackCompanyCheckbox);
                                }}
                            />
                            <label htmlFor={"checkBox"}>All &nbsp;({data.length})</label>
                        </div>
                        {handleCompanyName().map((val, index) => {
                            return (
                                <div key={(index + 1) + Date.now()} className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        name={val.name}
                                        id={"checkBox" + (index + 1)}
                                        onClick={handleQueryCompanyName}
                                        checked={trackCompanyCheckbox[index + 1]}
                                        onChange={() => {
                                            trackCompanyCheckbox = trackCompanyCheckbox.map((val, idx) => {
                                                return idx == index + 1 ? !val : false;
                                            })
                                            return setCompanyCheckBox(trackCompanyCheckbox);
                                        }}
                                    />
                                    <label htmlFor={"checkBox" + (index + 1)}>{val.name}&nbsp; ({val.stock})</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </form>
        </div >
    )
}