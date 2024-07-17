/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';

const PopupMessage = ({ message, color = "red", duration = 3000 }) => {
    const [visible, setVisible] = useState(true);
    const timeoutRef = useRef(null);
    const remainingTimeRef = useRef(duration);
    const startTimeRef = useRef(null);

    useEffect(() => {
        startTimer();
        return () => clearTimeout(timeoutRef.current);
    }, []);

    const startTimer = () => {
        startTimeRef.current = Date.now();
        timeoutRef.current = setTimeout(() => setVisible(false), remainingTimeRef.current);
    };

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        remainingTimeRef.current -= Date.now() - startTimeRef.current;
    };

    const handleMouseLeave = () => {
        startTimer();
    };

    if (!visible) return null;

    return (
        <div
            className="popup-message"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                padding: '10px 20px',
                backgroundColor: `${color}`,
                color: '#fff',
                borderRadius: '5px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
            }}
        >
            {message}
        </div>
    );
};

export default PopupMessage;
