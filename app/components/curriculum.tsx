import Image from "next/image";
import { FaLinkedin, FaGithub, FaBloggerB } from "react-icons/fa";

export default function CurriculumContent() {
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
              FullStack Developer | Expert in React, Next.js, Node.js, and More
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
            </div>
          </div>
        </div>

        {/* INTRODUCTION */}
        <div className="curriculum-section">
          <h2 className="section-title">Introduction</h2>
          <p className="section-text">
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
        <div className="curriculum-section">
          <h2 className="section-title">Professional Experience</h2>
          <ul className="section-list">
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
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                ducaplast.com.co
              </a>
              ) using Python and Django (SQLite for development, PostgreSQL in
              production) and HTML, JavaScript and CSS, Bootstrap for a responsive
              front-end.
            </li>
          </ul>
        </div>

        {/* PROJECTS & FREELANCE */}
        <div className="curriculum-section">
          <h2 className="section-title">Projects &amp; Freelance</h2>
          <ul className="section-list">
            <li>Object-Oriented Programming games (55 Hrs, 2023)</li>
          </ul>
          <p className="section-text">
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/SebasValenciaV"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              SebasValenciaV
            </a>
          </p>
          <p className="section-text">
            <strong>Blog:</strong>{" "}
            <a
              href="https://developersebastianvalencia.blogspot.com"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              developersebastianvalencia.blogspot.com
            </a>
          </p>
        </div>

        {/* SKILLS */}
        <div className="curriculum-section">
          <h2 className="section-title">Skills</h2>
          <p className="section-text">
            JavaScript, TypeScript, Python, PHP, C++, C#, Next.js, React.js, Node.js,
            Vite, HTML, CSS/Bootstrap, Django, SQL, Agile methodologies, data structures,
            algorithms, secure coding, and systems administration.
          </p>
        </div>

        {/* EDUCATION & COURSES */}
        <div className="curriculum-section">
          <h2 className="section-title">Education &amp; Courses</h2>
          <ul className="section-list">
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
        <div className="curriculum-section">
          <h2 className="section-title">Contact</h2>
          <p className="section-text">
            <strong>Email:</strong>{" "}
            <a href="mailto:sebas19-98@hotmail.com" className="link">
              sebas19-98@hotmail.com
            </a>
          </p>
          <p className="section-text">
            <strong>Phone:</strong> (+57) 316 8859466
          </p>
        </div>
      </div>
    </div>
  );
}
