import { NextResponse } from 'next/server';

interface ConversationEntry {
  user: string;
  question: string;
  reply: string;
}

let bot: any;
let conversationLog: ConversationEntry[] = []; // Almacenamiento temporal en memoria

async function loadBot() {
  if (!bot) {
    const module = await import('rivescript');
    const RiveScriptLib = module.default;
    bot = new RiveScriptLib({ utf8: true });

    // Versión de RiveScript con patrones explícitos y con grupos para variantes
    bot.stream(`
      ! version = 2.0

      // =============================
      // HELP (INGLÉS)
      // =============================
      + help
      - Here are some professional commands you can use:
      - • hello | hi | greetings: To receive a welcome message.
      - • help: List available commands.
      - • what is programming: Explanation about programming fundamentals.
      - • explain software development: Overview of the software development lifecycle.
      - • what is full-stack development: Information on full-stack development.
      - • explain object-oriented programming: Details on OOP concepts.
      - • explain functional programming: Insights on functional programming paradigms.
      - • what is agile methodology: Information on agile practices.
      - • explain scrum: Details on the Scrum framework.
      - • explain kanban: Insights on the Kanban method.
      - • explain microservices: Details on microservices architecture.
      - • what is cloud computing: Overview of cloud computing.
      - • explain containerization: About containerization with Docker/Kubernetes.
      - • what is devops: Explanation about DevOps practices.
      - • explain cybersecurity: Insights on cybersecurity measures.
      - • what is data science: Overview of data science.
      - • explain machine learning: Basics of machine learning.
      - • explain deep learning: Details on deep learning and neural networks.
      - • explain big data: Information on big data technologies.
      - • explain iot: Overview of the Internet of Things.
      - • explain rest apis: Fundamentals of RESTful services.
      - • explain graphql: Overview of GraphQL as an API query language.
      - • explain serverless architecture: Information on serverless computing.
      - • explain python: Overview of Python programming.
      - • explain react: Overview of the React library.
      - • explain node: Overview of Node.js.
      - • explain mongo: Overview of MongoDB.
      - • explain sqlite: Overview of SQLite.
      - • explain django: Overview of the Django framework.

      // =============================
      // HELP (ESPAÑOL)
      // =============================
      + ayuda
      - Aquí tienes algunos comandos profesionales sobre software que puedes utilizar:
      - • hola: Para recibir un mensaje de bienvenida.
      - • ayuda: Muestra los comandos disponibles.
      - • (¿qué|que) es la programación\?: Explicación sobre los fundamentos de la programación.
      - • explica el desarrollo de software: Visión general del ciclo de vida del desarrollo de software.
      - • (¿qué|que) es el desarrollo full-stack\?: Información sobre el desarrollo full-stack.
      - • explica la programación orientada a objetos: Detalles sobre conceptos de POO.
      - • explica la programación funcional: Perspectivas sobre paradigmas de programación funcional.
      - • (¿qué|que) es la metodología ágil\?: Información sobre prácticas ágiles.
      - • explica scrum: Detalles sobre el framework Scrum.
      - • explica kanban: Información sobre el método Kanban.
      - • explica microservicios: Detalles sobre la arquitectura de microservicios.
      - • (¿qué|que) es cloud computing\?: Visión general sobre computación en la nube.
      - • explica containerización: Información sobre containerización (Docker, Kubernetes).
      - • (¿qué|que) es devops\?: Explicación sobre prácticas de DevOps.
      - • explica ciberseguridad: Perspectivas sobre medidas de ciberseguridad.
      - • (¿qué|que) es data science\?: Visión general sobre data science.
      - • explica machine learning: Fundamentos del aprendizaje automático.
      - • explica deep learning: Detalles sobre deep learning y redes neuronales.
      - • explica big data: Información sobre tecnologías de big data.
      - • explica iot: Visión general del Internet de las Cosas.
      - • explica rest apis: Fundamentos de servicios RESTful.
      - • explica graphql: Visión general sobre GraphQL.
      - • explica arquitectura serverless: Información sobre computación sin servidor.
      - • explica python: Visión general sobre el lenguaje Python.
      - • explica react: Visión general sobre la biblioteca React.
      - • explica node: Visión general sobre Node.js.
      - • explica mongo: Visión general sobre MongoDB.
      - • explica sqlite: Visión general sobre SQLite.
      - • explica django: Visión general sobre el framework Django.

      // =============================
      // SALUDOS (INGLÉS)
      // =============================
      + hello
      - Hi there! How can I assist you with your software and technology inquiries today?
      + hi
      - Hello! What professional software topics would you like to discuss?
      + greetings
      - Hi there! How can I assist you today?

      // =============================
      // SALUDOS (ESPAÑOL)
      // =============================
      + hola
      - ¡Hola! ¿En qué tema de software o tecnología te puedo ayudar?
      + buenos días
      - ¡Buenos días! ¿Listo para profundizar en desarrollo de software, arquitecturas o tecnologías emergentes?
      + buenos dias
      - ¡Buenos días! ¿Listo para profundizar en desarrollo de software, arquitecturas o tecnologías emergentes?

      // =============================
      // DESPEDIDAS
      // =============================
      + bye
      - Goodbye! Happy coding!
      + adiós
      - ¡Adiós! ¡Que tengas un excelente día programando!

      // =============================
      // PREGUNTAS SOBRE PROGRAMACIÓN (INGLÉS)
      // =============================
      + what is programming
      - Programming is the process of creating instructions for computers using various languages and paradigms. It forms the foundation of all software development.
      
      + explain software development
      - Software development involves designing, coding, testing, and maintaining applications. It follows methodologies such as agile, waterfall, and DevOps for continuous improvement.
      
      + what is full-stack development
      - Full-stack development refers to building both the front-end and back-end parts of an application, providing a complete solution.
      
      + explain object-oriented programming
      - Object-oriented programming (OOP) is a paradigm based on objects and classes that enables modular, reusable code.
      
      + explain functional programming
      - Functional programming is a paradigm that treats computation as the evaluation of mathematical functions and avoids changing state.

      // =============================
      // PREGUNTAS SOBRE TECNOLOGÍA (INGLÉS)
      // =============================
      + what is agile methodology
      - Agile methodology is an iterative approach to software development that values flexibility, collaboration, and customer feedback.
      
      + explain scrum
      - Scrum is an agile framework that uses fixed-length iterations called sprints to deliver work increments.
      
      + explain kanban
      - Kanban is an agile method focused on visualizing work, limiting work in progress, and improving efficiency.
      
      + explain microservices
      - Microservices is an architectural style where applications are divided into small, independent services communicating through APIs.
      
      + what is cloud computing
      - Cloud computing provides on-demand access to computing resources over the internet, enabling scalable and flexible infrastructure.
      
      + explain containerization
      - Containerization is a lightweight form of virtualization that packages an application and its dependencies into isolated containers, managed by tools like Docker and Kubernetes.
      
      + what is devops
      - DevOps is a set of practices that bridges the gap between software development and IT operations, fostering continuous integration and delivery.
      
      + explain cybersecurity
      - Cybersecurity involves protecting computer systems and networks from digital attacks through strategies like encryption, firewalls, and continuous monitoring.
      
      + what is data science
      - Data science is an interdisciplinary field that uses algorithms, statistical models, and data analysis to extract insights from data.
      
      + explain machine learning
      - Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.
      
      + explain deep learning
      - Deep learning is a branch of machine learning based on neural networks with multiple layers, enabling the processing of large amounts of data for complex tasks.
      
      + explain big data
      - Big data refers to extremely large datasets that require advanced techniques for storage, processing, and analysis.
      
      + explain iot
      - The Internet of Things (IoT) is a network of physical devices connected via the internet, capable of collecting and exchanging data.
      
      + explain rest apis
      - REST APIs are guidelines for building web services that use standard HTTP methods for communication between systems.
      
      + explain graphql
      - GraphQL is a query language for APIs that allows clients to request exactly the data they need, making data retrieval more efficient.
      
      + explain serverless architecture
      - Serverless architecture allows developers to build and run applications without managing servers, as the cloud provider handles scaling and infrastructure.

      // =============================
      // PREGUNTAS SOBRE PROGRAMACIÓN (ESPAÑOL)
      // =============================
      + (¿qué|que) es la programación\?
      - La programación es el proceso de crear instrucciones para que las computadoras realicen tareas utilizando diversos lenguajes y paradigmas. Es la base del desarrollo de software.
      
      + explica el desarrollo de software
      - El desarrollo de software abarca el diseño, la codificación, las pruebas y el mantenimiento de aplicaciones. Se aplican metodologías como ágil, cascada y DevOps para garantizar la calidad.
      
      + (¿qué|que) es el desarrollo full-stack\?
      - El desarrollo full-stack implica la creación tanto del front-end como del back-end de una aplicación, ofreciendo soluciones integrales.
      
      + explica la programación orientada a objetos
      - La programación orientada a objetos (POO) utiliza objetos y clases para estructurar el código de forma modular y reutilizable.
      
      + explica la programación funcional
      - La programación funcional es un paradigma que trata la computación como la evaluación de funciones matemáticas, evitando estados mutables.

      // =============================
      // PREGUNTAS SOBRE TECNOLOGÍA (ESPAÑOL)
      // =============================
      + (¿qué|que) es la metodología ágil\?
      - La metodología ágil es un enfoque iterativo en el desarrollo de software que prioriza la flexibilidad, la colaboración y la retroalimentación del cliente.
      
      + explica scrum
      - Scrum es un framework ágil que utiliza sprints o iteraciones fijas para entregar incrementos de producto de manera regular.
      
      + explica kanban
      - Kanban es un método ágil que se centra en visualizar el flujo de trabajo y limitar el trabajo en progreso para mejorar la eficiencia.
      
      + explica microservicios
      - Los microservicios son una arquitectura en la que una aplicación se divide en servicios pequeños e independientes que se comunican a través de APIs, facilitando la escalabilidad y el mantenimiento.
      
      + (¿qué|que) es cloud computing\?
      - Cloud computing o computación en la nube permite acceder a recursos informáticos bajo demanda a través de internet, con infraestructuras escalables ofrecidas por proveedores como AWS, Azure o Google Cloud.
      
      + explica containerización
      - La containerización es una forma ligera de virtualización que empaqueta una aplicación y sus dependencias en contenedores aislados, gestionados comúnmente con Docker o Kubernetes.
      
      + (¿qué|que) es devops\?
      - DevOps es un conjunto de prácticas que integra el desarrollo de software y las operaciones de TI para acelerar el ciclo de desarrollo y mejorar la calidad del producto.
      
      + explica ciberseguridad
      - La ciberseguridad se centra en proteger sistemas, redes y datos frente a amenazas digitales mediante técnicas como la encriptación, firewalls y monitoreo continuo.
      
      + (¿qué|que) es data science\?
      - Data science es una disciplina que utiliza métodos científicos y algoritmos para extraer insights de datos, apoyando la toma de decisiones informadas.
      
      + explica machine learning
      - Machine learning o aprendizaje automático es una rama de la inteligencia artificial que permite a los sistemas aprender y mejorar a partir de datos sin una programación explícita.
      
      + explica deep learning
      - Deep learning es una subcategoría del aprendizaje automático que utiliza redes neuronales profundas para analizar grandes volúmenes de datos y resolver problemas complejos.
      
      + explica big data
      - Big data se refiere al manejo y análisis de conjuntos de datos extremadamente grandes y complejos que requieren tecnologías avanzadas para procesarlos.
      
      + explica iot
      - El Internet de las Cosas (IoT) es una red de dispositivos físicos conectados a internet que recopilan e intercambian datos, facilitando la automatización y el análisis en tiempo real.
      
      + explica rest apis
      - Las REST APIs son un conjunto de pautas para construir servicios web que utilizan métodos HTTP estándar para la comunicación entre sistemas.
      
      + explica graphql
      - GraphQL es un lenguaje de consulta para APIs que permite a los clientes solicitar exactamente los datos que necesitan, optimizando la transferencia de información.
      
      + explica arquitectura serverless
      - La arquitectura serverless permite desarrollar y ejecutar aplicaciones sin preocuparse por la administración de servidores, ya que la infraestructura es gestionada automáticamente por el proveedor en la nube.

      // =============================
      // NUEVOS COMANDOS SOBRE TECNOLOGÍAS MODERNAS (INGLÉS)
      // =============================
      + explain python
      - Python is a high-level, interpreted programming language known for its readability, versatility, and extensive libraries. It's widely used for web development, data science, automation, and more.
      
      + explain react
      - React is a popular JavaScript library for building user interfaces, particularly for single-page applications. It uses a component-based architecture and a virtual DOM.
      
      + explain node
      - Node.js is a runtime environment that allows you to run JavaScript on the server side. It's known for its non-blocking, event-driven architecture.
      
      + explain mongo
      - MongoDB is a NoSQL database known for its scalability and flexibility, storing data in JSON-like documents.
      
      + explain sqlite
      - SQLite is a lightweight, file-based relational database that is widely used in mobile and embedded applications.
      
      + explain django
      - Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It provides an admin interface and many built-in features.

      // =============================
      // NUEVOS COMANDOS SOBRE TECNOLOGÍAS MODERNAS (ESPAÑOL)
      // =============================
      + explica python
      - Python es un lenguaje de programación de alto nivel, interpretado y conocido por su legibilidad y versatilidad. Se utiliza ampliamente para desarrollo web, ciencia de datos, automatización y más.
      
      + explica react
      - React es una biblioteca de JavaScript muy popular para construir interfaces de usuario, especialmente en aplicaciones de una sola página. Utiliza una arquitectura basada en componentes y un DOM virtual.
      
      + explica node
      - Node.js es un entorno de ejecución que permite ejecutar JavaScript en el servidor. Es conocido por su arquitectura no bloqueante y orientada a eventos.
      
      + explica mongo
      - MongoDB es una base de datos NoSQL reconocida por su escalabilidad y flexibilidad, que almacena datos en documentos de tipo JSON.
      
      + explica sqlite
      - SQLite es una base de datos relacional ligera, basada en archivos, ampliamente utilizada en aplicaciones móviles y embebidas.
      
      + explica django
      - Django es un framework web de alto nivel para Python que fomenta el desarrollo rápido y un diseño limpio y pragmático. Proporciona una interfaz administrativa y muchas funcionalidades integradas.

      // =============================
      // FALLBACK
      // =============================
      + *
      -  Please ask a specific command of the available list
    `);

    await bot.sortReplies();
  }
}

