/* eslint-disable no-unused-vars */
import { useContext } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom"
import { globalContext } from "../../App.jsx";
import axios from "axios";

export default function Register() {

    const navigate = useNavigate();

    const { setColor, setMessage, setVisible } = useContext(globalContext)

    async function handleRegister(e) {
        e.preventDefault();

        try {

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
            let base = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000';
            let response = await axios.post(`/api/v1/register`,
                registerData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            )
            console.log(response);
            let message = response.data.message;

            setVisible(true);
            setMessage(message);
            setColor('green');

            navigate('/login');

        } catch (error) {
            console.log(error);
            let message = error.response.data.message;
            setVisible(true);
            setMessage(message);
            setColor('red');
        }

    }

    return (
        <div className="account">
            <div className="formParents">
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