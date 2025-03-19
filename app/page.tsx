import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <header className="text-center mb-8">
        <Image
          src="/your-photo.jpg" // Asegúrate de tener una foto en el directorio public
          alt="Your Name"
          width={150}
          height={150}
          className="rounded-full mx-auto"
        />
        <h1 className="text-3xl font-bold mt-4">Tu Nombre</h1>
        <p className="text-gray-600">Desarrollador Web | Especialista en React y Next.js</p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Introducción</h2>
        <p className="text-gray-700">
          Hola, soy [Tu Nombre], un desarrollador apasionado por crear aplicaciones web modernas y eficientes. Me especializo en tecnologías como React, Next.js, y Node.js.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Experiencia Profesional</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Empresa XYZ - Desarrollador Frontend (2020 - Presente)</li>
          <li>Empresa ABC - Desarrollador Backend (2018 - 2020)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Proyectos</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Proyecto 1: Descripción breve</li>
          <li>Proyecto 2: Descripción breve</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Habilidades</h2>
        <p className="text-gray-700">JavaScript, React, Next.js, Node.js, CSS, etc.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Educación</h2>
        <p className="text-gray-700">Licenciatura en Ciencias de la Computación, Universidad XYZ</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Contacto</h2>
        <p className="text-gray-700">Email: tuemail@example.com</p>
        <p className="text-gray-700">LinkedIn: <a href="https://linkedin.com/in/tuperfil" className="text-blue-500">tuperfil</a></p>
      </section>
    </div>
  );
}