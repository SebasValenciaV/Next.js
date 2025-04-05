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
      setShowFullScreenGame((prev) => !prev);
      setVisibleSection(null);
    } else {
      setVisibleSection((prevSection) => (prevSection === section ? null : section));
      setShowFullScreenGame(false);
    }
  };

  return (
    <div style={{ padding: "10px", maxWidth: "90%", margin: "0 auto", position: "relative" }}>
      <MatrixCanvas />
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px", position: "relative", zIndex: 10 }}>
        <LanguageSwitcher currentLanguage={language} onSwitch={setLanguage} />
      </div>
      
      <section className="hero" style={{ display: showFullScreenGame || visibleSection ? "none" : "block" }}>
        <h1 className="hero-title">
          {language === "es" ? "Bienvenido a mi sitio web" : "Welcome to my website"}
        </h1>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => toggleSection("curriculum")} className="hero-btn">
            {language === "es" ? "Ver Currículum" : "View Curriculum Vitae"}
          </button>

          <button onClick={() => toggleSection("projects")} className="hero-btn secondary">
            {language === "es" ? "Ver Mockups" : "See Mockups"}
          </button>

          <button onClick={() => toggleSection("chatbot")} className="hero-btn ai-btn">
            {language === "es" ? "Preguntar a ChatBot" : "Ask ChatBot"}
          </button>

          <button onClick={() => setShowMusic(!showMusic)} className="hero-btn music-btn">
            {showMusic ? (language === "es" ? "Ocultar Música" : "Hide Music") : (language === "es" ? "Escuchar Música" : "Listen to Music")}
          </button>

          <button
            onClick={() => (window.location.href = "https://sesion-three.vercel.app/")}
            className="hero-btn redirect-btn"
          >
            {language === "es" ? "Nueva plataforma" : "New platform"}
          </button>

      

          <button onClick={() => toggleSection("game")} className="hero-btn game-btn">
            {language === "es" ? "Jugar en 2D" : "Play 2D Game"}
          </button>
        </div>
      </section>

      {visibleSection && (
        <div style={{ position: "relative", padding: "40px 20px 20px", zIndex: 1 }}>
          <button 
            onClick={() => setVisibleSection(null)} 
            className="hero-btn close-btn" 
            style={{ 
              position: "absolute", 
              top: "-20px", 
              right: "10px", 
              zIndex: 10 
            }}
          >
            {language === "es" ? "Ocultar Sección" : "Hide Section"}
          </button>
          {visibleSection === "projects" && <ProjectsSlider />}
          {visibleSection === "curriculum" && <CurriculumContent language={language} />}
          {visibleSection === "chatbot" && <ChatBot />}
        </div>
      )}

     {/*{!visibleSection && !showFullScreenGame && <ImageSlider />}     */}
      {showMusic && <MusicSection />}

      {showFullScreenGame && (
        <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "100vw", 
          height: "100vh", 
         
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