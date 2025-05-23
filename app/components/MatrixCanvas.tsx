"use client";
import { useEffect, useRef } from "react";

export default function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const backgroundImage = new Image();
    backgroundImage.src = "/3.png";

    const matrixChars =
      "10101010110101010100110天地玄黄宇宙洪荒セバスチャンバレンシアバルガス|||";
    const charsArray = matrixChars.split("");
    const fontSize = 28;
    let columns: number;
    let drops: { y: number; char: string; speed: number; size: number }[] = [];

    let openProgress = 0; // 0 = párpados cerrados, 1 = totalmente abiertos
    let opening = true;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize) * 3;
      drops = Array(columns)
        .fill(null)
        .map(() => ({
          y: Math.random() * (canvas.height / fontSize),
          char: charsArray[Math.floor(Math.random() * charsArray.length)],
          speed: 0.02 + Math.random() * 0.5,
          size: fontSize * (0.5 + Math.random() * 0.5),
        }));
    };

    backgroundImage.onload = () => {
      resizeCanvas();

      // Pintamos el canvas de negro para evitar flash blanco
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1) Dibujar la imagen de fondo con mayor brillo y opacidad completa
        const scale = Math.max(
          canvas.width / backgroundImage.width,
          canvas.height / backgroundImage.height
        );
        const sw = backgroundImage.width * scale;
        const sh = backgroundImage.height * scale;
        const ox = (canvas.width - sw) / 2;
        const oy = (canvas.height - sh) / 3;
        ctx.filter = "brightness(2)";
        ctx.globalAlpha = 1;
        ctx.drawImage(backgroundImage, ox, oy, sw, sh);
        ctx.filter = "none";

        // 2) Dibujar la lluvia de caracteres tipo Matrix
        for (let i = 0; i < drops.length; i++) {
          const drop = drops[i];
          const fade = Math.max(0, 1 - drop.y / (canvas.height / fontSize));
          ctx.fillStyle = `rgba(0, 255, 0, ${fade})`;
          ctx.font = `bold ${drop.size}px monospace`;
          ctx.fillText(
            drop.char,
            (i % columns) * (fontSize / 3),
            drop.y * fontSize
          );

          // Reiniciar la posición del carácter cuando llega al fondo
          if (drop.y * fontSize > canvas.height) {
            drops[i] = {
              y: 0,
              char: charsArray[Math.floor(Math.random() * charsArray.length)],
              speed: 0.02 + Math.random() * 0.5,
              size: fontSize * (0.5 + Math.random() * 0.5),
            };
          }
          drops[i].y += drop.speed;
        }

        // 3) Dibujar los párpados para el efecto "abrir el ojo"
        if (opening) {
          const w = canvas.width;
          const h = canvas.height;
          const cx = w / 2;
          const cy = h / 2;
          const openY = (h / 2) * openProgress;
          const curve = 80 * (1 - openProgress);

          ctx.fillStyle = "black";

          // Párpado superior
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(w, 0);
          ctx.lineTo(w, cy - openY);
          ctx.quadraticCurveTo(cx, cy - openY - curve, 0, cy - openY);
          ctx.closePath();
          ctx.fill();

          // Párpado inferior
          ctx.beginPath();
          ctx.moveTo(0, h);
          ctx.lineTo(w, h);
          ctx.lineTo(w, cy + openY);
          ctx.quadraticCurveTo(cx, cy + openY + curve, 0, cy + openY);
          ctx.closePath();
          ctx.fill();

          openProgress += 0.02;
          if (openProgress >= 1) opening = false;
        }

        requestAnimationFrame(draw);
      };

      draw();
      window.addEventListener("resize", resizeCanvas);
      return () => window.removeEventListener("resize", resizeCanvas);
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
        backgroundColor: "black",
        pointerEvents: "none",
      }}
    />
  );
}
