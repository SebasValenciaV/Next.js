"use client";

import { useState } from "react";
import MatrixCanvas from "./components/MatrixCanvas";
import ProjectsSlider from "./components/ProjectsSlider";
import ChatBot from "./components/ChatBot";
import CurriculumContent from "./components/curriculum";
import LanguageSwitcher from "./components/LanguageSwitcher";

export default function Home() {
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [language, setLanguage] = useState("en");
  const [loggedInUser, setLoggedInUser] = useState<{ userId: string; name: string } | null>(null);

  const handleLanguageSwitch = (lang: string) => setLanguage(lang);

  const handleLoginSuccess = (user: { userId: string; name: string }) => {
    setLoggedInUser(user);
  };

  const closeDashboard = () => {
    setLoggedInUser(null);
  };

  return (
    <div>
      {/* Canvas con efecto Matrix */}
      <MatrixCanvas />

      {/* Selector de Idioma */}
      <LanguageSwitcher currentLanguage={language} onSwitch={handleLanguageSwitch} />

      <section className="hero">
        <h1 className="hero-title">
          {language === "es" ? "Bienvenido a mi sitio web" : "Welcome to my website"}
        </h1>
        <p className="hero-subtitle">|||</p>

        <button onClick={() => setShowCurriculum(!showCurriculum)} className="hero-btn">
          {showCurriculum
            ? language === "es" ? "Ocultar CV" : "Hide CV"
            : language === "es" ? "Ver Currículum" : "View CV"}
        </button>

        <button onClick={() => setShowProjects(!showProjects)} className="hero-btn secondary">
          {showProjects
            ? language === "es" ? "Ocultar Proyectos" : "Hide Projects"
            : language === "es" ? "Ver Mockups" : "View mockups"}
        </button>

        <button onClick={() => setShowAI(!showAI)} className="hero-btn ai-btn">
          {showAI
            ? language === "es" ? "Cerrar ChatBot" : "Close Chatbot"
            : language === "es" ? "Preguntar a ChatBot" : "Ask ChatBot"}
        </button>

        {/* Botón para reproducir música */}
        <button onClick={() => setShowMusic(!showMusic)} className="hero-btn music-btn">
          {showMusic
            ? language === "es" ? "Detener Música" : "Stop Music"
            : language === "es" ? "Escuchar Música" : "Play Music"}
        </button>
      </section>

      {/* Slider de imágenes */}
      {showProjects && <ProjectsSlider />}

      {/* Renderizado condicional del currículum */}
      {showCurriculum && <CurriculumContent language={language} />}

      {/* ChatBot */}
      {showAI && <ChatBot />}

      {/* Reproductor de Música */}
      {showMusic && (
        <div className="music-player">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/5H2dELk8SnXpP6H10I4kS3?utm_source=generator&theme=0&autoplay=1"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
          ></iframe>
        </div>
      )}
    </div>
  );
}
