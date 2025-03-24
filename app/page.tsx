"use client";

import { useState, useEffect } from "react";
import CurriculumContent from "./curriculum";


export default function Home() {
  const [showCurriculum, setShowCurriculum] = useState(false);

  useEffect(() => {
    // Configuración del canvas con efecto Matrix
    const canvas = document.getElementById("matrix") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixChars = "天地玄黄宇宙洪荒0123456789";
    const charsArray = matrixChars.split("");
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // Letras verdes Matrix
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const intervalId = setInterval(draw, 33);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {/* Canvas con efecto Matrix */}
      <canvas id="matrix" className="matrix-canvas" />

      {/* Encabezado 
      <header className="header">
        <div className="header-buttons">
          <button className="btn">Login</button>
          <button className="btn">Register</button>
        </div>
      </header>*/}

      {/* Sección principal (Hero) */}
      <section className="hero">
        <h1 className="hero-title">Welcome to my website</h1>
        <p className="hero-subtitle">|||</p>
        <button
          onClick={() => setShowCurriculum(!showCurriculum)}
          className="hero-btn"
        >
          {showCurriculum ? "Hide CV" : "View Currículum"}
        </button>
      </section>

      {/* Renderizado condicional del currículum */}
      {showCurriculum && <CurriculumContent />}
    </div>
  );
}
