"use client";

import { useEffect, useState, useRef } from "react";

export default function DateTimeWidget() {
  const [now, setNow] = useState(new Date());
  const [offsetTop, setOffsetTop] = useState(20);
  const startTime = useRef(new Date());

  // Actualiza fecha/hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Ajusta el offset según el ancho de la pantalla
  useEffect(() => {
    const updateOffset = () => {
      if (window.innerWidth < 600) {
        setOffsetTop(80); // baja el widget en móviles
      } else {
        setOffsetTop(20); // posición original en desktop
      }
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  // Formateo de fecha y hora
  const dateStr = now.toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const timeStr = now.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Cálculo de tiempo de sesión
  const elapsedSec = Math.floor((now.getTime() - startTime.current.getTime()) / 1000);
  const hh = String(Math.floor(elapsedSec / 3600)).padStart(2, "0");
  const mm = String(Math.floor((elapsedSec % 3600) / 60)).padStart(2, "0");
  const ss = String(elapsedSec % 60).padStart(2, "0");
  const sessionStr = `${hh}:${mm}:${ss}`;

  return (
    <div
      style={{
        position: "absolute",
        top: `${offsetTop}px`,
        left: "50%",
        transform: "translateX(-50%)",
        color: "#fff",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        zIndex: 100,
        textShadow: "0 1px 2px rgba(0,0,0,0.7)",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <div style={{ fontSize: "0.9rem", textTransform: "capitalize" }}>
        {dateStr}
      </div>
      <div style={{ fontSize: "1.3rem", fontWeight: 600, marginTop: "2px" }}>
        {timeStr}
      </div>
      <div style={{ fontSize: "0.8rem", marginTop: "4px", opacity: 0.85 }}>
        Sesión: {sessionStr}
      </div>
    </div>
  );
}
