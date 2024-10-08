/* eslint-disable no-unused-vars */
import { Link, useLoaderData } from "react-router-dom";
import CubeBox from "../CubeBox/CubeBox.jsx";

import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import axios from "axios";
import BouncingLoader from "../BouncingLoader/BouncingLoader.jsx";

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

import "./Home.css"

export default function Home() {

    const [cubeData, setCubeData] = useState(null);

    useEffect(() => {
        const handleMostfav = async () => {
            try {

                document.cookie = "limit=10; path=/";

                let response = (await axios.get(`https://cubiverse-bakend.vercel.app/api/v1/product/most-favourite`, { withCredentials: true })).data

                setCubeData(JSON.parse(response));

            } catch (error) {
                console.log(error);

                setCubeData([]);
            }
        }
        handleMostfav();
    }, [])

    return (
        <>
            {
                !cubeData ?
                    <BouncingLoader />
                    :

                    < div >
                        <section className="second">
                            <Swiper
                                spaceBetween={30}
                                effect={'fade'}
                                centeredSlides={true}
                                navigation={true}
                                loop={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <Link to="">
                                        <picture>
                                            <source media="(min-width:700px)" srcSet="/images/Artboard_2_7_1800x.jpg" />
                                            <source media="(min-width:0px)" srcSet="/images/Artboard_1_7_800x.jpg" />
                                            <img src="/images/Artboard_2_7_1800x.jpg" alt="" />
                                        </picture>
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <picture>
                                        <source media="(min-width:700px)" srcSet="/images/Artboard_2Restock_1800x.jpg" />
                                        <source media="(min-width:0px)" srcSet="/images/Artboard_1Restock_900x.jpg" />
                                        <img src="/images/Artboard_2Restock_1800x.jpg" alt="" />
                                    </picture>
                                    <Link to="">
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <picture>
                                        <source media="(min-width:700px)" srcSet="/images/weekly_deal_banner_generic_web_1800x.jpg" />
                                        <source media="(min-width:0px)" srcSet="/images/weekly_deal_banner_generic_900x.jpg" />
                                        <img src="/images/weekly_deal_banner_generic_web_1800x.jpg" alt="" />
                                    </picture>
                                    <Link to="">
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <picture>
                                        <source media="(min-width:700px)" srcSet="/images/WRM_desktop_banner_ORDER_1800x.jpg" />
                                        <source media="(min-width:0px)" srcSet="/images/WRM_mobile_banner_ORDER_900x.jpg" />
                                        <img src="/images/WRM_desktop_banner_ORDER_1800x.jpg" alt="" />
                                    </picture>
                                    <Link to="">
                                    </Link>
                                </SwiperSlide>
                            </Swiper>
                        </section>
                        <section className="third">
                            <div className="newArrivalTop">
                                <h2>Our Most Favourite Cubes</h2>
                                <Link to="/collections/most-favourite">View All</Link>
                            </div>
                            <div className="newArrivalContainer">

                                {
                                    cubeData.map((cube, idx) => {
                                        return <CubeBox key={idx} cube={{ cube }} />
                                    })
                                }

                            </div>
                        </section>
                    </div >
            }
        </>
    )
}