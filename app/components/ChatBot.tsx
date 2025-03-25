"use client";
import { useState, useEffect } from "react";

export default function ChatBot() {
  const [loading, setLoading] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [availableCommands, setAvailableCommands] = useState<string[]>([]);
  const [conversationLog, setConversationLog] = useState<any[]>([]);
  const [conversationStarted, setConversationStarted] = useState(false);

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
  }, []);

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
      {/* Lista de comandos */}
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
  );
}
