"use client";

import { useState, useEffect } from "react";
import CurriculumContent from "./curriculum";

/** Slider de Proyectos */
function ProjectsSlider() {
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

export default function Home() {
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showAI, setShowAI] = useState(false);

  // Efecto Matrix (tal como lo tenías, sin guard clauses)
  useEffect(() => {
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

  // ---------------------
  //     LÓGICA CHATBOT
  // ---------------------
  // Estados de chatbot
  const [loading, setLoading] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [availableCommands, setAvailableCommands] = useState<string[]>([]);
  const [conversationLog, setConversationLog] = useState<any[]>([]);
  const [conversationStarted, setConversationStarted] = useState(false);

  // Al abrir el chatbot, reinicia el log y pide "help" para obtener los comandos
  useEffect(() => {
    if (showAI) {
      setConversationLog([]);
      setConversationStarted(false);
      setAvailableCommands([]);

      (async () => {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: "help" }),
          });
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Error fetching help");
          }
          const data = await res.json();
          setAvailableCommands(data.availableCommands || []);
          setConversationLog(data.conversationLog || []);
        } catch (error: any) {
          console.error("Error fetching help:", error.message);
        }
      })();
    }
  }, [showAI]);

  // Maneja la pregunta del usuario
  const handleAIClick = async () => {
    if (!userQuestion.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userQuestion }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error en la solicitud");
      }
      const data = await res.json();

      // Si no es "help"/"ayuda", marcamos la conversación como iniciada
      const lowerQ = userQuestion.trim().toLowerCase();
      if (lowerQ !== "help" && lowerQ !== "ayuda") {
        setConversationStarted(true);
      }

      // Actualizamos log y comandos
      setConversationLog(data.conversationLog || []);
      setAvailableCommands(data.availableCommands || []);
      setUserQuestion("");
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Canvas con efecto Matrix */}
      <canvas id="matrix" className="matrix-canvas" />

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

        {/* Botón para abrir/cerrar el ChatBot */}
        <button
          onClick={() => setShowAI(!showAI)}
          className="hero-btn ai-btn"
        >
          {showAI ? "Close AI" : "Ask AI"}
        </button>
      </section>

      {/* Slider de imágenes de empresas y proyectos */}
      {showProjects && <ProjectsSlider />}

      {/* Renderizado condicional del currículum */}
      {showCurriculum && <CurriculumContent />}

      {/* Sección ChatBot */}
      {showAI && (
        <div className="ai-container">
          {/* Lista de comandos siempre visible */}
          {availableCommands.length > 0 && (
            <div className="ai-response">
              <h3>Available Commands:</h3>
              <ul>
                {availableCommands.map((cmd, index) => (
                  <li key={index}>{cmd}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Input del usuario */}
          <div className="ai-input-container">
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Ask me anything..."
              className="ai-input"
              onKeyDown={(e) => e.key === "Enter" && handleAIClick()}
            />
            <button
              onClick={handleAIClick}
              disabled={loading}
              className="ai-ask-btn"
            >
              {loading ? "Processing..." : "Ask"}
            </button>
          </div>

          {/* Historial de la conversación */}
          {conversationLog.length > 0 && (
            <div className="ai-response">
              <h3>Conversation:</h3>
              {conversationLog.map((entry, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                  <p>
                    <strong>User:</strong> {entry.question}
                  </p>
                  <p>
                    <strong>ChatBot:</strong> {entry.reply}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
