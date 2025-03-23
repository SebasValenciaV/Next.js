"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * Este componente contiene tu currículum EXACTAMENTE como lo proporcionaste,
 * con tus datos e información. No se ha eliminado nada.
 */
function CurriculumContent() {
  return (
    <div className="bg-black/80 min-h-screen py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HEADER: Ocupando ambas columnas */}
        <div className="md:col-span-2 bg-black/50 p-6 rounded-lg flex flex-col items-center">
          <div className="relative rounded-full overflow-hidden w-36 h-36 border-4 border-green-500 mb-4">
            <Image
              src="/Foto gafas.jpeg"
              alt="Profile Image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          {/* NOMBRE EN BLANCO */}
          <h1
            className="text-4xl font-bold text-white"
            style={{ textShadow: "0 0 5px #FFF" }}
          >
            Sebastian Valencia Vargas
          </h1>
          <p
            className="text-lg mt-2 text-white"
            style={{ textShadow: "0 0 3px #FFF" }}
          >
            FullStack Developer | Expert in React, Next.js, Node.js, and More
          </p>
        </div>

        {/* INTRODUCTION */}
        <div className="bg-black/50 p-6 rounded-lg">
          {/* Título en verde Matrix */}
          <h2
            className="text-3xl font-semibold mb-4 text-[#0F0]"
            style={{ textShadow: "0 0 5px #0F0" }}
          >
            Introduction
          </h2>
          <p className="text-white leading-relaxed">
            Expert in coding with proficiency in various languages such as Python,
            PHP, C++, C#, and JavaScript, and in frameworks such as Next.js, React.js,
            Node.js, and Vite. A solid foundation in data structures, algorithms,
            and software architectures, combined with agile methodologies, enables me to
            efficiently solve complex challenges. Proficient in both back-end and front-end
            design, I optimize software solutions through secure coding practices.
            I have experience in systems administration, technology management, and website
            development. My exceptional leadership skills allow me to effectively organize
            tasks and coordinate teams or departments to successfully complete projects
            across diverse market and real-life environments.
            Additionally, I have practical experience developing AI prompts that guide models to
            deliver improved accuracy, instruction following, creativity, writing quality, and
            reasoning.
          </p>
        </div>

        {/* PROFESSIONAL EXPERIENCE */}
        <div className="bg-black/50 p-6 rounded-lg">
          <h2
            className="text-3xl font-semibold mb-4 text-[#0F0]"
            style={{ textShadow: "0 0 5px #0F0" }}
          >
            Professional Experience
          </h2>
          <ul className="list-disc list-inside text-white space-y-2">
            <li>
              <strong>Avianca Holdings</strong> – Aircraft Maintenance Technician{" "}
              <em>(Sep 2018 – Mar 2020)</em>
              <br />
              Responsible for inspections, repairs, and component installations on
              commercial and private aircraft, collaborating with the team to
              deliver high-quality results.
            </li>
            <li>
              <strong>Granity Entertainment DAC</strong> – Webmaster &amp; Technical
              Support <em>(Jun 2023 – Nov 2024)</em>
              <br />
              Specialized in technical support, problem resolution, and ensuring
              security and efficiency in multiple languages (French, English,
              Portuguese, German, Russian, Italian, Dutch).
            </li>
            <li>
              <strong>Ducaplast Sas</strong> – FullStack Developer{" "}
              <em>(Jun 2024 – Nov 2024)</em>
              <br />
              Developed an e-commerce platform (
              <a
                href="https://ducaplast.com.co/"
                className="text-white underline"
                target="_blank"
                rel="noreferrer"
              >
                ducaplast.com.co
              </a>
              ) using Python and Django (SQLite for development, PostgreSQL in
              production) and HTML, CSS/Bootstrap, and JavaScript for a responsive
              front-end.
            </li>
          </ul>
        </div>

        {/* PROJECTS & FREELANCE */}
        <div className="bg-black/50 p-6 rounded-lg">
          <h2
            className="text-3xl font-semibold mb-4 text-[#0F0]"
            style={{ textShadow: "0 0 5px #0F0" }}
          >
            Projects &amp; Freelance
          </h2>
          <ul className="list-disc list-inside text-white space-y-2">
            <li>Object-Oriented Programming games (55 Hrs, 2023)</li>
            <p className="text-white">
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/SebasValenciaV"
                className="text-white underline"
                target="_blank"
                rel="noreferrer"
              >
                SebasValenciaV
              </a>
            </p>
            <p className="text-white">
              <strong>Blog:</strong>{" "}
              <a
                href="https://developersebastianvalencia.blogspot.com"
                className="text-white underline"
                target="_blank"
                rel="noreferrer"
              >
                developersebastianvalencia.blogspot.com
              </a>
            </p>
          </ul>
        </div>

        {/* SKILLS */}
        <div className="bg-black/50 p-6 rounded-lg">
          <h2
            className="text-3xl font-semibold mb-4 text-[#0F0]"
            style={{ textShadow: "0 0 5px #0F0" }}
          >
            Skills
          </h2>
          <p className="text-white">
            JavaScript, TypeScript, Python, PHP, C++, C#, Next.js, React.js, Node.js,
            Vite, HTML, CSS/Bootstrap, Django, SQL, Agile methodologies, data structures,
            algorithms, secure coding, and systems administration.
          </p>
        </div>

        {/* EDUCATION & COURSES */}
        <div className="bg-black/50 p-6 rounded-lg">
          <h2
            className="text-3xl font-semibold mb-4 text-[#0F0]"
            style={{ textShadow: "0 0 5px #0F0" }}
          >
            Education &amp; Courses
          </h2>
          <ul className="list-disc list-inside text-white space-y-2">
            <li>
              <strong>Institución Universitaria Pascual Bravo</strong> – Software
              Developer (2020 – 2024)
            </li>
            <li>
              <strong>Colegio La Salle Medellín</strong> – High School Diploma (2008 –
              2015)
            </li>
            <li>
              <strong>Academia Antioqueña de Aviación</strong> – Aircraft Maintenance
              Technician (2016 – 2020)
            </li>
            <li>
              <strong>I.E Pascual Bravo</strong> – Information Security / IT Essentials
              (50 Hrs, 2024)
            </li>
            <li>
              <strong>Udemy</strong> – Front and Backend Web Development (38 Hrs, 2024)
            </li>
            <li>
              <strong>Eafit University</strong> – English lvl B2 writting, reading &amp;
              speaking (3 years 2013, 2026)
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="bg-black/50 p-6 rounded-lg">
          <h2
            className="text-3xl font-semibold mb-4 text-[#0F0]"
            style={{ textShadow: "0 0 5px #0F0" }}
          >
            Contact
          </h2>
          <p className="text-white">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:sebas19-98@hotmail.com"
              className="text-white underline"
            >
              sebas19-98@hotmail.com
            </a>
          </p>
          <p className="text-white">
            <strong>Phone:</strong> (+57) 316 8859466
          </p>
          <p className="text-white">
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/sebastian-valencia-v-23506b243/"
              className="text-white underline"
              target="_blank"
              rel="noreferrer"
            >
              SebasValenciaV
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showCurriculum, setShowCurriculum] = useState(false);

  useEffect(() => {
    // Usamos non-null assertion operator (!) para forzar a TS a no quejarse.
    // Advertencia: si el canvas no existe en el DOM, dará error en tiempo de ejecución.
    const canvas = document.getElementById("matrix")! as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixChars = "天地玄黄宇宙洪荒0123456789";
    const charsArray = matrixChars.split("");
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // Letras verdes Matrix
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
  }, []);

  return (
    <div>
      {/* Canvas con efecto Matrix */}
      <canvas
        id="matrix"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />

      {/* Encabezado */}
      <header className="p-4 flex justify-center items-center bg-transparent">
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded transition-colors duration-300 bg-transparent border border-white text-white hover:bg-white hover:text-black">
            Login
          </button>
          <button className="px-4 py-2 rounded transition-colors duration-300 bg-transparent border border-white text-white hover:bg-white hover:text-black">
            Register
          </button>
        </div>
      </header>

      {/* Sección principal (Hero) */}
      <section className="py-20 text-center bg-transparent">
        <h1
          className="text-4xl font-bold mb-4 text-white transition-colors duration-300"
          style={{ textShadow: "0 0 5px #FFF" }}
        >
          Welcome to my website
        </h1>
        <p
          className="text-xl mb-8 text-white transition-colors duration-300"
          style={{ textShadow: "0 0 3px #FFF" }}
        >
          |||
        </p>
        <button
          onClick={() => setShowCurriculum(!showCurriculum)}
          className="px-6 py-3 rounded-lg text-xl font-semibold shadow-lg transition-colors duration-300 bg-transparent border border-white text-white hover:bg-white hover:text-black"
        >
          {showCurriculum ? "Hide CV" : "View Currículum"}
        </button>
      </section>

      {/* Renderizado condicional del currículum */}
      {showCurriculum && <CurriculumContent />}
    </div>
  );
}
