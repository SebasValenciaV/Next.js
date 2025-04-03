"use client";

import { useState } from "react";
import MatrixCanvas from "./components/MatrixCanvas";
import ProjectsSlider from "./components/ProjectsSlider";
import ChatBot from "./components/ChatBot";
import CurriculumContent from "./components/curriculum";
import LanguageSwitcher from "./components/LanguageSwitcher";
import MusicSection from "./components/Music";
import SpaceShooterGame from "./components/SpaceShooterGame";
import ImageSlider from "./components/images"; // Importamos el nuevo componente de imágenes

export default function Page() {
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [language, setLanguage] = useState("en");

  return (
    <div>
      {/* Canvas con efecto Matrix */}
      <MatrixCanvas />

      {/* Selector de Idioma */}
      <LanguageSwitcher currentLanguage={language} onSwitch={setLanguage} />

      <section className="hero">
        <h1 className="hero-title">
          {language === "es" ? "Bienvenido a mi sitio web" : "Welcome to my website"}
        </h1>

        <button onClick={() => setShowCurriculum(!showCurriculum)} className="hero-btn">
          {showCurriculum
            ? language === "es" ? "Ocultar CV" : "Hide CV"
            : language === "es" ? "Ver Currículum" : "View CV"}
        </button>

        <button onClick={() => setShowProjects(!showProjects)} className="hero-btn secondary">
          {showProjects
            ? language === "es" ? "Ocultar Proyectos" : "Hide Projects"
            : language === "es" ? "Ver Mockups" : "See mockups"}
        </button>

        <button onClick={() => setShowAI(!showAI)} className="hero-btn ai-btn">
          {showAI
            ? language === "es" ? "Cerrar ChatBot" : "Close Chatbot"
            : language === "es" ? "Preguntar a ChatBot" : "Ask ChatBot"}
        </button>

        <button onClick={() => setShowMusic(!showMusic)} className="hero-btn music-btn">
          {showMusic
            ? language === "es" ? "Ocultar Música" : "Hide Music"
            : language === "es" ? "Reproducir Música" : "Play Music"}
        </button>

        <button
          onClick={() => (window.location.href = "https://sesion-three.vercel.app/")}
          className="hero-btn redirect-btn"
        >
          {language === "es" ? "Nueva plataforma" : "New platform"}
        </button>

        <button onClick={() => setShowGame(!showGame)} className="hero-btn game-btn">
          {showGame
            ? language === "es" ? "Ocultar Juego" : "Hide Game"
            : language === "es" ? "Jugar " : "Play Game"}
        </button>
      </section>

      {/* Nueva Sección de Imágenes */}
      <ImageSlider />

      {/* Slider de proyectos */}
      {showProjects && <ProjectsSlider />}

      {/* Renderizado condicional del currículum */}
      {showCurriculum && <CurriculumContent language={language} />}

      {/* ChatBot */}
      {showAI && <ChatBot />}

      {/* Sección de Música */}
      {showMusic && <MusicSection />}

      {/* Juego */}
      {showGame && <SpaceShooterGame />}
    </div>
  );
}
