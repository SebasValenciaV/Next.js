"use client";

import { useEffect, useRef, useState } from "react";

type Bullet = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  angle?: number;
  type?: "normal" | "spread" | "laser";
};

type Obstacle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  gradient: CanvasGradient;
  design: number; // 0, 1, 2 o 3
};

type Fragment = {
  x: number;
  y: number;
  radius: number;
  angle: number;
  speed: number;
  life: number;
};

export default function SpaceDodgerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Estado para puntaje general
  const [score, setScore] = useState(0);
  // Estado para contar planetas destruidos por tipo (detalle por color)
  const [destroyedPlanets, setDestroyedPlanets] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  });
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [selectedWeapon, setSelectedWeapon] = useState<"normal" | "spread" | "laser">("normal");
  // Contador para reiniciar sin recargar la web
  const [resetGame, setResetGame] = useState(0);
  const [fragments, setFragments] = useState<Fragment[]>([]);

  // Usamos ref para acumular puntaje sin depender de cierres
  const scoreRef = useRef(0);

  // Reinicia solo el juego sin recargar la página
  const restartGame = () => {
    setResetGame(prev => prev + 1);
    scoreRef.current = 0;
    setScore(0);
    setDestroyedPlanets({ 0: 0, 1: 0, 2: 0, 3: 0 });
    setGameOver(false);
    setGameStarted(false);
    setPaused(false);
  };

  useEffect(() => {
    // Evita que se haga scroll al pulsar las flechas
    const preventScroll = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", preventScroll);
    return () => window.removeEventListener("keydown", preventScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Dimensiones internas reducidas: 800 x 600
    const baseWidth = 800;
    const baseHeight = 600;
    canvas.width = baseWidth;
    canvas.height = baseHeight;

    // Para dispositivos táctiles, evitar scroll en el canvas
    canvas.style.touchAction = "none";
    canvas.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
    canvas.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });

    // Control táctil: mover la nave según la posición del toque
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const touchY = touch.clientY - rect.top;
      spaceship.x = touchX;
      spaceship.y = touchY;
    };
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Generar estrellas para el fondo
    const numStars = 100;
    const stars: { x: number; y: number; radius: number }[] = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * baseWidth,
        y: Math.random() * baseHeight,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    // Datos de la nave (más pequeña para el canvas reducido)
    const spaceship = {
      x: baseWidth / 2,
      y: baseHeight - 120,
      width: 50,
      height: 70,
      speed: 6,
    };

    let bullets: Bullet[] = [];
    let obstacles: Obstacle[] = [];
    let keys: { [key: string]: boolean } = {};

    // Control de teclado: evita scroll y registra teclas
    const keyDownHandler = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        e.preventDefault();
      }
      keys[e.key] = true;
    };
    const keyUpHandler = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    // Creación de obstáculo (planeta) con velocidad variable y diseño (0 a 3)
    let obstacleTimer = 0;
    const obstacleInterval = 150;
    const createObstacle = () => {
      const radius = 20 + Math.random() * 50; // entre 20 y 70
      const x = Math.random() * (baseWidth - 2 * radius) + radius;
      const y = -radius;
      const speedLevels = [0.6, 1.2, 1.8, 2.4];
      const speed = speedLevels[Math.floor(Math.random() * speedLevels.length)];
      const design = Math.floor(Math.random() * 4);
      let grad: CanvasGradient;
      if (design === 0) {
        grad = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius);
        grad.addColorStop(0, "#a0c8ff");
        grad.addColorStop(0.5, "#5080d0");
        grad.addColorStop(1, "#203060");
      } else if (design === 1) {
        grad = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius);
        grad.addColorStop(0, "#ffddaa");
        grad.addColorStop(0.5, "#ffaa55");
        grad.addColorStop(1, "#aa5500");
      } else if (design === 2) {
        grad = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius);
        grad.addColorStop(0, "#ccffcc");
        grad.addColorStop(0.5, "#66cc66");
        grad.addColorStop(1, "#009900");
      } else {
        grad = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius);
        grad.addColorStop(0, "#ffd1dc");
        grad.addColorStop(0.5, "#ff69b4");
        grad.addColorStop(1, "#c71585");
      }
      obstacles.push({ x, y, radius, speed, gradient: grad, design });
    };

    const drawBackground = () => {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, baseHeight);
      bgGrad.addColorStop(0, "#000030");
      bgGrad.addColorStop(1, "#000000");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, baseWidth, baseHeight);
      stars.forEach((star) => {
        star.y += 0.3;
        if (star.y > baseHeight) {
          star.y = 0;
          star.x = Math.random() * baseWidth;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });
    };

    // Dibujo de la nave
    const drawSpaceship = () => {
      ctx.save();
      ctx.translate(spaceship.x, spaceship.y);
      ctx.beginPath();
      ctx.moveTo(0, -spaceship.height / 2);
      ctx.lineTo(-spaceship.width / 2, spaceship.height / 4);
      ctx.lineTo(0, spaceship.height / 2);
      ctx.lineTo(spaceship.width / 2, spaceship.height / 4);
      ctx.closePath();
      const shipGrad = ctx.createLinearGradient(0, -spaceship.height / 2, 0, spaceship.height / 2);
      shipGrad.addColorStop(0, "#eeeeee");
      shipGrad.addColorStop(1, "#555555");
      ctx.fillStyle = shipGrad;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, spaceship.width * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = "#66ccff";
      ctx.fill();
      ctx.restore();
    };

    // Dibujo de la bala (si es laser, se dibuja como línea larga)
    const drawBullet = (bullet: Bullet) => {
      ctx.beginPath();
      if (bullet.type === "laser") {
        ctx.strokeStyle = "#ff0000";
        ctx.lineWidth = 4;
        ctx.moveTo(bullet.x, bullet.y);
        ctx.lineTo(bullet.x, bullet.y - 50);
        ctx.stroke();
      } else {
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fillStyle = bullet.type === "spread" ? "#ff9933" : "#ff3333";
        ctx.fill();
      }
      ctx.closePath();
    };

    const drawObstacle = (obs: Obstacle) => {
      ctx.beginPath();
      ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
      ctx.fillStyle = obs.gradient;
      ctx.fill();
      ctx.closePath();
    };

    const drawFragment = (frag: Fragment) => {
      ctx.beginPath();
      ctx.arc(frag.x, frag.y, frag.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,165,0,${frag.life / 30})`;
      ctx.fill();
      ctx.closePath();
    };

    let animationFrameId: number;
    let canShoot = true;

    const createFragments = (obs: Obstacle) => {
      const numFragments = 5;
      for (let i = 0; i < numFragments; i++) {
        fragments.push({
          x: obs.x,
          y: obs.y,
          radius: obs.radius / 4,
          angle: Math.random() * Math.PI * 2,
          speed: 1 + Math.random() * 2,
          life: 30,
        });
      }
    };

    const updateFragments = () => {
      for (let i = fragments.length - 1; i >= 0; i--) {
        const frag = fragments[i];
        frag.x += frag.speed * Math.cos(frag.angle);
        frag.y += frag.speed * Math.sin(frag.angle);
        frag.life -= 1;
        if (frag.life <= 0) {
          fragments.splice(i, 1);
        }
      }
    };

    const gameLoop = () => {
      if (paused) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, baseWidth, baseHeight);
        ctx.fillStyle = "yellow";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("PAUSADO", baseWidth / 2, baseHeight / 2);
        animationFrameId = requestAnimationFrame(gameLoop);
        return;
      }

      drawBackground();
      if (!gameStarted) {
        animationFrameId = requestAnimationFrame(gameLoop);
        return;
      }

      // Movimiento de la nave con teclas
      if (keys["ArrowLeft"] && spaceship.x - spaceship.width / 2 > 0) {
        spaceship.x -= spaceship.speed;
      }
      if (keys["ArrowRight"] && spaceship.x + spaceship.width / 2 < baseWidth) {
        spaceship.x += spaceship.speed;
      }
      if (keys["ArrowUp"] && spaceship.y - spaceship.height / 2 > 0) {
        spaceship.y -= spaceship.speed;
      }
      if (keys["ArrowDown"] && spaceship.y + spaceship.height / 2 < baseHeight) {
        spaceship.y += spaceship.speed;
      }
      if (keys["z"]) {
        spaceship.x += keys["ArrowRight"] ? spaceship.speed * 0.8 : 0;
        spaceship.x -= keys["ArrowLeft"] ? spaceship.speed * 0.8 : 0;
        spaceship.y -= keys["ArrowUp"] ? spaceship.speed * 0.8 : 0;
        spaceship.y += keys["ArrowDown"] ? spaceship.speed * 0.8 : 0;
      }

      // Disparo con "x" según el arma seleccionada
      if (keys["x"] && canShoot) {
        if (selectedWeapon === "normal") {
          bullets.push({
            x: spaceship.x,
            y: spaceship.y - spaceship.height / 2,
            radius: 5,
            speed: 9,
            type: "normal",
          });
        } else if (selectedWeapon === "spread") {
          const angles = [-0.1, 0, 0.1];
          angles.forEach((ang) => {
            bullets.push({
              x: spaceship.x,
              y: spaceship.y - spaceship.height / 2,
              radius: 4,
              speed: 9,
              angle: ang,
              type: "spread",
            });
          });
        } else if (selectedWeapon === "laser") {
          bullets.push({
            x: spaceship.x,
            y: spaceship.y - spaceship.height / 2,
            radius: 2,
            speed: 20,
            type: "laser",
          });
        }
        canShoot = false;
        setTimeout(() => { canShoot = true; }, 300);
      }

      drawSpaceship();

      // Actualizar y dibujar balas
      bullets = bullets.filter(b => b.y + (b.radius || 0) > 0);
      bullets.forEach((b) => {
        if (b.angle !== undefined) {
          b.x += b.speed * Math.sin(b.angle);
          b.y -= b.speed * Math.cos(b.angle);
        } else {
          b.y -= b.speed;
        }
        drawBullet(b);
      });

      // Generar obstáculos
      obstacleTimer++;
      if (obstacleTimer > obstacleInterval) {
        createObstacle();
        obstacleTimer = 0;
      }

      // Actualizar y dibujar obstáculos
      obstacles = obstacles.filter(obs => obs.y - obs.radius < baseHeight);
      obstacles.forEach((obs, index) => {
        obs.y += obs.speed;
        drawObstacle(obs);

        // Colisión con la nave (aproximación circular)
        const dx = spaceship.x - obs.x;
        const dy = spaceship.y - obs.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < obs.radius + spaceship.width * 0.3) {
          setGameOver(true);
          cancelAnimationFrame(animationFrameId);
          return;
        }

        // Colisión bala-obstáculo: se asigna puntaje y se actualiza el contador según el diseño
        bullets.forEach((bullet, bIndex) => {
          const dxBullet = bullet.x - obs.x;
          const dyBullet = bullet.y - obs.y;
          const distBullet = Math.sqrt(dxBullet * dxBullet + dyBullet * dyBullet);
          if (distBullet < obs.radius + bullet.radius) {
            createFragments(obs);
            obstacles.splice(index, 1);
            bullets.splice(bIndex, 1);
            const points = Math.floor(obs.radius * 10);
            scoreRef.current += points;
            setDestroyedPlanets(prev => ({
              ...prev,
              [obs.design]: prev[obs.design] + 1,
            }));
          }
        });
      });

      updateFragments();
      fragments.forEach(frag => {
        drawFragment(frag);
      });

      // Actualizar estado del puntaje general
      setScore(scoreRef.current);

      // Mostrar puntaje general en el canvas
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.textAlign = "left";
      ctx.fillText("Score: " + scoreRef.current, 20, 30);

      if (!gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
      } else {
        ctx.fillStyle = "rgba(0,0,0,0.85)";
        ctx.fillRect(0, baseHeight / 2 - 50, baseWidth, 100);
        ctx.fillStyle = "red";
        ctx.font = "32px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", baseWidth / 2, baseHeight / 2 + 15);
      }
    };

    gameLoop();

    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
      document.removeEventListener("keyup", keyUpHandler, false);
      canvas.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, selectedWeapon, paused, resetGame]);

  // Mapear diseños a nombres y colores para estadísticas
  const designNames: { [key: number]: { name: string; color: string } } = {
    0: { name: "Azul", color: "#a0c8ff" },
    1: { name: "Amarillo", color: "#ffddaa" },
    2: { name: "Verde", color: "#ccffcc" },
    3: { name: "Rosa", color: "#ffd1dc" },
  };

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "900px",
        margin: "20px auto",
        padding: "20px",
        border: "2px solid #333",
        background: "#000",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "auto",
          background: "#000",
          touchAction: "none",
        }}
      />
      {gameStarted && !gameOver && (
        <div style={{ position: "absolute", top: 20, right: 20, zIndex: 20 }}>
          <button
            onClick={() => setPaused(p => !p)}
            style={{
              padding: "6px 10px",
              marginRight: "10px",
              background: "#0077cc",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {paused ? "Reanudar" : "Pausar"}
          </button>
          <button
            onClick={restartGame}
            style={{
              padding: "6px 10px",
              background: "#cc0000",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Reiniciar
          </button>
        </div>
      )}
      {!gameStarted && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            fontSize: "18px",
          }}
        >
          <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>SPACE DODGER</h2>
          <p style={{ marginBottom: "10px" }}>Usa las flechas para mover la nave.</p>
          <p style={{ marginBottom: "10px" }}>Presiona "z" para impulso extra y "x" para disparar.</p>
          <div style={{ margin: "20px" }}>
            <span style={{ marginRight: "10px" }}>Elige tu armamento:</span>
            <button
              onClick={() => setSelectedWeapon("normal")}
              style={{
                padding: "8px 16px",
                marginRight: "10px",
                background: selectedWeapon === "normal" ? "#0077cc" : "#555",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Normal
            </button>
            <button
              onClick={() => setSelectedWeapon("spread")}
              style={{
                padding: "8px 16px",
                marginRight: "10px",
                background: selectedWeapon === "spread" ? "#0077cc" : "#555",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Spread
            </button>
            <button
              onClick={() => setSelectedWeapon("laser")}
              style={{
                padding: "8px 16px",
                background: selectedWeapon === "laser" ? "#0077cc" : "#555",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Laser
            </button>
          </div>
          <button
            onClick={() => setGameStarted(true)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              background: "#00cc66",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Iniciar Juego
          </button>
        </div>
      )}
      {gameOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 20,
            fontSize: "18px",
          }}
        >
          <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>GAME OVER</h2>
          <p style={{ marginBottom: "10px" }}>Score: {score}</p>
          <div style={{ margin: "10px 0", textAlign: "left" }}>
            <h3 style={{ marginBottom: "5px" }}>Planetas Destruidos:</h3>
            {Object.keys(destroyedPlanets).map(key => {
              const design = Number(key);
              const info = designNames[design];
              return (
                <p key={design} style={{ color: info.color, margin: "2px 0" }}>
                  {info.name}: {destroyedPlanets[design]}
                </p>
              );
            })}
          </div>
          <button
            onClick={restartGame}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              background: "#cc0000",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reiniciar Juego
          </button>
        </div>
      )}
    </div>
  );
}
