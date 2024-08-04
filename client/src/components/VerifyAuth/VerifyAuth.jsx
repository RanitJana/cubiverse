/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { globalContext } from "../../App.jsx";
import { Outlet, useNavigate } from "react-router-dom";

export function VerifyAuth() {

    let navigate = useNavigate();
    const { userData, isAuthUser, setAuthUser, setColor, setMessage, setVisible, isLoading, changeUserState } = useContext(globalContext);

    useEffect(() => {
        if (!isLoading) {
            if (userData) {
                setAuthUser(true);
            }
            else {
                let message = "You need to login first";
                setVisible(true);
                setMessage(message);
                setColor('red');
                navigate('/login')
            }
        }

    }, [isLoading, changeUserState]);

    return !isLoading && isAuthUser && userData ? (
        <Outlet />
    ) : null;
}