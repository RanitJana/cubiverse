/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import "./User.css";
import { useNavigate, Outlet, NavLink, Link } from "react-router-dom";
import { globalContext } from "../../App.jsx";
import axios from "axios";

export default function User() {
    const navigate = useNavigate();

    const { setColor, setMessage, setVisible, setAuthUser, setChangeUserState, setUserData } = useContext(globalContext);

    async function handleLogOut(e) {
        try {
            let response = await axios.post("http://localhost:5000/api/v1/logout", {}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            setChangeUserState(prev => prev + 1);
            setAuthUser(false);
            setUserData(null);
            navigate("/login")

            setVisible(true);
            setMessage(response.data.message);
            setColor('green');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="userSection">
            <div className="userSectionLeft">
                <NavLink
                    to='/user'
                    end
                    activeclassname="active"
                >
                    Order history
                </NavLink>
                <NavLink
                    to='/user/address'
                    activeclassname="active"
                >
                    Address
                </NavLink>
                <Link onClick={handleLogOut} end activeclassname="active">Log out</Link>
            </div>
            <Outlet />
        </div>
    )
}