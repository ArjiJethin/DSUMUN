// src/components/FancyButton.jsx
import React from "react";
import "./FancyButton.css";

export default function FancyButton({ children, onClick, ...props }) {
    return (
        <button className="custom-btn btn-9" onClick={onClick} {...props}>
            {children}
        </button>
    );
}
