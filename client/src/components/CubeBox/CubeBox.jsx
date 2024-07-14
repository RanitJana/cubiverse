import "./CubeBox.css";

export default function CubeBox(props) {

    let cube = props.cube.cube;


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
                cube.New ? <div className="bestseller">bestseller</div> : <div className="bestseller" style={{ top: "2%" }}>bestseller</div>
            }

            <img src={cube.images[0]} alt="cube" />
            <h2>{cube.name}</h2>
            <span className="price">
                {
                    cube.discount ?
                        (<>
                            <div className="finalPrice">₹{cube.price - Math.floor(cube.price * (cube.discount / 100))}</div>
                            <div className="actualPrice">₹{cube.price}</div>
                            <div className="offer">{cube.discount}% off </div>
                        </>)
                        :
                        (<>
                            <div className="finalPrice">₹{cube.price}</div>
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
                    <button
                        className="buy"
                        onMouseOver={e => {
                            e.target.style.cursor = 'pointer';
                        }}
                    >
                        Buy Now</button> :
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