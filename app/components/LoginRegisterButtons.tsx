"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginRegisterButtonsProps {
  onLoginSuccess: (user: { userId: string; name: string }) => void;
}

export default function LoginRegisterButtons({ onLoginSuccess }: LoginRegisterButtonsProps) {
  const [formType, setFormType] = useState<"login" | "register" | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Usamos useRouter para redirección si se requiere, aunque en esta solución se usa el callback
  const router = useRouter();

  const showLoginForm = () => {
    clearFields();
    setFormType("login");
  };

  const showRegisterForm = () => {
    clearFields();
    setFormType("register");
  };

  const clearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setMessage("");
  };

  async function handleRegister() {
    setMessage("Registrando...");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Registro exitoso. Ahora inicia sesión.");
        clearFields();
        setFormType("login");
      } else {
        setMessage(data.error || "Error al registrar");
      }
    } catch (error) {
      console.error("Error en handleRegister:", error);
      setMessage("Error al registrar usuario.");
    }
  }

  async function handleLogin() {
    setMessage("Iniciando sesión...");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Inicio de sesión exitoso");
        clearFields();
        onLoginSuccess({ userId: data.userId, name: data.name });
      } else {
        setMessage(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en handleLogin:", error);
      setMessage("Error al iniciar sesión.");
    }
  }

  return (
    <div className="login-register-container">
      {formType === "" ? (
        <div>
          <button className="hero-btn" onClick={showLoginForm}>
            Iniciar Sesión
          </button>
          <button className="hero-btn" onClick={showRegisterForm}>
            Registrarse
          </button>
        </div>
      ) : (
        <form
          className="login-register-form"
          onSubmit={(e) => {
            e.preventDefault();
            formType === "login" ? handleLogin() : handleRegister();
          }}
          autoComplete="off"
        >
          {formType === "register" && (
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="off"
            />
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <div>
            <button type="submit" className="hero-btn">
              {formType === "login" ? "Iniciar Sesión" : "Registrarse"}
            </button>
            <button
              type="button"
              className="hero-btn secondary"
              onClick={() => {
                clearFields();
                setFormType("");
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
      {message && <p className="login-register-message">{message}</p>}
    </div>
  );
}
