"use client";

import React from "react";

interface DashboardProps {
  user: {
    userId: string;
    name: string;
  };
  onClose: () => void;
}

export default function Dashboard({ user, onClose }: DashboardProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.8)",
        zIndex: 9999,
        color: "#fff",
        padding: "2rem",
      }}
    >
      <h1>Dashboard de {user.name}</h1>
      <p>ID de usuario: {user.userId}</p>
      {/* Agrega más contenido personalizado según tus necesidades */}
      <button className="hero-btn" onClick={onClose}>
        Cerrar Dashboard
      </button>
    </div>
  );
}
