"use client";

import { useState, useEffect } from "react";
import DateTimeWidget from "./components/DateTimeWidget";
import MatrixCanvas from "./components/MatrixCanvas";
import ProjectsSlider from "./components/ProjectsSlider";
import ChatBot from "./components/ChatBot";
import CurriculumContent from "./components/curriculum";
import LanguageSwitcher from "./components/LanguageSwitcher";
import MusicSection from "./components/Music";
import SpaceShooterGame from "./components/SpaceShooterGame";
import ImageSlider from "./components/images";

export default function Page() {
  const [visibleSection, setVisibleSection] = useState<string | null>(null);
  const [language, setLanguage] = useState("en");
  const [showFullScreenGame, setShowFullScreenGame] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showFullScreenGame ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFullScreenGame]);

  const toggleSection = (section: string) => {
    if (section === "game") {
      setShowFullScreenGame(prev => !prev);
      setVisibleSection(null);
    } else {
      setVisibleSection(prev => (prev === section ? null : section));
      setShowFullScreenGame(false);
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        maxWidth: "90%",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Fecha y Matrix */}
      <DateTimeWidget language={language} />
      <MatrixCanvas />

      {/* 1) Solo LanguageSwitcher */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <LanguageSwitcher currentLanguage={language} onSwitch={setLanguage} />
      </div>

      {/* 2) Botón Hide Section muy abajo */}
      {(visibleSection || showFullScreenGame) && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",    // <--- más espacio desde el switcher
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => {
              setVisibleSection(null);
              setShowFullScreenGame(false);
            }}
            className="hero-btn close-btn"
          >
            {language === "es" ? "Ocultar Sección" : "Hide Section"}
          </button>
        </div>
      )}

      {/* Botones principales */}
      {!showFullScreenGame && !visibleSection && (
        <section className="hero">
          <h1 className="hero-title">
            {language === "es"
              ? "Bienvenido a mi sitio web"
              : "Welcome to my website"}
          </h1>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => toggleSection("curriculum")}
              className="hero-btn"
            >
              {language === "es" ? "Ver Currículum" : "View Curriculum Vitae"}
            </button>
            <button
              onClick={() => toggleSection("projects")}
              className="hero-btn secondary"
            >
              {language === "es" ? "Ver Mockups" : "See Mockups"}
            </button>
            <button
              onClick={() => toggleSection("chatbot")}
              className="hero-btn ai-btn"
            >
              {language === "es" ? "Preguntar a ChatBot" : "Ask ChatBot"}
            </button>
            <button
              onClick={() => setShowMusic(!showMusic)}
              className="hero-btn music-btn"
            >
              {showMusic
                ? language === "es"
                  ? "Ocultar Música"
                  : "Hide Music"
                : language === "es"
                ? "Escuchar Música"
                : "Listen to Music"}
            </button>
            <button
              onClick={() =>
                (window.location.href = "https://sesion-three.vercel.app/")
              }
              className="hero-btn redirect-btn"
            >
              {language === "es" ? "Nueva plataforma" : "New platform"}
            </button>
            <button
              onClick={() => toggleSection("game")}
              className="hero-btn game-btn"
            >
              {language === "es" ? "Jugar en 2D" : "Play 2D Game"}
            </button>
          </div>
        </section>
      )}

      {/* Contenido mostrado */}
      {(visibleSection || showFullScreenGame) && (
        <div style={{ marginTop: "30px", padding: "0 10px", zIndex: 1 }}>
          {visibleSection === "projects" && <ProjectsSlider />}
          {visibleSection === "curriculum" && (
            <CurriculumContent language={language} />
          )}
          {visibleSection === "chatbot" && <ChatBot />}
          {showFullScreenGame && (
            <div
              style={{
                width: "100%",
                maxWidth: "900px",
                margin: "0 auto",
                position: "relative",
                height: "600px",
              }}
            >
              <SpaceShooterGame />
            </div>
          )}
        </div>
      )}

      {showMusic && <MusicSection />}
    </div>
  );
}
