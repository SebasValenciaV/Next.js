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

    // Reglas de RiveScript
    bot.stream(`
      // Comando de ayuda en inglés
      + help
      - Here are some commands you can use:
      - • hello | hi | hola | buenos días: Greetings.
      - • help | ayuda: List available commands.
      - • what is programming | ¿qué es la programación?: Explanation on programming.
      - • what is javascript | ¿qué es javascript?: About JavaScript.
      - • what is python | ¿qué es python?: About Python.
      - • explain object-oriented programming | explica la programación orientada a objetos: OOP details.
      - • what is artificial intelligence | ¿qué es la inteligencia artificial?: About AI.
      - • explain blockchain | explica blockchain: About blockchain.
      - • what is quantum computing | ¿qué es la computación cuántica?: About quantum computing.
      - • tell me about movies | cuéntame sobre películas: Movies info.
      - • what do you know about philosophy | ¿qué sabes de la filosofía?: Philosophy info.

      // Comando de ayuda en español
      + ayuda
      - Aquí tienes algunos comandos que puedes utilizar:
      - • hola | buenos días: Saludos.
      - • ayuda: Muestra los comandos disponibles.
      - • ¿qué es la programación?: Explicación sobre la programación.
      - • ¿qué es javascript?: Información sobre JavaScript.
      - • ¿qué es python?: Información sobre Python.
      - • explica la programación orientada a objetos: Detalles de la POO.
      - • ¿qué es la inteligencia artificial?: Información sobre IA.
      - • explica blockchain: Información sobre blockchain.
      - • ¿qué es la computación cuántica?: Información sobre computación cuántica.
      - • cuéntame sobre películas: Información sobre cine.
      - • ¿qué sabes de la filosofía?: Información sobre filosofía.

      // Saludos
      + hello
      - Hi there! How can I assist you today?

      + hi
      - Hello! What programming or general topics would you like to discuss?

      + hola
      - ¡Hola! ¿En qué tema de programación o de interés general te puedo ayudar?

      + buenos días
      - ¡Buenos días! ¿Listo para aprender algo nuevo o conversar sobre algún tema en particular?

      // Despedidas
      + bye
      - Goodbye! Happy coding!

      + adiós
      - ¡Adiós! ¡Que tengas un excelente día programando!

      // Programación en inglés
      + what is programming
      - Programming is the process of creating instructions for computers. It involves languages like JavaScript, Python, and more.

      + explain programming
      - Programming is problem-solving using code to build apps, automate tasks, and create innovative solutions.

      + what is javascript
      - JavaScript is a versatile programming language mainly used for web development.

      + what is python
      - Python is known for its readability and simplicity, widely used for data analysis, AI, and more.

      + explain object-oriented programming
      - OOP is a paradigm based on objects and classes to structure code in a modular and reusable way.

      // Programación en español
      + ¿qué es la programación?
      - La programación es el proceso de crear instrucciones para que una computadora realice tareas. Usamos lenguajes como JavaScript, Python, etc.

      + explica la programación
      - La programación resuelve problemas mediante código, permitiendo crear aplicaciones y automatizar tareas.

      + ¿qué es javascript?
      - JavaScript es un lenguaje de programación muy usado en desarrollo web para crear interactividad.

      + ¿qué es python?
      - Python es un lenguaje de programación sencillo y potente, popular en IA, análisis de datos y desarrollo web.

      + explica la programación orientada a objetos
      - La POO se basa en el uso de objetos y clases para organizar el código de forma modular.

      // Tecnología y ciencia en inglés
      + what is artificial intelligence
      - AI simulates human intelligence in machines, using techniques like machine learning.

      + explain blockchain
      - Blockchain is a decentralized ledger technology that records transactions securely.

      + what is quantum computing
      - Quantum computing uses quantum mechanics to process data at high speeds.

      // Tecnología y ciencia en español
      + ¿qué es la inteligencia artificial?
      - La IA simula la inteligencia humana en máquinas, usando métodos como el aprendizaje automático.

      + explica blockchain
      - Blockchain es una tecnología de registro descentralizado que garantiza la integridad de los datos.

      + ¿qué es la computación cuántica?
      - La computación cuántica utiliza principios cuánticos para procesar información a velocidades superiores.

      // Cultura general
      + tell me about movies
      - Movies are a wonderful way to explore stories and cultures. Any favorite genre?

      + what do you know about philosophy
      - Philosophy examines fundamental questions about existence, ethics, and knowledge.

      + cuéntame sobre películas
      - Las películas son una ventana a diferentes culturas. ¿Tienes algún género o director favorito?

      + ¿qué sabes de la filosofía?
      - La filosofía aborda preguntas fundamentales sobre la existencia, la ética y el conocimiento.

      // Humor
      + tell me a joke
      - Why did the programmer quit his job? Because he didn't get arrays!

      + cuéntame una broma
      - ¿Por qué el programador se fue de su trabajo? ¡Porque no conseguía arrays!

      // Fallback
      + *
      - That's an interesting topic! Could you please elaborate or ask something more specific?
    `);

    await bot.sortReplies();
  }
}

export async function POST(request: Request) {
  try {
    const { question } = await request.json();
    await loadBot();

    const lowerQ = question.trim().toLowerCase();

    // Si la pregunta es "help" o "ayuda", reiniciamos el log y NO lo guardamos
    if (lowerQ === "help" || lowerQ === "ayuda") {
      conversationLog = [];
    }

    const reply = await bot.reply("local-user", question);

    // Solo guardamos en el log si la pregunta no es "help" o "ayuda"
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
        "hello / hi / hola / buenos días",
        "help / ayuda",
        "what is programming / ¿qué es la programación?",
        "what is javascript / ¿qué es javascript?",
        "what is python / ¿qué es python?",
        "explain object-oriented programming / explica la programación orientada a objetos",
        "what is artificial intelligence / ¿qué es la inteligencia artificial?",
        "explain blockchain / explica blockchain",
        "what is quantum computing / ¿qué es la computación cuántica?",
        "tell me about movies / cuéntame sobre películas",
        "what do you know about philosophy / ¿qué sabes de la filosofía?",
        "tell me a joke / cuéntame una broma",
      ],
      conversationLog,
    });
  } catch (error: any) {
    console.error("Error en la API del chatbot:", error);
    return NextResponse.json(
      { error: error?.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}
