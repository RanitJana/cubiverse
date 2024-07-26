/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { globalContext } from "../../App.jsx";
import { Outlet, useNavigate } from "react-router-dom";

export function VerifyAuth() {

    let navigate = useNavigate();

    const { userData, changeUserState, isAuthUser, setAuthUser, setColor, setMessage, setVisible } = useContext(globalContext);

    useEffect(() => {
        if (userData)
            setAuthUser(true);
        else {
            let message = "You need to login first"
            setVisible(true);
            setMessage(message);
            setColor('red');
            navigate("/login");
        }
    }, [userData, changeUserState, isAuthUser])

    return isAuthUser && <Outlet />
}