"use client";

import { useState, useEffect, useMemo } from "react";

export default function ImageSlider() {
  const images = useMemo(() => ["/ali.png", "/mente.png", "/moon.png", "/proverbios.png"], []);
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((x) => (x + 1) % images.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="images-section">
      <div
        className="images-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "15px", // Espacio entre imágenes
          margin: "20px auto",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: 20,
          borderRadius: 8,
          flexWrap: "wrap",
        }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Imagen ${idx + 1}`}
            style={{
              width: "23%", // Aumentado el tamaño
              height: "auto",
              objectFit: "cover",
              opacity: idx === i ? 1 : 0.5, // Imagen activa más visible
              transition: "opacity 1s ease-in-out",
              borderRadius: "8px",
              filter: idx === i ? "none" : "grayscale(50%)", // Suaviza el cambio
            }}
          />
        ))}
      </div>
    </section>
  );
}
