/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate, Link } from "react-router-dom";
import { globalContext } from "../../App.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import "./Address.css";
import axios from "axios";

export default function Address() {
    const navigate = useNavigate();
    const { userData, setColor, setMessage, setVisible } = useContext(globalContext);
    const [address, setAddress] = useState([]);
    const [addAddressSection, setAddAddressSection] = useState(false);
    const [editAddressSection, setEditAddressSection] = useState(false);

    useEffect(() => {
        setAddress(userData?.data?.user?.address);
    }, [userData]);

    const addressSectionRef = useRef(null);
    const editAddressSectionRef = useRef(null);

    function handleClickOutside(e) {
        if (addressSectionRef.current && !addressSectionRef.current.contains(e.target)) {
            setAddAddressSection(false);
        }
        if (editAddressSectionRef.current && !editAddressSectionRef.current.contains(e.target)) {
            setEditAddressSection(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    async function handleAddAddress(e) {
        e.preventDefault();

        try {
            let base = import.meta.env.BACKEND_URI || "";
            const response = await axios.post(`${base}/api/v1/address/add`,
                {
                    address: e.target[0].value,
                    pincode: e.target[1].value
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            setAddAddressSection(false);
            setAddress(prev => [
                ...prev,
                { location: e.target[0].value, pincode: e.target[1].value }
            ]);


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
    }

    const [currAddress, setCurrAddress] = useState(null);

    async function handleEditAddress(e) {
        e.preventDefault();

        if (currAddress == null) return;

        try {
            let index = currAddress;
            let base = import.meta.env.BACKEND_URI || "";
            const response = await axios.post(`${base}/api/v1/address/edit/${index}`,
                {
                    address: e.target[0].value,
                    pincode: e.target[1].value
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            setEditAddressSection(false);
            setAddress(prev => {
                let newArr = [...prev]
                newArr[index] = {
                    location: e.target[0].value,
                    pincode: e.target[1].value
                }
                return newArr;
            });

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
    }

    async function handleDeleteAddress(e, index) {
        try {
            let base = import.meta.env.BACKEND_URI || "";
            const response = await axios.post(`${base}/api/v1/address/delete/${index}`, {}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            setAddress(prev => {
                const newAddress = [...prev];
                newAddress.splice(index, 1);
                return newAddress;
            });

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
    }

    const [valueLocation, setValueLocation] = useState('');
    const [valuePincode, setValuePincode] = useState('');

    useEffect(() => {
        if (address[currAddress]) {
            setValueLocation(address[currAddress].location || "");
            setValuePincode(address[currAddress].pincode || "");
            // document.querySelector('.editAddressSection').classList.remove('temp');
        }
    }, [editAddressSection])


    return (
        <>
            {addAddressSection && (
                <div className="addAddressSection">
                    <form ref={addressSectionRef} onSubmit={handleAddAddress}>
                        <div className="addressParent">
                            <input type="text" name="address" id="address" required />
                            <span>Address</span>
                        </div>
                        <div className="pincodeParent">
                            <input type="number" name="pincode" id="pincode" required />
                            <span>Pin code</span>
                        </div>
                        <button type="submit">Add address</button>
                    </form>
                </div>
            )}
            {editAddressSection && (
                <div className="editAddressSection temp">
                    <form ref={editAddressSectionRef} onSubmit={handleEditAddress}>
                        <div className="addressParent">
                            <input type="text" name="address" id="address" required
                                value={valueLocation} onChange={
                                    e => {
                                        setValueLocation(e.target.value);
                                    }
                                } />
                            <span>Address</span>
                        </div>
                        <div className="pincodeParent">
                            <input type="number" name="pincode" id="pincode" required
                                value={valuePincode} onChange={
                                    e => {
                                        setValuePincode(e.target.value);
                                    }
                                } />
                            <span>Pincode</span>
                        </div>
                        <button type="submit">Edit address</button>
                    </form>
                </div>
            )}
            <div className="myAddress">
                <div className="top">
                    <p>My addresses ({address?.length})</p>
                    <button onClick={() => setAddAddressSection(true)}>Add address</button>
                </div>
                <div className="bottom">
                    {address?.map((tempAddress, index) => (
                        <div key={index} className="componentAddress">
                            <p>{tempAddress.location}</p>
                            <p>Pin code: {tempAddress.pincode}</p>
                            <div className="edit">
                                <button onClick={
                                    () => {
                                        setCurrAddress(index)
                                        setEditAddressSection(true)
                                    }
                                }
                                >edit</button>
                                <button onClick={(e) => handleDeleteAddress(e, index)}>delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
