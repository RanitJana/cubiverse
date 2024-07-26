/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useContext } from 'react';
import { globalContext } from '../../App.jsx';

const PopupMessage = () => {
    const { visible, setVisible, color, message } = useContext(globalContext);
    const visibleRef = useRef(null);

    useEffect(() => {
        if (visible) {
            clearTimeout(visibleRef.current);
            visibleRef.current = setTimeout(() => {
                setVisible(false);
            }, 3000);
        }

        return () => {
            clearTimeout(visibleRef.current);
        };
    }, [visible, setVisible, message, color]);

    return (
        visible && (
            <div
                className="popup-message"
                style={{
                    position: 'fixed',
                    margin: '1rem',
                    top: '10rem',
                    right: '0',
                    wordBreak: 'break-all',
                    padding: '10px 20px',
                    backgroundColor: color,
                    color: '#fff',
                    borderRadius: '5px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    zIndex: 1000,
                }}
            >
                {message}
            </div>
        )
    );
};

export default PopupMessage;
