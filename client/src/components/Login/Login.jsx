/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import "../Register/Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import { globalContext } from "../../App.jsx";

export default function Login() {

    const { setVisible, setMessage, setColor, setChangeUserState } = useContext(globalContext);

    const [submitFrom, setSubmitForm] = useState(false);

    const navigate = useNavigate();

    async function handleLogin(e) {

        e.preventDefault();

        let [email, password] = [e.target[0].value, e.target[1].value];

        let loginData = {
            email, password
        };

        setSubmitForm(true);

        try {
            let base = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000';

            let response = await axios.post(`https://cubiverse-bakend.vercel.app/api/v1/login`, loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            setChangeUserState(true);

            // navigate("/");

            let message = response.data.message;
            setVisible(true);
            setMessage(message);
            setColor('green');

        } catch (error) {

            console.log(error);

            let message = error.response.data.message;
            setVisible(true);
            setMessage(message);
            setColor('red');
        }

        setSubmitForm(false);
    }

    return (
        <div className="account">
            <div className="formParents">
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
                    {
                        submitFrom ?
                            <button style={{ backgroundColor: "rgb(255, 124, 76)" }} >Loading...</button>
                            :
                            <button type="submit">Login</button>
                    }
                </form>
                <p>New in Cubiverse?<Link to="/register"> register now!!</Link> </p>
            </div>
        </div>
    )
}