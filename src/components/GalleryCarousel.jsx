// src/components/GalleryCarousel.js
import React, { useState } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import "./GalleryCarousel.css";

const MAX_VISIBILITY = 3;

const Card = ({
    imageUrl,
    title = "Gallery Title",
    description = "This is a sample image description.",
}) => (
    <div className="gallery-card">
        <div className="image-container">
            <img src={imageUrl} alt="Gallery item" className="gallery-image" />
            <div className="image-overlay">
                <div className="overlay-text">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    </div>
);

const Carousel = ({ children }) => {
    const [active, setActive] = useState(0); // instead of 2
    const count = React.Children.count(children);

    const goLeft = () => setActive((i) => Math.max(0, i - 1));
    const goRight = () => setActive((i) => Math.min(count - 1, i + 1));

    return (
        <div className="carousel">
            <button
                className="nav left"
                onClick={goLeft}
                disabled={active <= 0}
            >
                <TiChevronLeftOutline />
            </button>

            {React.Children.map(children, (child, i) => (
                <div
                    className="card-container"
                    style={{
                        "--active": i === active ? 1 : 0,
                        "--offset": (active - i) / 3,
                        "--direction": Math.sign(active - i),
                        "--abs-offset": Math.abs(active - i) / 3,
                        pointerEvents: active === i ? "auto" : "none",
                        opacity:
                            Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
                        display:
                            Math.abs(active - i) > MAX_VISIBILITY
                                ? "none"
                                : "block",
                    }}
                >
                    {child}
                </div>
            ))}

            <button
                className="nav right"
                onClick={goRight}
                disabled={active >= count - 1}
            >
                <TiChevronRightOutline />
            </button>
        </div>
    );
};

export default function GalleryCarousel() {
    return (
        <div className="gallery-carousel-wrapper">
            <Carousel>
                {[...new Array(10)].map((_, i) => (
                    <Card
                        key={i}
                        imageUrl={`https://picsum.photos/600/600?random=${
                            i + 1
                        }`}
                        title={`Gallery ${i + 1}`}
                        description="This is a placeholder description for the image."
                    />
                ))}
            </Carousel>
        </div>
    );
}
