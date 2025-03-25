"use client";
import { useState, useEffect } from "react";

export default function ProjectsSlider() {
  const images = [
    "/mongo db.png",
    "/ducaplast.png",
    "/brain capacity.png",
    "/prompts.png",
    "/catalogo.png",
    "/productos.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia de imagen cada 3 segundos
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-container">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          className={`slider-image ${index === currentIndex ? "active" : ""}`}
        />
      ))}
    </div>
  );
}