export async function POST(request: Request) {
  try {
    const { question } = await request.json();
    await loadBot();

    const lowerQ = question.trim().toLowerCase();
    // Reiniciamos el historial solo para "help" o "ayuda" exactos
    if (lowerQ === "help" || lowerQ === "ayuda") {
      conversationLog = [];
    }

    const reply = await bot.reply("local-user", question);

    // Solo guardamos en el historial si la pregunta no es de ayuda
    if (lowerQ !== "help" && lowerQ !== "ayuda") {
      conversationLog.push({
        user: "User",
        question,
        reply,
      });
    }

    return NextResponse.json({
      reply,
      availableCommands: [
        "hello / hi / greetings / hola / buenos días",
        "help / ayuda",
        "what is programming / ¿qué es la programación?",
        "explain software development / explica el desarrollo de software",
        "what is full-stack development / ¿qué es el desarrollo full-stack?",
        "explain object-oriented programming / explica la programación orientada a objetos",
        "explain functional programming / explica la programación funcional",
        "what is agile methodology / ¿qué es la metodología ágil?",
        "explain scrum / explica scrum",
        "explain kanban / explica kanban",
        "explain microservices / explica microservicios",
        "what is cloud computing / ¿qué es cloud computing?",
        "explain containerization / explica containerización",
        "what is devops / ¿qué es devops?",
        "explain cybersecurity / explica ciberseguridad",
        "what is data science / ¿qué es data science?",
        "explain machine learning / explica machine learning",
        "explain deep learning / explica deep learning",
        "explain big data / explica big data",
        "explain iot / explica iot",
        "explain rest apis / explica rest apis",
        "explain graphql / explica graphql",
        "explain serverless architecture / explica arquitectura serverless",
        "explain python / explica python",
        "explain react / explica react",
        "explain node / explica node",
        "explain mongo / explica mongo",
        "explain sqlite / explica sqlite",
        "explain django / explica django",
      ],
      conversationLog,
    });
  } catch (error: any) {
    console.error("Error in chatbot API:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
