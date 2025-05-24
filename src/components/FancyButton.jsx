// src/components/FancyButton.jsx
import React, { useRef } from "react";
import "./FancyButton.css";

export default function FancyButton({ children, onClick, ...props }) {
    const btnRef = useRef(null);

    const handleMouseMove = (e) => {
        const btn = btnRef.current;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        btn.style.setProperty("--x", `${x}px`);
        btn.style.setProperty("--y", `${y}px`);
    };

    return (
        <button
            className="custom-btn btn-aware"
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onClick={onClick}
            {...props}
        >
            {children}
            <span className="aware-bg" />
        </button>
    );
}
