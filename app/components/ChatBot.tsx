"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatBot() {
  const [loading, setLoading] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [availableCommands, setAvailableCommands] = useState<string[]>([]);
  const [conversationLog, setConversationLog] = useState<any[]>([]);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Al montar el componente, pedimos "help" para obtener los comandos
  useEffect(() => {
    setConversationLog([]);
    setConversationStarted(false);
    setAvailableCommands([]);

    (async () => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: "reset" }),
        });
        const data = await res.json();
        setAvailableCommands(data.availableCommands || []);
        setConversationLog([
          {
            question: "¡Hola! ¿En qué puedo ayudarte hoy?",
            reply: "Puedes preguntarme cualquier cosa o usar uno de los comandos disponibles.",
            isSystem: true,
          },
          ...(data.conversationLog || []),
        ]);
      } catch (error: any) {
        console.error("Error fetching help:", error.message);
      }
    })();
  }, []);

  // Auto-scroll en cada actualización de conversación
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationLog]);

  const handleAIClick = async () => {
    if (!userQuestion.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userQuestion }),
      });
      const data = await res.json();

      const lowerQ = userQuestion.trim().toLowerCase();
      if (lowerQ !== "reset" && lowerQ !== "resetear") {
        setConversationStarted(true);
      }

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
    <div className="ai-container">
      {/* Botón para mostrar/ocultar comandos */}
      <div className="commands-toggle">
        <button
          onClick={() => setShowCommands(!showCommands)}
          className="toggle-btn"
        >
          {showCommands ? "Ocultar Comandos" : "Mostrar Comandos"}
        </button>
      </div>

      {/* Panel de comandos (desplegable) */}
      {showCommands && availableCommands.length > 0 && (
        <div className="ai-response commands-panel">
          <h3>Comandos disponibles:</h3>
          <ul>
            {availableCommands.map((cmd, index) => (
              <li key={index}>👉 {cmd}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Área de chat */}
      <div className="ai-chat">
        {conversationLog.length > 0 && (
          <div className="ai-response conversation-panel">
            <h3>Conversación:</h3>
            {conversationLog.map((entry, index) => (
              <div key={index} className="chat-entry">
                {!entry.isSystem && (
                  <p>
                    <strong>👤 Usuario:</strong> {entry.question}
                  </p>
                )}
                <p>
                  <strong>🤖 ChatBot:</strong> {entry.reply}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Entrada de usuario y botón de enviar */}
        <div className="ai-input-container">
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder="Escribe tu pregunta aquí..."
            className="ai-input"
            onKeyDown={(e) => e.key === "Enter" && handleAIClick()}
          />
          <button
            onClick={handleAIClick}
            disabled={loading}
            className="ai-ask-btn"
          >
            {loading ? "Pensando..." : "Enviar"}
          </button>
        </div>
      </div>

      {/* Estilos en línea para el botón */}
      <style jsx>{`
        .toggle-btn {
          background-color:rgb(0, 225, 34);
          color: #ffffff;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .toggle-btn:hover {
          background-color:rgb(119, 119, 119);
          transform: translateY(-2px);
        }
        .toggle-btn:active {
          transform: translateY(0);
        }

        /* Puedes agregar más estilos para el contenedor de comandos si lo deseas */
        .commands-toggle {
          margin-bottom: 1rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
