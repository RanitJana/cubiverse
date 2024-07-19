/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import "./User.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { globalContext } from "../../App.jsx";

export default function User() {

    let response = useLoaderData();
    const navigate = useNavigate();

    const { userData, handleServeUserData } = useContext(globalContext);

    useEffect(() => {
        console.log(userData);
        if (!userData) navigate('/login');
    }, [])

    return (
        <>
            <h1>hi</h1>
        </>
    )
}