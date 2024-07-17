/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom"
import PopupMessage from "../PopUp/PopUp.jsx";


export default function Register() {

    const [enablePopup, setPopup] = useState(false);
    const [color, setColor] = useState('white');
    const [message, setMessage] = useState("");


    async function handleRegister(e) {
        e.preventDefault();

        let [firstName, lastName, email, password, confirmPassword, contactNumber1, address, pincode]
            = [e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value, e.target[4].value, e.target[5].value, e.target[6].value, e.target[7].value]

        let registerData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            contactNumber1,
            address,
            pincode
        };

        let getFetch = await fetch("http://127.0.0.1:5000/api/v1/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })

        let resposnse = await getFetch.json();

        if (getFetch.status == 401 || getFetch.status == 403 || getFetch.status == 500) setColor("red");
        else setColor("green");

        setPopup(resposnse.message);
        setMessage(resposnse.message);

    }

    return (
        <div className="account">
            <div className="formParents">
                {
                    enablePopup ? <PopupMessage color={color} message={message} /> : ""
                }
                <h2>Create my account</h2>
                <p>Please fill the information below</p>
                <form onSubmit={handleRegister}>
                    <div className="firstName">
                        <input type="text" required name="firstName" id="firstName" />
                        <span>First Name</span>
                    </div>
                    <div className="lastName">
                        <input type="text" required name="lastName" id="lastName" />
                        <span>Last Name</span>
                    </div>
                    <div className="email">
                        <input type="email" required name="email" id="email" />
                        <span>Email</span>
                    </div>
                    <div className="password">
                        <input type="password" required name="password" id="password" />
                        <span>Password</span>
                    </div>
                    <div className="confirmPassword">
                        <input type="password" required name="confirmPassword" id="confirmPassword" />
                        <span>Confirm password</span>
                    </div>
                    <div className="contactNumber1">
                        <input type="number" required name="contactNumber1" id="contactNumber1" />
                        <span>Contact number</span>
                    </div>
                    <div className="address">
                        <input type="text" required name="address" id="address" />
                        <span>Address</span>
                    </div>
                    <div className="pincode">
                        <input type="number" max={999999} min={110001} required name="pincode" id="pincode" />
                        <span>Pincode</span>
                    </div>
                    <button type="submit">Create account</button>
                </form>
                <p>Already have an account? <Link to="/login">Login here</Link> </p>
            </div>
        </div>
    )
}