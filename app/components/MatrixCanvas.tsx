"use client";
import { useEffect, useRef } from "react";

export default function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const backgroundImage = new Image();
    backgroundImage.src = "/eye.png";

    const matrixChars = "101010101天地玄黄宇宙洪荒セバスチャンバレンシアバルガス|||";
    const charsArray = matrixChars.split("");
    const fontSize = 28;
    let columns: number;
    let drops: { y: number; char: string; speed: number }[] = [];
    let opacity = 1;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Aumentamos el factor multiplicador para que haya más columnas (más caracteres por línea)
      columns = Math.floor(canvas.width / fontSize) * 3;
      drops = Array(columns)
        .fill(null)
        .map(() => ({
          y: Math.random() * canvas.height / fontSize,
          char: charsArray[Math.floor(Math.random() * charsArray.length)],
          speed: 0.1 + Math.random() * 0.2, // Se conserva la velocidad original
        }));
    };

    backgroundImage.onload = () => {
      resizeCanvas();

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (opacity > 0) {
          ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          opacity -= 0.001;
        }

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
        gradient.addColorStop(0.4, "rgba(0, 0, 0, 0.9)");
        gradient.addColorStop(0.6, "rgba(0, 0, 0, 0.9)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const scale = Math.max(canvas.width / backgroundImage.width, canvas.height / backgroundImage.height);
        const scaledWidth = backgroundImage.width * scale;
        const scaledHeight = backgroundImage.height * scale;
        const offsetX = (canvas.width - scaledWidth) / 2;
        const offsetY = (canvas.height - scaledHeight) / 3;

        ctx.globalAlpha = 0.3; // Imagen más visible
        ctx.filter = "brightness(1.3)"; // Aumento del brillo
        ctx.drawImage(backgroundImage, offsetX, offsetY, scaledWidth, scaledHeight);
        ctx.filter = "none";
        ctx.globalAlpha = 1;

        // Ajustamos el espaciado entre columnas usando fontSize/3
        for (let i = 0; i < drops.length; i++) {
          const fadeFactor = Math.max(0, 1 - drops[i].y / (canvas.height / fontSize)); // Opacidad decrece al caer

          ctx.fillStyle = `rgba(0, 255, 0, ${fadeFactor})`;
          ctx.font = `bold ${fontSize}px monospace`;
          ctx.fillText(drops[i].char, (i % columns) * (fontSize / 3), drops[i].y * fontSize);

          if (drops[i].y * fontSize > canvas.height) {
            drops[i] = { 
              y: 0, 
              char: charsArray[Math.floor(Math.random() * charsArray.length)], // Letra diferente al reaparecer
              speed: 0.1 + Math.random() * 0.2, 
            };
          }
          drops[i].y += drops[i].speed;
        }

        requestAnimationFrame(draw);
      };

      draw();
      window.addEventListener("resize", resizeCanvas);

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    />
  );
}
