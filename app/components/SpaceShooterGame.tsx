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

type Enemy = {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  shootTimer: number;
};

export default function SpaceDodgerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [score, setScore] = useState(0);
  const [destroyedPlanets, setDestroyedPlanets] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  });
  const [destroyedEnemies, setDestroyedEnemies] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  // Arma seleccionada para PC
  const [selectedWeapon, setSelectedWeapon] = useState<"normal" | "spread" | "laser">("normal");
  const [resetGame, setResetGame] = useState(0);
  const [fragments, setFragments] = useState<Fragment[]>([]);
  // Nueva variable para el diseño de la nave (0 a 5)
  const [shipDesign, setShipDesign] = useState<number>(0);
  const scoreRef = useRef(0);

  const restartGame = () => {
    setResetGame((prev) => prev + 1);
    scoreRef.current = 0;
    setScore(0);
    setDestroyedPlanets({ 0: 0, 1: 0, 2: 0, 3: 0 });
    setDestroyedEnemies(0);
    setGameOver(false);
    setGameStarted(false);
    setPaused(false);
  };

  // Función para terminar la partida (mostrar resultados)
  const terminateGame = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setGameOver(true);
  };

  // Función para dibujar la nave del jugador con base en el diseño elegido y el arma integrada
  const drawSpaceshipDesign = (
    ctx: CanvasRenderingContext2D,
    spaceship: { x: number; y: number; width: number; height: number },
    design: number,
    weapon: "normal" | "spread" | "laser"
  ) => {
    ctx.save();
    ctx.translate(spaceship.x, spaceship.y);
    // Cada diseño tendrá forma y colores distintos; se integrará una representación del armamento
    switch (design) {
      case 0:
        // Diseño 0: Nave abstracta con formas irregulares y detalles futuristas
        ctx.beginPath();
        ctx.moveTo(0, -spaceship.height * 0.5);
        ctx.bezierCurveTo(-spaceship.width * 0.6, -spaceship.height * 0.3,
                          -spaceship.width * 0.5, spaceship.height * 0.3,
                          0, spaceship.height * 0.5);
        ctx.bezierCurveTo(spaceship.width * 0.5, spaceship.height * 0.3,
                          spaceship.width * 0.6, -spaceship.height * 0.3,
                          0, -spaceship.height * 0.5);
        ctx.closePath();
        let grad0 = ctx.createRadialGradient(0, 0, spaceship.width * 0.1, 0, 0, spaceship.width * 0.5);
        grad0.addColorStop(0, "#ff3366");
        grad0.addColorStop(1, "#330000");
        ctx.fillStyle = grad0;
        ctx.fill();
        // Detalle: rayos de energía que irradian desde el centro
        for (let i = 0; i < 8; i++) {
          let angle = i * Math.PI / 4;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * spaceship.width * 0.6, Math.sin(angle) * spaceship.height * 0.6);
          ctx.strokeStyle = "#ffcc00";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        break;
      case 1:
        // Diseño 1: Nave geométrica abstracta con ángulos agudos y arma lateral integrada
        ctx.beginPath();
        ctx.moveTo(0, -spaceship.height * 0.45);
        ctx.lineTo(-spaceship.width * 0.55, 0);
        ctx.lineTo(0, spaceship.height * 0.45);
        ctx.lineTo(spaceship.width * 0.55, 0);
        ctx.closePath();
        let grad1 = ctx.createLinearGradient(0, -spaceship.height * 0.45, 0, spaceship.height * 0.45);
        grad1.addColorStop(0, "#6600cc");
        grad1.addColorStop(1, "#000033");
        ctx.fillStyle = grad1;
        ctx.fill();
        // Armamento lateral: pequeños triángulos a ambos lados
        ctx.beginPath();
        ctx.moveTo(-spaceship.width * 0.55, 0);
        ctx.lineTo(-spaceship.width * 0.7, spaceship.height * 0.1);
        ctx.lineTo(-spaceship.width * 0.55, spaceship.height * 0.2);
        ctx.closePath();
        ctx.fillStyle = weapon === "laser" ? "#ff0000" : "#777777";
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(spaceship.width * 0.55, 0);
        ctx.lineTo(spaceship.width * 0.7, -spaceship.height * 0.1);
        ctx.lineTo(spaceship.width * 0.55, -spaceship.height * 0.2);
        ctx.closePath();
        ctx.fill();
        break;
      case 2:
        // Diseño 2: Nave circular abstracta con detalles radiales y cúpula asimétrica
        ctx.beginPath();
        ctx.arc(0, 0, spaceship.width * 0.5, 0, Math.PI * 2);
        let grad2 = ctx.createRadialGradient(0, 0, spaceship.width * 0.2, 0, 0, spaceship.width * 0.5);
        grad2.addColorStop(0, "#00ffcc");
        grad2.addColorStop(1, "#003333");
        ctx.fillStyle = grad2;
        ctx.fill();
        // Detalles radiales: líneas que irradian desde el centro
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        for (let i = 0; i < 12; i++) {
          let angle = i * (Math.PI * 2 / 12);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * spaceship.width * 0.5, Math.sin(angle) * spaceship.width * 0.5);
          ctx.stroke();
        }
        // Cúpula asimétrica: un arco encima de la nave
        ctx.beginPath();
        ctx.arc(0, -spaceship.height * 0.15, spaceship.width * 0.3, Math.PI, 2 * Math.PI);
        ctx.fillStyle = "#cccccc";
        ctx.fill();
        // Cañón central alargado
        ctx.beginPath();
        ctx.rect(-4, -spaceship.height * 0.6, 8, spaceship.height * 0.2);
        ctx.fillStyle = weapon === "spread" ? "#ff9933" : "#111111";
        ctx.fill();
        break;
      case 3:
        // Diseño 3: Nave angular abstracta con forma de diamante y doble cañón
        ctx.beginPath();
        ctx.moveTo(-spaceship.width * 0.5, 0);
        ctx.lineTo(0, -spaceship.height * 0.5);
        ctx.lineTo(spaceship.width * 0.5, 0);
        ctx.lineTo(0, spaceship.height * 0.5);
        ctx.closePath();
        let grad3 = ctx.createLinearGradient(-spaceship.width * 0.5, 0, spaceship.width * 0.5, 0);
        grad3.addColorStop(0, "#009944");
        grad3.addColorStop(1, "#004422");
        ctx.fillStyle = grad3;
        ctx.fill();
        // Doble cañón: en la punta superior e inferior
        ctx.beginPath();
        ctx.rect(-3, -spaceship.height * 0.5 - 12, 6, 12);
        ctx.fillStyle = weapon === "laser" ? "#ff0000" : "#333333";
        ctx.fill();
        ctx.beginPath();
        ctx.rect(-3, spaceship.height * 0.5, 6, 12);
        ctx.fill();
        // Líneas diagonales para dar un toque abstracto
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-spaceship.width * 0.5, 0);
        ctx.lineTo(0, spaceship.height * 0.5);
        ctx.moveTo(spaceship.width * 0.5, 0);
        ctx.lineTo(0, spaceship.height * 0.5);
        ctx.stroke();
        break;
      case 4:
        // Diseño 4: Nave retro-pixel abstracta con patrón irregular y "armamento" digital
        ctx.fillStyle = "#ff66cc";
        ctx.fillRect(-spaceship.width * 0.5, -spaceship.height * 0.5, spaceship.width, spaceship.height);
        // Patrón pixelado abstracto
        ctx.fillStyle = "#000000";
        for (let i = -spaceship.width * 0.5; i < spaceship.width * 0.5; i += 10) {
          for (let j = -spaceship.height * 0.5; j < spaceship.height * 0.5; j += 10) {
            if (Math.random() < 0.2) {
              ctx.fillRect(i, j, 4, 4);
            }
          }
        }
        // "Arma" pixelada: rectángulo en la parte inferior central
        ctx.fillStyle = weapon === "laser" ? "#ff0000" : "#222222";
        ctx.fillRect(-spaceship.width * 0.15, spaceship.height * 0.2, spaceship.width * 0.3, 6);
        break;
      case 5:
        // Diseño 5: Nave futurista abstracta con efecto de neón y contornos irregulares
        ctx.beginPath();
        ctx.moveTo(0, -spaceship.height * 0.5);
        ctx.lineTo(-spaceship.width * 0.6, -spaceship.height * 0.1);
        ctx.lineTo(-spaceship.width * 0.4, spaceship.height * 0.5);
        ctx.lineTo(spaceship.width * 0.4, spaceship.height * 0.5);
        ctx.lineTo(spaceship.width * 0.6, -spaceship.height * 0.1);
        ctx.closePath();
        let grad5 = ctx.createLinearGradient(0, -spaceship.height * 0.5, 0, spaceship.height * 0.5);
        grad5.addColorStop(0, "#44ffff");
        grad5.addColorStop(1, "#004444");
        ctx.fillStyle = grad5;
        ctx.fill();
        // Contorno de neón brillante
        ctx.strokeStyle = "#ff00ff";
        ctx.lineWidth = 3;
        ctx.stroke();
        // "Barriga de cañones": rectángulo central y dos laterales
        ctx.beginPath();
        ctx.rect(-spaceship.width * 0.4, spaceship.height * 0.25, spaceship.width * 0.8, 8);
        ctx.fillStyle = weapon === "spread" ? "#ff9933" : "#ff00ff";
        ctx.fill();
        ctx.beginPath();
        ctx.rect(-spaceship.width * 0.6, spaceship.height * 0.1, 6, spaceship.height * 0.3);
        ctx.rect(spaceship.width * 0.6 - 6, spaceship.height * 0.1, 6, spaceship.height * 0.3);
        ctx.fill();
        break;
      default:
        break;
    }
    ctx.restore();
    
  }    

  // Función para dibujar una vista previa en miniatura de la nave
  const drawSpaceshipPreview = (
    ctx: CanvasRenderingContext2D,
    design: number,
    weapon: "normal" | "spread" | "laser"
  ) => {
    // Dibujamos la nave centrada en el canvas de preview (60x60)
    const previewShip = { x: 30, y: 30, width: 40, height: 50 };
    drawSpaceshipDesign(ctx, previewShip, design, weapon);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Dimensiones internas fijas
    const baseWidth = 800;
    const baseHeight = 600;
    canvas.width = baseWidth;
    canvas.height = baseHeight;

    // Prevenir scroll en dispositivos táctiles
    canvas.style.touchAction = "none";
    canvas.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
    canvas.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });

    let tapCount = 0;
    let lastTapTime = 0;
    const tapDelay = 300;

    const shootShot = (weaponType: "normal" | "spread" | "laser") => {
      if (!canShoot) return;
      if (weaponType === "normal") {
        bullets.push({
          x: spaceship.x,
          y: spaceship.y - spaceship.height / 2,
          radius: 5,
          speed: 9,
          type: "normal",
        });
      } else if (weaponType === "spread") {
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
      } else if (weaponType === "laser") {
        bullets.push({
          x: spaceship.x,
          y: spaceship.y - spaceship.height / 2,
          radius: 2,
          speed: 20,
          type: "laser",
        });
      }
      canShoot = false;
      setTimeout(() => {
        canShoot = true;
      }, 300);
    };

    const smoothingFactor = 0.15;
    let targetPosition = { x: baseWidth / 2, y: baseHeight - 120 };

    const updateSpaceshipPosition = (e: TouchEvent) => {
      if (e.touches.length > 1) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      targetPosition.x = (touch.clientX - rect.left) * scaleX;
      targetPosition.y = (touch.clientY - rect.top) * scaleY;
    };

    canvas.addEventListener("touchstart", updateSpaceshipPosition, { passive: false });
    canvas.addEventListener("touchmove", updateSpaceshipPosition, { passive: false });

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      const currentTime = Date.now();
      if (currentTime - lastTapTime < tapDelay) {
        tapCount++;
      } else {
        tapCount = 1;
      }
      lastTapTime = currentTime;
      setTimeout(() => {
        if (Date.now() - lastTapTime >= tapDelay) {
          if (tapCount === 1) {
            shootShot("normal");
          } else if (tapCount === 2) {
            shootShot("spread");
          } else if (tapCount >= 3) {
            shootShot("laser");
          }
          tapCount = 0;
        }
      }, tapDelay);
    };

    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

    const numStars = 100;
    const stars: { x: number; y: number; radius: number }[] = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * baseWidth,
        y: Math.random() * baseHeight,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    const spaceship = {
      x: baseWidth / 2,
      y: baseHeight - 120,
      width: 50,
      height: 70,
      speed: 6,
    };

    let bullets: Bullet[] = [];
    let obstacles: Obstacle[] = [];
    let enemies: Enemy[] = [];
    let enemyBullets: Bullet[] = [];
    let keys: { [key: string]: boolean } = {};
    let canShoot = true;

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

    let obstacleTimer = 0;
    const obstacleInterval = 150;
    const createObstacle = () => {
      const radius = 20 + Math.random() * 50;
      const x = Math.random() * (baseWidth - 2 * radius) + radius;
      const y = -radius;
      const baseSpeedLevels = [0.6, 1.2, 1.8, 2.4];
      let speedMultiplier = 1;
      if (scoreRef.current >= 6000) {
        speedMultiplier = 2;
      } else if (scoreRef.current >= 3000) {
        speedMultiplier = 1.5;
      }
      const speed =
        baseSpeedLevels[Math.floor(Math.random() * baseSpeedLevels.length)] *
        speedMultiplier;
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

    let enemyTimer = 0;
    let enemyInterval = 600;
    const createEnemy = () => {
      const width = 40;
      const height = 40;
      const x = Math.random() * (baseWidth - width) + width / 2;
      const y = -height;
      let enemySpeed = 1.5;
      if (scoreRef.current >= 6000) {
        enemySpeed = 3;
      } else if (scoreRef.current >= 3000) {
        enemySpeed = 2;
      }
      enemies.push({
        x,
        y,
        width,
        height,
        speed: enemySpeed,
        shootTimer: 0,
      });
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

    const drawSpaceship = () => {
      // Se utiliza el diseño elegido por el usuario (shipDesign) y el arma seleccionada
      drawSpaceshipDesign(ctx, spaceship, shipDesign, selectedWeapon);
    };

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
      ctx.save();
      ctx.beginPath();
      ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
      ctx.fillStyle = obs.gradient;
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(obs.x, obs.y, obs.radius * 1.2, obs.radius * 0.4, Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    };

    const drawFragment = (frag: Fragment) => {
      ctx.beginPath();
      ctx.arc(frag.x, frag.y, frag.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,165,0,${frag.life / 30})`;
      ctx.fill();
      ctx.closePath();
    };

    const drawEnemy = (enemy: Enemy) => {
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.beginPath();
      ctx.moveTo(0, -enemy.height / 2);
      ctx.lineTo(-enemy.width / 2, enemy.height / 4);
      ctx.lineTo(-enemy.width / 4, enemy.height / 2);
      ctx.lineTo(enemy.width / 4, enemy.height / 2);
      ctx.lineTo(enemy.width / 2, enemy.height / 4);
      ctx.closePath();
      let enemyGrad = ctx.createLinearGradient(0, -enemy.height / 2, 0, enemy.height / 2);
      enemyGrad.addColorStop(0, "#ffcc00");
      enemyGrad.addColorStop(1, "#cc9900");
      ctx.fillStyle = enemyGrad;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, enemy.width / 6, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.restore();
    };

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

    const circleCollision = (
      x1: number,
      y1: number,
      r1: number,
      x2: number,
      y2: number,
      r2: number
    ) => {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy) < r1 + r2;
    };

    const gameLoop = () => {
      if (paused) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, baseWidth, baseHeight);
        ctx.fillStyle = "yellow";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("PAUSADO", baseWidth / 2, baseHeight / 2);
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      drawBackground();
      if (!gameStarted) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      let dificultad: "facil" | "medio" | "avanzado" = "facil";
      if (scoreRef.current >= 6000) {
        dificultad = "avanzado";
      } else if (scoreRef.current >= 3000) {
        dificultad = "medio";
      }

      // Condición de victoria a 13,000 puntos
      if (scoreRef.current >= 13000) {
        setGameOver(true);
        ctx.fillStyle = "rgba(0,0,0,0.85)";
        ctx.fillRect(0, baseHeight / 2 - 50, baseWidth, 100);
        ctx.fillStyle = "green";
        ctx.font = "32px Arial";
        ctx.textAlign = "center";
        ctx.fillText("¡HAS GANADO!", baseWidth / 2, baseHeight / 2 + 15);
        return;
      }

      if (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) {
        spaceship.x += (targetPosition.x - spaceship.x) * smoothingFactor;
        spaceship.y += (targetPosition.y - spaceship.y) * smoothingFactor;
      }

      if (keys["ArrowLeft"]) {
        spaceship.x -= spaceship.speed;
      }
      if (keys["ArrowRight"]) {
        spaceship.x += spaceship.speed;
      }
      if (keys["ArrowUp"]) {
        spaceship.y -= spaceship.speed;
      }
      if (keys["ArrowDown"]) {
        spaceship.y += spaceship.speed;
      }
      if (keys["z"]) {
        spaceship.x += keys["ArrowRight"] ? spaceship.speed * 0.8 : 0;
        spaceship.x -= keys["ArrowLeft"] ? spaceship.speed * 0.8 : 0;
        spaceship.y -= keys["ArrowUp"] ? spaceship.speed * 0.8 : 0;
        spaceship.y += keys["ArrowDown"] ? spaceship.speed * 0.8 : 0;
      }
      spaceship.x = Math.max(spaceship.width / 2, Math.min(spaceship.x, baseWidth - spaceship.width / 2));
      spaceship.y = Math.max(spaceship.height / 2, Math.min(spaceship.y, baseHeight - spaceship.height / 2));

      if (keys["x"] && canShoot) {
        shootShot(selectedWeapon);
      }

      drawSpaceship();

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

      obstacleTimer++;
      if (obstacleTimer > obstacleInterval) {
        createObstacle();
        obstacleTimer = 0;
      }
      obstacles = obstacles.filter(obs => obs.y - obs.radius < baseHeight);
      obstacles.forEach((obs, index) => {
        obs.y += obs.speed;
        drawObstacle(obs);

        if (circleCollision(spaceship.x, spaceship.y, spaceship.width * 0.3, obs.x, obs.y, obs.radius)) {
          setGameOver(true);
          if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
          return;
        }

        bullets.forEach((bullet, bIndex) => {
          if (circleCollision(bullet.x, bullet.y, bullet.radius, obs.x, obs.y, obs.radius)) {
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

      enemyTimer++;
      let enemySpawnInterval = dificultad === "facil" ? 800 : dificultad === "medio" ? 600 : 400;
      if (enemyTimer > enemySpawnInterval) {
        createEnemy();
        enemyTimer = 0;
      }
      enemies = enemies.filter(enemy => enemy.y - enemy.height < baseHeight);
      enemies.forEach((enemy, eIndex) => {
        enemy.y += enemy.speed;
        enemy.shootTimer++;
        let enemyShootInterval = dificultad === "facil" ? 120 : dificultad === "medio" ? 90 : 60;
        if (enemy.shootTimer > enemyShootInterval) {
          const angle = Math.atan2(spaceship.y - enemy.y, spaceship.x - enemy.x);
          enemyBullets.push({
            x: enemy.x,
            y: enemy.y + enemy.height / 2,
            radius: 4,
            speed: dificultad === "avanzado" ? 5 : 4,
            angle,
          });
          enemy.shootTimer = 0;
        }
        drawEnemy(enemy);

        if (
          spaceship.x > enemy.x - enemy.width / 2 &&
          spaceship.x < enemy.x + enemy.width / 2 &&
          spaceship.y > enemy.y - enemy.height / 2 &&
          spaceship.y < enemy.y + enemy.height / 2
        ) {
          setGameOver(true);
          if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
          return;
        }

        bullets.forEach((bullet, bIndex) => {
          if (circleCollision(bullet.x, bullet.y, bullet.radius, enemy.x, enemy.y, enemy.width / 2)) {
            enemies.splice(eIndex, 1);
            bullets.splice(bIndex, 1);
            scoreRef.current += 200;
            setDestroyedEnemies(prev => prev + 1);
          }
        });
      });

      enemyBullets = enemyBullets.filter(b => b.y - (b.radius || 0) < baseHeight);
      enemyBullets.forEach((b, index) => {
        if (b.angle !== undefined) {
          b.x += b.speed * Math.cos(b.angle);
          b.y += b.speed * Math.sin(b.angle);
        } else {
          b.y += b.speed;
        }
        drawBullet(b);
        if (circleCollision(b.x, b.y, b.radius, spaceship.x, spaceship.y, spaceship.width * 0.3)) {
          setGameOver(true);
          if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
          return;
        }
      });

      updateFragments();
      fragments.forEach(frag => {
        drawFragment(frag);
      });

      setScore(scoreRef.current);
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.textAlign = "left";
      ctx.fillText("Score: " + scoreRef.current, 20, 30);
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.textAlign = "right";
      ctx.fillText("Dificultad: " + dificultad.toUpperCase(), baseWidth - 20, 30);

      if (!gameOver) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
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
      canvas.removeEventListener("touchstart", updateSpaceshipPosition);
      canvas.removeEventListener("touchmove", updateSpaceshipPosition);
      canvas.removeEventListener("touchend", handleTouchEnd);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameStarted, selectedWeapon, paused, resetGame, shipDesign]);

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
            onClick={() => setPaused((p) => !p)}
            style={{
              padding: "6px 10px",
              marginRight: "10px",
              background: "rgba(0, 119, 204, 0.6)",
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
              marginRight: "10px",
              background: "rgba(204, 0, 0, 0.6)",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Reiniciar
          </button>
          <button
            onClick={terminateGame}
            style={{
              padding: "6px 10px",
              background: "rgba(100, 100, 100, 0.6)",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Terminar partida
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
          <p style={{ marginBottom: "10px" }}>
            Para PC: Usa las flechas para mover la nave, "z" para impulso extra y "x" para disparar.
          </p>
          <p style={{ marginBottom: "10px" }}>
            Para móvil: Arrastra para mover la nave y toca 1, 2 o 3 veces para disparar.
          </p>
          <div style={{ margin: "20px" }}>
            <span style={{ marginRight: "10px" }}>Elige tu armamento (para teclado):</span>
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
          {/* Nueva sección para elegir el diseño de la nave */}
          <div style={{ margin: "20px" }}>
            <span style={{ marginRight: "10px" }}>Elige el diseño de tu nave:</span>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <canvas
                  key={i}
                  width={60}
                  height={60}
                  style={{
                    border: shipDesign === i ? "2px solid yellow" : "1px solid gray",
                    margin: "0 5px",
                    cursor: "pointer",
                  }}
                  ref={(el) => {
                    if (el) {
                      const ctx = el.getContext("2d");
                      if (ctx) {
                        // Dibuja la vista previa con el arma seleccionada
                        drawSpaceshipPreview(ctx, i, selectedWeapon);
                      }
                    }
                  }}
                  onClick={() => setShipDesign(i)}
                />
              ))}
            </div>
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
          <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
            {scoreRef.current >= 13000 ? "¡HAS GANADO!" : "GAME OVER"}
          </h2>
          <p style={{ marginBottom: "10px" }}>Score: {score}</p>
          <div style={{ margin: "10px 0", textAlign: "left" }}>
            <h3 style={{ marginBottom: "5px" }}>Planetas Destruidos:</h3>
            {Object.keys(destroyedPlanets).map((key) => {
              const design = Number(key);
              const info = designNames[design];
              return (
                <p key={design} style={{ color: info.color, margin: "2px 0" }}>
                  {info.name}: {destroyedPlanets[design]}
                </p>
              );
            })}
            <p style={{ marginTop: "10px" }}>Enemigos Destruidos: {destroyedEnemies}</p>
          </div>
          <button
            onClick={restartGame}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              background: "rgba(204, 0, 0, 0.6)",
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
