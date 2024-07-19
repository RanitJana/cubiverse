/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import "../Register/Register.css";
import Cookies from 'js-cookie';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import PopupMessage from "../PopUp/PopUp.jsx";
import { globalContext } from "../../App.jsx";

export default function Login() {

    const [enablePopup, setPopup] = useState(false);
    const [color, setColor] = useState('white');
    const [message, setMessage] = useState("");

    const { changeUserState, setChangeUserState } = useContext(globalContext);

    const navigate = useNavigate();

    async function handleLogin(e) {

        e.preventDefault();

        let [email, password] = [e.target[0].value, e.target[1].value];

        let loginData = {
            email, password
        };
        try {
            console.log('hi');

            let response = await axios.post("http://localhost:5000/api/v1/login", loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            setColor("green");

            setPopup(response.data.message);
            setMessage(response.data.message);

            setChangeUserState(true);

            navigate("/user");

        } catch (error) {

            console.log(error);

            if (error.response.status === 401 || error.response.status === 403 || error.response.status === 500)
                setColor("red");
            setPopup(error.response.data.message);
            setMessage(error.response.data.message);
        }
    }


    return (
        <div className="account">
            <div className="formParents">
                {
                    enablePopup ? <PopupMessage color={color} message={message} /> : ""
                }
                <h2>Login</h2>
                <p>Please fill the information below</p>
                <form onSubmit={handleLogin}>
                    <div className="email">
                        <input type="email" required name="email" id="email" />
                        <span>Email</span>
                    </div>
                    <div className="password">
                        <input type="password" required name="password" id="password" />
                        <span>Password</span>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>New in Cubiverse?<Link to="/register"> register now!!</Link> </p>
            </div>
        </div>
    )
}