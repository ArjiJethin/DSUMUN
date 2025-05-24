// src/components/MorphingText.jsx
import React, { useEffect } from "react";
import "./MorphingText.css";

const MorphingText = ({ texts = ["Welcome", "to", "DSUMUN", "III"] }) => {
    useEffect(() => {
        const elts = {
            text1: document.getElementById("text1"),
            text2: document.getElementById("text2"),
        };

        let textIndex = texts.length - 1;
        let time = new Date();
        let morph = 0;
        let cooldown = 0.25;

        const morphTime = 1;
        const cooldownTime = 0.25;

        function doMorph() {
            morph -= cooldown;
            cooldown = 0;

            let fraction = morph / morphTime;
            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }

            setMorph(fraction);
        }

        function setMorph(fraction) {
            elts.text2.style.filter = `blur(${Math.min(
                8 / fraction - 8,
                100
            )}px)`;
            elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            fraction = 1 - fraction;
            elts.text1.style.filter = `blur(${Math.min(
                8 / fraction - 8,
                100
            )}px)`;
            elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            elts.text1.textContent = texts[textIndex % texts.length];
            elts.text2.textContent = texts[(textIndex + 1) % texts.length];
        }

        function doCooldown() {
            morph = 0;
            elts.text2.style.filter = "";
            elts.text2.style.opacity = "100%";
            elts.text1.style.filter = "";
            elts.text1.style.opacity = "0%";
        }

        function animate() {
            requestAnimationFrame(animate);
            let newTime = new Date();
            let dt = (newTime - time) / 1000;
            time = newTime;
            let shouldIncrementIndex = cooldown > 0;

            cooldown -= dt;

            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex++;
                }
                doMorph();
            } else {
                doCooldown();
            }
        }

        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];
        animate();
    }, [texts]);

    return (
        <div id="container">
            <span id="text1"></span>
            <span id="text2"></span>
            <svg id="filters">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 255 -140"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default MorphingText;
