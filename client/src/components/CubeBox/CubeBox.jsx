/* eslint-disable react/prop-types */
import "./CubeBox.css";
import { Link } from "react-router-dom";

export default function CubeBox({ cube }) {

    if (!cube.cube) return;
    cube = cube.cube;

    function handleRatings(ratings) {

        let avarage = ratings.count ? ratings.result / ratings.count : 0;

        let fullStar = Math.floor(avarage);

        let halfStar = Math.ceil(avarage) - fullStar;

        let emptyStar = 5 - Math.ceil(avarage);

        let starUI = [];

        let key = 0;

        for (let i = 0; i < fullStar; i++) {
            starUI.push(<img src="/images/icons8-star-filled-48.png" alt="star" key={key++} />);
        }
        for (let i = 0; i < halfStar; i++) {
            starUI.push(<img src="/images/icons8-star-half-empty-50.png" alt="star" key={key++} />);
        }
        for (let i = 0; i < emptyStar; i++) {
            starUI.push(<img src="/images/icons8-star-48.png" alt="star" key={key++} />);
        }

        return starUI
    }

    return (
        <div className="box">
            {

                cube.New ? <div className="new">new</div> : ""
            }
            {
                cube.ratings.count >= 50 ?
                    (
                        cube.New ?
                            (
                                <div className="bestseller">bestseller</div>
                            )
                            :
                            <div className="bestseller" style={{ top: "2%" }}>bestseller</div>
                    )
                    : ""
            }
            <Link to={`/buy?product=${cube._id}`} >
                <img src={cube.images[0]} alt="cube" />
            </Link>
            <h2>{cube.name}</h2>
            <span className="price">
                {
                    cube.discount ?
                        (<>
                            <div className="finalPrice">₹{Number(cube.price - Math.floor(cube.price * (cube.discount / 100))).toLocaleString()}</div>
                            <div className="actualPrice">₹{Number(cube.price).toLocaleString()}</div>
                            <div className="offer">{cube.discount}% off </div>
                        </>)
                        :
                        (<>
                            <div className="finalPrice">₹{Number(cube.price).toLocaleString()}</div>
                        </>)
                }

            </span>
            <div className="ratings">
                <div className="images">
                    {handleRatings(cube.ratings)}
                </div>
                <span>({cube.ratings.count})</span>
            </div>
            {
                cube.stock ? <div className="inStock">In Stock</div> :
                    <div className="outOfStock">Out Of Stock</div>
            }
            {
                cube.stock ?
                    (
                        <Link to={`/buy?product=${cube._id}`} >
                            <button
                                className="buy"
                                onMouseOver={e => {
                                    e.target.style.cursor = 'pointer';
                                }}
                            >
                                Buy Now</button>
                        </Link>
                    )
                    :
                    <button
                        className="buy"
                        style={{ backgroundColor: "gray" }}
                        disabled
                        onMouseOver={e => {
                            e.target.style.cursor = 'not-allowed';
                        }}
                    >
                        Sold Out</button>
            }

        </div>
    )
}