import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black min-h-screen py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HEADER: spans both columns on md+ */}
        <div className="md:col-span-2 bg-gray-900/50 p-6 rounded-lg flex flex-col items-center">
          <div className="relative rounded-full overflow-hidden w-36 h-36 border-4 border-pink-500 mb-4">
            <Image
              src="/Foto gafas.jpeg"
              alt="Profile Image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <h1
            className="text-4xl font-bold"
            style={{
              textShadow: "0 0 2px #ff0099, 0 0 5px #ff0099",
            }}
          >
            Sebastian Valencia Vargas
          </h1>
          <p className="text-lg mt-2 text-gray-300">
            FullStack Developer | Expert in React, Next.js, Node.js, and More
          </p>
        </div>

        {/* INTRODUCTION CARD (left column) */}
        <div className="bg-gray-900/50 p-6 rounded-lg">
          <h2
            className="text-3xl font-semibold mb-4"
            style={{
              textShadow: "0 0 2px #00eaff, 0 0 5px #00eaff",
            }}
          >
            Introduction
          </h2>
          <p className="text-gray-200 leading-relaxed">
          Expert in coding with proficiency in various languages such as Python, PHP, C++,
C#, and JavaScript, and in frameworks such as Next.js, React.js, Node.js, and Vite. A
solid foundation in data structures, algorithms, and software architectures,
combined with agile methodologies, enables me to efficiently solve complex
challenges. Proficient in both back-end and front-end design, I optimize software
solutions through secure coding practices.
I have experience in systems administration, technology management, and website
development. My exceptional leadership skills allow me to effectively organize tasks
and coordinate teams or departments to successfully complete projects across
diverse market and real-life environments.
Additionally, I have practical experience developing AI prompts that guide models to
deliver improved accuracy, instruction following, creativity, writing quality, and
reasoning.
          </p>
        </div>

        {/* PROFESSIONAL EXPERIENCE CARD (right column) */}
        <div className="bg-gray-900/50 p-6 rounded-lg">
          <h2
            className="text-3xl font-semibold mb-4"
            style={{
              textShadow: "0 0 2px #00eaff, 0 0 5px #00eaff",
            }}
          >
            Professional Experience
          </h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2">
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
                className="text-pink-400 underline"
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

        {/* PROJECTS & FREELANCE CARD (left column) */}
        <div className="bg-gray-900/50 p-6 rounded-lg">
          <h2
            className="text-3xl font-semibold mb-4"
            style={{
              textShadow: "0 0 2px #00eaff, 0 0 5px #00eaff",
            }}
          >
            Projects &amp; Freelance
          </h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2">
            <li>
            Object-Oriented Programming games (55 Hrs, 2023)
            </li>
            
            <p className="text-gray-200">
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/SebasValenciaV"
              className="text-pink-400 underline"
              target="_blank"
              rel="noreferrer"
            >
              SebasValenciaV
            </a>
          </p>
          <p className="text-gray-200">
            <strong>Blog:</strong>{" "}
            <a
              href="https://developersebastianvalencia.blogspot.com"
              className="text-pink-400 underline"
              target="_blank"
              rel="noreferrer"
            >
              developersebastianvalencia.blogspot.com
            </a>
          </p>
            
          </ul>
        </div>

        {/* SKILLS CARD (right column) */}
        <div className="bg-gray-900/50 p-6 rounded-lg">
          <h2
            className="text-3xl font-semibold mb-4"
            style={{
              textShadow: "0 0 2px #00eaff, 0 0 5px #00eaff",
            }}
          >
            Skills
          </h2>
          <p className="text-gray-200">
            JavaScript, TypeScript, Python, PHP, C++, C#, Next.js, React.js, Node.js,
            Vite, HTML, CSS/Bootstrap, Django, SQL, Agile methodologies, data structures,
            algorithms, secure coding, and systems administration.
          </p>
        </div>

        {/* EDUCATION & COURSES CARD (left column) */}
        <div className="bg-gray-900/50 p-6 rounded-lg">
          <h2
            className="text-3xl font-semibold mb-4"
            style={{
              textShadow: "0 0 2px #00eaff, 0 0 5px #00eaff",
            }}
          >
            Education &amp; Courses
          </h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2">
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
              <strong>I.E Pascual Bravo</strong> – Information Security / IT Essentials (50 Hrs,
              2024)
            </li>
            <li>
              <strong>Udemy</strong> – Front and Backend Web Development (38 Hrs, 2024)
            </li>
            <li>
              <strong>Eafit University</strong> – English  lvl B2 writting, reading & speaking(3 years 2013, 2026)
            </li>
          </ul>
        </div>

        {/* CONTACT CARD (right column) */}
        <div className="bg-gray-900/50 p-6 rounded-lg">
          <h2
            className="text-3xl font-semibold mb-4"
            style={{
              textShadow: "0 0 2px #00eaff, 0 0 5px #00eaff",
            }}
          >
            Contact
          </h2>
          <p className="text-gray-200">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:sebas19-98@hotmail.com"
              className="text-pink-400 underline"
            >
              sebas19-98@hotmail.com
            </a>
          </p>
          <p className="text-gray-200">
            <strong>Phone:</strong> (+57) 316 8859466
          </p>
        
          <p className="text-gray-200">
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://linkedin.com/in/SebasValenciaV"
              className="text-pink-400 underline"
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
