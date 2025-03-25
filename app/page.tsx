"use client";
import { useState } from "react";
import CurriculumContent from "./curriculum";

// Importamos nuestros componentes separados
import ProjectsSlider from "./components/ProjectsSlider";
import MatrixCanvas from "./components/MatrixCanvas";
import ChatBot from "./components/ChatBot";

export default function Home() {
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showAI, setShowAI] = useState(false);

  return (
    <div>
      {/* Canvas con efecto Matrix */}
      <MatrixCanvas />

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

        <button
          onClick={() => setShowProjects(!showProjects)}
          className="hero-btn secondary"
        >
          {showProjects ? "Hide Projects" : "View mockups"}
        </button>

        <button
          onClick={() => setShowAI(!showAI)}
          className="hero-btn ai-btn"
        >
          {showAI ? "Close AI" : "Ask AI"}
        </button>
      </section>

      {/* Slider de imágenes */}
      {showProjects && <ProjectsSlider />}

      {/* Renderizado condicional del currículum */}
      {showCurriculum && <CurriculumContent />}

      {/* ChatBot */}
      {showAI && <ChatBot />}
    </div>
  );
}
