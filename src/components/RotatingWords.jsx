// src/components/RotatingWords.jsx
import React, { useEffect, useRef, useState } from "react";
import "./RotatingWords.css";

const WORDS = [
    { text: "our vision", className: "wisteria" },
    { text: "the team", className: "belize" },
    { text: "our journey", className: "pomegranate" },
    { text: "the agenda", className: "green" },
    { text: "our voices", className: "midnight" },
    { text: "our impact", className: "wisteria" },
    { text: "the speakers", className: "belize" },
    { text: "our voices", className: "pomegranate" },
    { text: "what's next", className: "green" },
];

export default function RotatingWords() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const wordRefs = useRef([]);

    useEffect(() => {
        wordRefs.current.forEach(splitLetters);
        showWord(currentWordIndex);

        const interval = setInterval(() => {
            changeWord();
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    const splitLetters = (el) => {
        const content = el.textContent;
        el.innerHTML = "";
        const letters = [];

        for (let i = 0; i < content.length; i++) {
            const span = document.createElement("span");
            span.className = "letter";
            span.innerHTML = content[i] === " " ? "&nbsp;" : content[i];
            el.appendChild(span);
            letters.push(span);
        }

        el.dataset.letters = JSON.stringify(letters.map((l) => l.outerHTML));
    };

    const showWord = (index) => {
        if (wordRefs.current[index]) {
            wordRefs.current[index].style.opacity = 1;
        }
    };

    const changeWord = () => {
        setCurrentWordIndex((prevIndex) => {
            const currentRef = wordRefs.current[prevIndex];
            const nextIndex = (prevIndex + 1) % wordRefs.current.length;
            const nextRef = wordRefs.current[nextIndex];

            const cw = currentRef.querySelectorAll(".letter");
            const nw = nextRef.querySelectorAll(".letter");

            // Animate current word letters out
            cw.forEach((l, i) => {
                setTimeout(() => {
                    l.className = "letter out";
                }, i * 80);
            });

            // Prepare and animate next word letters in
            nextRef.style.opacity = 1;
            nw.forEach((l, i) => {
                l.className = "letter behind";
                setTimeout(() => {
                    l.className = "letter in";
                }, 340 + i * 80);
            });

            // Hide current word after animation
            setTimeout(() => {
                currentRef.style.opacity = 0;
            }, 340 + nw.length * 80 + 100);

            return nextIndex;
        });
    };

    return (
        <div className="text">
            <p className="label-text">Explore</p>
            <div className="word-wrapper">
                {WORDS.map((word, index) => (
                    <span
                        key={index}
                        className={`word ${word.className}`}
                        style={{
                            position:
                                currentWordIndex === index
                                    ? "relative"
                                    : "absolute",
                        }}
                        ref={(el) => (wordRefs.current[index] = el)}
                    >
                        {word.text}
                    </span>
                ))}
            </div>
        </div>
    );
}
