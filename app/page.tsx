"use client";

import { useState, useEffect } from "react";
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
  const [showMusic, setShowMusic] = useState(false);
  const [language, setLanguage] = useState("en");
  const [showFullScreenGame, setShowFullScreenGame] = useState(false);
  
  useEffect(() => {
    if (showFullScreenGame) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFullScreenGame]);

  const toggleSection = (section: string) => {
    if (section === "game") {
      setShowFullScreenGame((prev) => !prev);
    } else {
      setVisibleSection((prevSection) => (prevSection === section ? null : section));
    }
  };

  return (
    <div style={{ padding: "10px", maxWidth: "90%", margin: "0 auto" }}>
      <MatrixCanvas />
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <LanguageSwitcher currentLanguage={language} onSwitch={setLanguage} />
      </div>
      
      <section className="hero" style={{ display: showFullScreenGame ? "none" : "block" }}>
        <h1 className="hero-title">
          {language === "es" ? "Bienvenido a mi sitio web" : "Welcome to my website"}
        </h1>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => toggleSection("curriculum")} className="hero-btn">
            {visibleSection === "curriculum" ? (language === "es" ? "Ocultar CV" : "Hide CV") : (language === "es" ? "Ver Currículum" : "View CV")}
          </button>

          <button onClick={() => toggleSection("projects")} className="hero-btn secondary">
            {visibleSection === "projects" ? (language === "es" ? "Ocultar Proyectos" : "Hide Projects") : (language === "es" ? "Ver Mockups" : "See mockups")}
          </button>

          <button onClick={() => toggleSection("chatbot")} className="hero-btn ai-btn">
            {visibleSection === "chatbot" ? (language === "es" ? "Cerrar ChatBot" : "Close Chatbot") : (language === "es" ? "Preguntar a ChatBot" : "Ask ChatBot")}
          </button>

          <button onClick={() => setShowMusic(!showMusic)} className="hero-btn music-btn">
            {showMusic ? (language === "es" ? "Ocultar Música" : "Hide Music") : (language === "es" ? "Reproducir Música" : "Play Music")}
          </button>

          <button onClick={() => toggleSection("game")} className="hero-btn game-btn">
            {showFullScreenGame ? (language === "es" ? "Ocultar Juego" : "Hide Game") : (language === "es" ? "Jugar" : "Play Game")}
          </button>
        </div>
      </section>

      {visibleSection === null && !showFullScreenGame && <ImageSlider />}
      {visibleSection === "projects" && <ProjectsSlider />}
      {visibleSection === "curriculum" && <CurriculumContent language={language} />}
      {visibleSection === "chatbot" && <ChatBot />}
      {showMusic && <MusicSection />}

      {showFullScreenGame && (
        <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "100vw", 
          height: "100vh", 
          backgroundColor: "black", 
          zIndex: 1000, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center", 
          overflow: "hidden" 
        }}>
          <button
            onClick={() => setShowFullScreenGame(false)}
            className="hero-btn game-btn"
            style={{ position: "absolute", top: "10px", right: "10px", zIndex: 1100 }}
          >
            {language === "es" ? "Ocultar Juego" : "Hide Game"}
          </button>
          <SpaceShooterGame />
        </div>
      )}
    </div>
  );
}
