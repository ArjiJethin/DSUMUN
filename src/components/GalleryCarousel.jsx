import React, { useState, useEffect } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { useSwipeable } from "react-swipeable";
import "./GalleryCarousel.css";

const getMaxVisibility = () => (window.innerWidth < 768 ? 0 : 3);

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
    const [active, setActive] = useState(0);
    const [maxVisibility, setMaxVisibility] = useState(getMaxVisibility());
    const count = React.Children.count(children);

    useEffect(() => {
        const handleResize = () => {
            setMaxVisibility(getMaxVisibility());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const goLeft = () => setActive((i) => Math.max(0, i - 1));
    const goRight = () => setActive((i) => Math.min(count - 1, i + 1));

    const swipeHandlers = useSwipeable({
        onSwipedLeft: goRight,
        onSwipedRight: goLeft,
        preventDefaultTouchmoveEvent: true,
        trackMouse: false,
    });

    return (
        <div className="carousel" {...swipeHandlers}>
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
                        "--offset": maxVisibility === 0 ? 0 : (active - i) / 3,
                        "--direction": Math.sign(active - i),
                        "--abs-offset":
                            maxVisibility === 0 ? 0 : Math.abs(active - i) / 3,
                        pointerEvents: i === active ? "auto" : "none",
                        opacity:
                            maxVisibility === 0
                                ? i === active
                                    ? "1"
                                    : "0"
                                : Math.abs(active - i) >= maxVisibility
                                ? "0"
                                : "1",
                        display:
                            maxVisibility === 0
                                ? i === active
                                    ? "flex"
                                    : "none"
                                : Math.abs(active - i) > maxVisibility
                                ? "none"
                                : "block",
                        ...(maxVisibility === 0
                            ? {
                                  transform: "none",
                                  position: "relative",
                              }
                            : {}),
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
