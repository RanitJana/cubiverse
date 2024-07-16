
import { useRef } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {

    const paraRef = useRef([]);

    const handleToggle = (event) => {

        const parent = event.currentTarget;

        const secondChild = parent.querySelector(':nth-child(2)');

        const height = paraRef.current[parent.getAttribute('data')].scrollHeight;

        if (secondChild) {

            if (secondChild.style.minHeight === '0px' || !secondChild.style.minHeight) {

                secondChild.style.minHeight = height + 'px';
                secondChild.style.marginBottom = "20px";

            }
            else {
                secondChild.style.minHeight = '0px';
                secondChild.style.marginBottom = "0px";
            }

        }

    };


    return (
        <>
            <div className="preFooter">
                <div className="">
                    <img src="../../../public/images/icons8-truck-100.png" alt="" />
                    <div className="topic">Fast Delivery</div>
                    <div className="para">PAN India in 3-5 working days</div>
                </div>
                <div className="">
                    <img src="../../../public/images/icons8-cart-100.png" alt="" />
                    <div className="topic">Easy Replacement Policy</div>
                    <div className="para">Within 7 days of delivery</div>
                </div>
                <div className="">
                    <img src="../../../public/images/icons8-customer-support-48.png" alt="" />
                    <div className="topic">Top-notch support
                    </div>
                    <div className="para">WhatsApp, call or email us</div>
                </div>
                <div className="">
                    <img src="../../../public/images/icons8-payment-32.png" alt="" />
                    <div className="topic">Secure payments</div>
                    <div className="para">Prepaid and Cash on Delivery</div>
                </div>
            </div>
            <footer>
                <div className="elements" style={{ minHeight: "0px" }} data={0} onClick={handleToggle}>
                    <p>About our store</p>
                    <p ref={el => paraRef.current[0] = el}>
                        Cubeiverse.com is India&apos;s leading cubestore. We started back in 2014 with a mission to provide one stop solution to all your speed-cubing needs. We are trusted and loved by 1 million + cubers across the country. We hope you will enjoy the shopping experience with us.
                        Happy Cubing!
                    </p>
                </div>
                <div className="elements" data={1} onClick={handleToggle}>
                    <p>information</p>
                    <p ref={el => paraRef.current[1] = el}>
                        <Link to="/about">About Us</Link>
                        <Link to="/blog">Blog Post</Link>
                        <Link to="/rewards">Rewards Program</Link>
                        <Link to="">Sponsorships</Link>
                        <Link to="">Offers & Discounts</Link>
                        <Link to="">Cubing Talent Hunt</Link>
                        <Link to="">Gift Card</Link>
                        <Link to="">Contact Us</Link>
                    </p>
                </div >
                <div className="elements" data={2} onClick={handleToggle}>
                    <p>Customer service</p>
                    <p ref={el => paraRef.current[2] = el}>
                        <Link to="/faq">FAQ</Link>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/shipping-policy">Shipping Policy</Link>
                        <Link to="/return-policy">Return Policy</Link>
                        <Link to="/replacement-policy">Replacement Policy</Link>
                        <Link to="/terms-and-conditions">Terms and Conditions</Link>
                    </p>
                </div>
                <div className="elements" data={3} onClick={handleToggle}>
                    <p>Support</p>
                    <p ref={el => paraRef.current[3] = el}>
                        For all queries, please reach us on call or WhatsApp on 8080-573-573

                        Timings(Monday-Saturday): 9:30 am to 6:00 pm

                        You can also write to us at support@cubeiverse.com
                    </p>
                </div>
            </footer >
        </>
    )
}