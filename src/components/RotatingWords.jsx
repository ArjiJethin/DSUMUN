// src/components/RotatingWords.jsx
import React from "react";
import "./RotatingWords.css";

export default function RotatingWords() {
    return (
        <div className="rotating-content">
            <div className="rotating-container">
                <span className="rotating-label">Explore&nbsp;</span>
                <ul className="rotating-list">
                    <li className="rotating-item">our vision</li>
                    <li className="rotating-item">our journey</li>
                    <li className="rotating-item">the team</li>
                    <li className="rotating-item">the agenda</li>
                    <li className="rotating-item">our impact</li>
                    <li className="rotating-item">the speakers</li>
                    <li className="rotating-item">our voices</li>
                    <li className="rotating-item">what's next</li>
                </ul>
            </div>
        </div>
    );
}
