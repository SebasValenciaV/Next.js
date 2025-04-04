"use client";
import { useEffect, useRef } from "react";

export default function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Cargar la imagen de fondo
    const backgroundImage = new Image();
    backgroundImage.src = "/neo.png"; // Asegúrate de que la imagen está en 'public'

    backgroundImage.onload = () => {
      const matrixChars = "$$$$$$$$@@@&&%&%%?¡??¡¿¿天地玄黄宇宙洪荒0123456789セバスチャンバレンシアバルガス°°°|||SEBASTIANVALENCIAVARGAS";
      const charsArray = matrixChars.split("");
      const fontSize = 16;
      const columns = Math.floor(canvas.width / fontSize);
      const drops = Array(columns).fill(1);

      function draw() {
        // Dibujar la imagen de fondo con transparencia
        ctx.globalAlpha = 0.2; // Ajusta la opacidad si es necesario
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1; // Restaurar opacidad normal para los caracteres

        // Efecto de desvanecimiento del fondo
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujar caracteres estilo Matrix
        ctx.fillStyle = "#0F0";
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
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
}
