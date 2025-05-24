// src/components/ContactCard.js
import React, { useEffect, useRef } from "react";
import "./ContactCard.css";

export default function ContactCard() {
    const cardRef = useRef();

    useEffect(() => {
        const $card = cardRef.current;
        const $circle = $card.querySelector(".contact-card__circle");
        const $smallCircle = $card.querySelector(".contact-card__smallCircle");
        const $year = $card.querySelector(".contact-card__year");
        const $orangeShine = $card.querySelector(".contact-card__orangeShine");
        const $thankyou = $card.querySelector(".contact-card__thankyou");
        const $comet = $card.querySelector(".contact-card__cometOuter");

        const generateTranslate = (el, e, value) => {
            el.style.transform = `translate(${e.clientX * value}px, ${
                e.clientY * value
            }px)`;
        };

        const cumulativeOffset = (element) => {
            let top = 0,
                left = 0;
            do {
                top += element.offsetTop || 0;
                left += element.offsetLeft || 0;
                element = element.offsetParent;
            } while (element);
            return { top, left };
        };

        const handleMouseMove = (event) => {
            const x =
                ((event.pageX - cumulativeOffset($card).left - 327.5) * -1) /
                100;
            const y =
                ((event.pageY - cumulativeOffset($card).top - 171) * -1) / 100;

            const matrix = [
                [1, 0, 0, -x * 0.00005],
                [0, 1, 0, -y * 0.00005],
                [0, 0, 1, 1],
                [0, 0, 0, 1],
            ];

            generateTranslate($smallCircle, event, 0.03);
            generateTranslate($thankyou, event, 0.03);
            generateTranslate($orangeShine, event, 0.09);
            generateTranslate($circle, event, 0.05);
            generateTranslate($year, event, 0.03);
            generateTranslate($comet, event, 0.05);

            $card.style.transform = `matrix3d(${matrix.toString()})`;
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="contact-card__wrapper">
            <div className="contact-card" ref={cardRef}>
                <div className="contact-card__year">
                    Contact
                    <br />
                    Us
                </div>
                <div className="contact-card__cometOuter">
                    <div className="contact-card__comet"></div>
                    <div className="contact-card__comet contact-card__comet--second"></div>
                </div>
                <div className="contact-card__circle"></div>
                <div className="contact-card__smallCircle"></div>
                <div className="contact-card__orangeShine"></div>
                <div className="contact-card__greenShine"></div>
                <div className="contact-card__thankyou"></div>
                <div className="contact-card__outer-year">
                    <span>
                        <a
                            href="https://in.linkedin.com/company/dsu-model-united-nations-society"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="icon fab fa-linkedin"></i>
                        </a>
                    </span>
                    <span>
                        <a
                            href="https://www.instagram.com/dsu_munsoc/?igsh=MWwydW53a28yeTIyYw%3D%3D"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="icon fab fa-instagram"></i>
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
}
