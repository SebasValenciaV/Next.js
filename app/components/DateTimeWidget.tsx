"use client";

import { useEffect, useState, useRef } from "react";

type Props = {
  language: string;
};

export default function DateTimeWidget({ language }: Props) {
  const [now, setNow] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const startTime = useRef(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const locale = language === "es" ? "es-CO" : "en-US";

  const dateStr = now.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const timeStr = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const elapsedSec = Math.floor((now.getTime() - startTime.current.getTime()) / 1000);
  const hh = String(Math.floor(elapsedSec / 3600)).padStart(2, "0");
  const mm = String(Math.floor((elapsedSec % 3600) / 60)).padStart(2, "0");
  const ss = String(elapsedSec % 60).padStart(2, "0");
  const sessionLabel = language === "es" ? "Sesión" : "Session";
  const sessionStr = `${hh}:${mm}:${ss}`;

  const baseFontSize = isMobile ? 10 : 14;

  return (
    <div
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        color: "#fff",
        textAlign: "right",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: `${baseFontSize}px`,
        lineHeight: 1.2,
        textShadow: "0 1px 2px rgba(0,0,0,0.7)",
        zIndex: 9999,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <div style={{ textTransform: "capitalize" }}>{dateStr}</div>
      <div style={{ fontWeight: 600 }}>{timeStr}</div>
      <div style={{ opacity: 0.85 }}>{sessionLabel}: {sessionStr}</div>
    </div>
  );
}
