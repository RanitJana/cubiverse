import { Link, NavLink } from "react-router-dom";
import "./CubeCollection.css";

export default function CubeCollection() {
    return (
        <section className="first">
            <NavLink activeclassname="active" to="/collections/3x3">
                <div className="imgCover">
                    <img src="/images/3x3jpg.jpg" alt="3X3" decoding="async" title="Cube" />
                </div>
                <span>3x3</span>
            </NavLink>
            <NavLink activeclassname="active" to="/collections/2x2">
                <div className="imgCover">
                    <img src="/images/2x2jpg.jpg" alt="2x2" decoding="async" title="Cube" />
                </div>
                <span>2x2</span>
            </NavLink>
            <NavLink activeclassname="active" to="/collections/pyraminx">
                <div className="imgCover">
                    <img src="/images/pyraminx.jpg" alt="pyraminx" decoding="async" title="Cube" />
                </div>
                <span>pyraminx</span>
            </NavLink>
            <NavLink activeclassname="active" to="/collections/megaminx">
                <div className="imgCover">
                    <img src="/images/megaminx.jpg" alt="megaminx" decoding="async" title="Cube" />
                </div>
                <span>megaminx</span>
            </NavLink>
            <NavLink activeclassname="active" to="/collections/4x4">
                <div className="imgCover">
                    <img src="/images/4x4.jpg" alt="4x4" decoding="async" title="Cube" />
                </div>
                <span>4x4</span>
            </NavLink>
            <NavLink activeclassname="active" to="/collections/big cubes">
                <div className="imgCover">
                    <img src="/images/bigCubejpg.jpg" alt="big cubes" decoding="async" title="Cube" />
                </div>
                <span>Big cubes</span>
            </NavLink>
            <NavLink activeclassname="active" to="/collections/mirror cubes">
                <div className="imgCover">
                    <img src="/images/mirrorCube.jpg" alt="mirror cubes" decoding="async" title="Cube" />
                </div>
                <span>mirror cube</span>
            </NavLink>
            <NavLink activeclassname="active" to="/collections/timer">
                <div className="imgCover">
                    <img src="/images/timerjpg.jpg" alt="timer" decoding="async" title="Cube" />
                </div>
                <span>timer</span>
            </NavLink>
            <NavLink activeclassname="active" to="/collections/lubricants">
                <div className="imgCover">
                    <img src="/images/lubricate.jpg" alt="lubricants" decoding="async" title="Cube" />
                </div>
                <span>lubricants</span>
            </NavLink>
            <NavLink activeclassname="active" to="/collections/odd shape">
                <div className="imgCover">
                    <img src="/images/odd.jpg" alt="odd shaped" decoding="async" title="Cube" />
                </div>
                <span>odd shape</span>
            </NavLink>
        </section>
    )
}