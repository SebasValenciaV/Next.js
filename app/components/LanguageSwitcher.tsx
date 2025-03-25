"use client";
import React from "react";

type LanguageSwitcherProps = {
  currentLanguage: string;
  onSwitch: (lang: string) => void;
};

export default function LanguageSwitcher({
  currentLanguage,
  onSwitch,
}: LanguageSwitcherProps) {
  return (
    <div className="language-switcher">
      <button
        onClick={() => onSwitch("es")}
        className={currentLanguage === "es" ? "active" : ""}
      >
        ESPAÑOL
      </button>
      <button
        onClick={() => onSwitch("en")}
        className={currentLanguage === "en" ? "active" : ""}
      >
        ENGLISH
      </button>
    </div>
  );
}
