"use client";

import Image from "next/image";
import { FaLinkedin, FaGithub, FaBloggerB,  FaDownload  } from "react-icons/fa";

type CurriculumContentProps = {
  language: string;
};

export default function CurriculumContent({ language }: CurriculumContentProps) {
  return (
    <div className="curriculum-container">
      <div className="curriculum-grid">
        {/* HEADER: Ocupando ambas columnas */}
        <div className="curriculum-header">
          <div className="profile-image">
            <Image
              src="/Foto gafas.jpeg"
              alt="Profile Image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <h1 className="profile-name">Sebastian Valencia Vargas</h1>
          {/* Contenedor de iconos y título */}
          <div className="header-extra">
            <p className="profile-description">
              {language === "es"
                ? "Desarrollador FullStack | Experto en React, Next.js, Node.js y Más"
                : "FullStack Developer | Expert in React, Next.js, Node.js, and More"}
            </p>
            <div className="social-icons-header">
              <a
                href="https://www.linkedin.com/in/sebastian-valencia-v-23506b243/"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/SebasValenciaV"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://developersebastianvalencia.blogspot.com"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <FaBloggerB size={24} />
              </a>
              <div className="download-container" style={{ textAlign: "center" }}>
          <a href="/curriculum.pdf" download className="download-button" style={{ color: "#FFFFFF" }}>
            <FaDownload size={20} className="download-icon" />
            <span>{language === "es" ? "Descargar Curriculum PDF" : "Download Resume PDF"}</span>
          </a>
        </div>
            </div>
          </div>
        </div>
        {/* Botón de Descargar PDF */}
       
        
        

        {/* INTRODUCTION */}
        <div className="curriculum-section">
          <h2 className="section-title">
            {language === "es" ? "Introducción" : "Introduction"}
          </h2>
          <p className="section-text">
            {language === "es"
              ? `Experto en codificación con dominio de diversos lenguajes como Python, PHP, C++, C# y JavaScript, y en frameworks/ Librerias como Next.js, React.js, Node.js Angular .Net y Vite. 
Con una sólida base en estructuras de datos, algoritmos y arquitecturas de software, combinada con metodologías ágiles, resuelvo desafíos complejos de manera eficiente. 
Competente en el diseño tanto de back-end como de front-end, optimizo soluciones de software mediante prácticas de codificación seguras. 
Cuento con experiencia en administración de sistemas, gestión tecnológica y desarrollo de sitios web. 
Mis excepcionales habilidades de liderazgo me permiten organizar tareas y coordinar equipos o departamentos para completar con éxito proyectos en diversos mercados y entornos reales. 
Además, tengo experiencia práctica en el desarrollo de prompts de IA que guían a los modelos para ofrecer una mayor precisión, seguimiento de instrucciones, creatividad, calidad en la escritura y razonamiento, se diseñar e implementar APIs o intercambio de archivos para musica, juegos 2D ó 3D y ChatBots.`
              : `Expert in coding with proficiency in various languages such as Python, PHP, C++, C#, and JavaScript, and in frameworks such as Next.js React.js Node.js Angular .Net and Vite. 
A solid foundation in data structures, algorithms, and software architectures, combined with agile methodologies, enables me to efficiently solve complex challenges. 
Proficient in both back-end and front-end design, I optimize software solutions through secure coding practices. 
I have experience in systems administration, technology management, and website development. 
My exceptional leadership skills allow me to effectively organize tasks and coordinate teams or departments to successfully complete projects across diverse market and real-life environments. 
Additionally, I have practical experience developing AI prompts that guide models to deliver improved accuracy, instruction following, creativity, writing quality, and reasoning, I can design and implement APIs or file exchange for music, games 2D or 3D and ChatBots.`}
          </p>
        </div>

        {/* PROFESSIONAL EXPERIENCE */}
        <div className="curriculum-section">
          <h2 className="section-title">
            {language === "es" ? "Experiencia Profesional" : "Professional Experience"}
          </h2>
          <ul className="section-list">
            
            <li>
              <strong>Granity Estudios</strong> –{" "}
              {language === "es"
                ? "Webmaster y Soporte Técnico"
                : "Webmaster & Technical Support"}{" "}
              <em>(Jun 2023 – Nov 2024)</em>
              <br />
              {language === "es"
                ? "Soporte al cliente, resolucion de problemas, analisis de datos, administracion de plataforma web, informes de casos de investigacion profunda garantizando los derechos de todos los ususarios."
                : "Specialized in technical support, problem resolution, and ensuring security and efficiency in multiple languages (French, English, Portuguese, German, Russian, Italian, Dutch)."}
            </li>
            <li>
              <strong>Ducaplast Sas</strong> –{" "}
              {language === "es" ? " Desarrollador Fullstack Freelance " : "FullStack Developer Freelance"}{" "}
              <em>(Jun 2024 – Nov 2024)</em>
              <br />
              {language === "es"
                ? <>Desarrollar una plataforma de e-commerce (
                  <a
                    href="https://ducaplast.com.co/"
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    ducaplast.com.co
                  </a>
                  ) utilizando Python y Django (SQLite para desarrollo, PostgreSQL en producción) y HTML, JavaScript, CSS y Bootstrap para un front-end responsivo.</>
                : <>Developed an e-commerce platform (
                  <a
                    href="https://ducaplast.com.co/"
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    ducaplast.com.co
                  </a>
                  ) using Python and Django (SQLite for development, PostgreSQL in production) and HTML, JavaScript, CSS, and Bootstrap for a responsive front-end.</>}
            </li>
            <li>
              <strong>Bancolombia</strong> –{" "}
              {language === "es" ? " Asesor jurídico independiente " : "Independent legal advisor"}{" "}
              <em>(Dic 2024  –  Mar 2025)</em>
              <br />
              {language === "es"
                ? <>Analizar documentación legal de inmuebles para verificar su
                validez, identificar irregularidades y garantizar la correcta
                transferencia de propiedad. elaborando informes jurídicos que
                respaldan transacciones seguras. </>
                : <> Analyze legal property documentation to verify its validity, identify irregularities, and ensure the proper transfer of ownership, while preparing legal reports that support secure transactions.</>}
            </li>
            <li>
              <strong>Avianca Holdings</strong> –{" "}
              {language === "es"
                ? "Técnico de Mantenimiento de Aeronaves"
                : "Aircraft Maintenance Technician"}{" "}
              <em>(Sep 2018 – Mar 2020)</em>
              <br />
              {language === "es"
                ? "Responsable de inspecciones, reparaciones e instalaciones de componentes en aeronaves comerciales y privadas, colaborando con el equipo para obtener resultados de alta calidad."
                : "Responsible for inspections, repairs, and component installations on commercial and private aircraft, collaborating with the team to deliver high-quality results."}
            </li>
          </ul>
        </div>
        {/* Habilidades complementaria */}
        <div className="curriculum-section">
          <h2 className="section-title">
            {language === "es" ? "Habilidades Complementarias" : "Skills"}
          </h2>
          <p className="section-text">
            {language === "es"
              ? "Experto en TI con experiencia en el diseño y evolución de servicios y arquitecturas innovadoras. Domino el levantamiento de requisitos, la gestión de cambios y el análisis de demanda, complementado por conocimientos en marketing, normativas legales y certificación digital para asegurar la continuidad y seguridad."
              : "IT expert with proven experience in designing and evolving innovative services and architectures. Skilled in requirements gathering, change management, and demand analysis, complemented by expertise in marketing, legal regulations, and digital certification to ensure the continuity and security of critical systems."}
          </p>
        </div>
        
        {/* SKILLS */}
        <div className="curriculum-section">
          <h2 className="section-title">
            {language === "es" ? "Habilidades" : "Skills"}
          </h2>
          <p className="section-text">
            {language === "es"
              ? "JavaScript, TypeScript, Python, PHP, C++, C#, Next.js, React.js, Node.js, Vite, HTML, CSS/Bootstrap, Django, SQL, metodologías ágiles, estructuras de datos, algoritmos, codificación segura y administración de sistemas."
              : "JavaScript, TypeScript, Python, PHP, C++, C#, Next.js, React.js, Node.js, Vite, HTML, CSS/Bootstrap, Django, SQL, Agile methodologies, data structures, algorithms, secure coding, and systems administration."}
          </p>
        </div>

        {/* EDUCATION & COURSES */}
        <div className="curriculum-section">
          <h2 className="section-title">
            {language === "es" ? "Educación y Cursos" : "Education & Courses"}
          </h2>
          <ul className="section-list">
            <li>
              <strong>Institución Universitaria Pascual Bravo</strong> –{" "}
              {language === "es" ? "Desarrollador de Software (2020 – 2024)" : "Software Developer (2020 – 2024)"}
            </li>
    
            <li>
              <strong>Academia Antioqueña de Aviación</strong> –{" "}
              {language === "es" ? "Técnico en Mantenimiento de Aeronaves (2016 – 2020)" : "Aircraft Maintenance Technician (2016 – 2020)"}
            </li>
            <li>
              <strong>Colegio La Salle de CampoAmor - Medellín</strong> –{" "}
              {language === "es" ? "Diploma de Educación Media (2008 – 2015)" : "High School Diploma (2008 – 2015)"}
            </li>
            <li>
              <strong>I.E Pascual Bravo</strong> –{" "}
              {language === "es" ? "(POO) Programacion Orientada a Objetos (38 Hrs, 2024)" : "(OOP) Object-Oriented Programming (50 Hrs, 2024)"}
            </li>
            <li>
              <strong>I.E Pascual Bravo</strong> –{" "}
              {language === "es" ? "(POE) Programacion Orientada a Eventos (38 Hrs, 2024)" : "(EDP) Event-Driven  Programming (50 Hrs, 2024)"}
            </li>
            <li>
              <strong>I.E Pascual Bravo</strong> –{" "}
              {language === "es" ? "Seguridad Informática / IT Essentials (50 Hrs, 2024)" : "Information Security / IT Essentials (50 Hrs, 2024)"}
            </li>
            <li>
              <strong>Udemy</strong> –{" "}
              {language === "es" ? "Desarrollo Web/App Frontend y Backend (100 Hrs, 2024)" : "Front and Backend Web/App Development (38 Hrs, 2024)"}
            </li>
            <li>
              <strong>Eafit University</strong> –{" "}
              {language === "es"
                ? "Inglés lvl B2: escritura, lectura y conversación (3 años 2013, 2026)"
                : "English lvl B2: writing, reading & speaking (3 years 2013, 2026)"}
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="curriculum-section">
          <h2 className="section-title">
            {language === "es" ? "Contacto" : "Contact"}
          </h2>
          <p className="section-text">
            <strong>{language === "es" ? "Correo:" : "Email:"} </strong>
            <a href="mailto:sebas19-98@hotmail.com" className="link">
              sebas19-98@hotmail.com
            </a>
          </p>
          <p className="section-text">
            <strong>{language === "es" ? "Teléfono:" : "Phone:"} </strong>(+57) 316 8859466
          </p>
        </div>
      </div>
    </div>
  );
}
