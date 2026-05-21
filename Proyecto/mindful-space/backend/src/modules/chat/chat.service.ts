import { z } from "zod";

const chatSchema = z.object({
  message: z.string().min(1),
});

interface ChatReply {
  response: string;
  recommendations: string[];
}

export function buildChatReply(payload: unknown): ChatReply {
  const input = chatSchema.parse(payload);
  const content = input.message.toLowerCase();

  if (content.includes("ayuda") || content.includes("crisis") || content.includes("urgente") || content.includes("suicid") || content.includes("lastim")) {
    return {
      response:
        "Siento que estés pasando por esto. Si estás en peligro inmediato, contacta la línea 192 o 106 ahora mismo y busca a una persona de confianza cerca de ti. No estás solo.",
      recommendations: [
        "Abrir Ayuda inmediata",
        "Llamar a la linea 106",
        "Contactar emergencias 192",
      ],
    };
  }

  if (content.includes("ansied") || content.includes("nervio")) {
    return {
      response:
        "Entiendo que te sientas así. Puedes probar 1 minuto de respiración 4-7-8, beber un poco de agua y escribir qué desencadenó esa sensación.",
      recommendations: [
        "Ir a Ejercicios de respiración",
        "Leer: Manejo de la ansiedad en el día a día",
        "Abrir Autoevaluación",
        "Escuchar música para bajar revoluciones",
      ],
    };
  }

  if (content.includes("relaj") || content.includes("calm")) {
    return {
      response:
        "Vamos paso a paso. Baja los hombros, relaja la mandíbula y haz una exhalación lenta. También puedes poner una música suave para acompañar la pausa.",
      recommendations: [
        "Ver Música para relajarte",
        "Probar respiración 4-7-8",
        "Leer una recomendación breve",
        "Tomar una pausa de 5 minutos",
      ],
    };
  }

  if (content.includes("dorm") || content.includes("sueno") || content.includes("insom")) {
    return {
      response:
        "Gracias por contarlo. Para esta noche prueba bajar las luces, evitar pantallas 30 minutos antes y usar una sesión de música para dormir.",
      recommendations: [
        "Leer: Higiene del sueño para descansar mejor",
        "Ejercicio 4-7-8 por 3 ciclos",
        "Escuchar música para dormir",
      ],
    };
  }

  if (content.includes("estres") || content.includes("cansad")) {
    return {
      response:
        "Tiene sentido sentirse saturado. Divide el problema en una acción pequeña para hoy, toma agua y haz una pausa de un minuto.",
      recommendations: [
        "Leer: Micro hábitos para reducir estrés",
        "Tomar una pausa guiada de 2 minutos",
        "Escuchar música para relajarte",
      ],
    };
  }

  if (content.includes("trist") || content.includes("deprimi") || content.includes("desanimo")) {
    return {
      response:
        "Lamento que te sientas así. A veces ayuda reducir la exigencia del día, hablar con alguien de confianza, comer algo ligero y pedir apoyo profesional cuando lo necesites.",
      recommendations: [
        "Leer: Información sobre depresión",
        "Abrir Autoevaluación",
        "Agendar teleconsulta",
        "Abrir Ayuda inmediata si lo necesitas",
      ],
    };
  }

  if (content.includes("solo") || content.includes("aislad") || content.includes("nadie")) {
    return {
      response:
        "Sentirse solo puede doler mucho. Hoy puede ayudar escribirle a una persona de confianza, salir un momento al aire libre o acompañarte con música tranquila.",
      recommendations: [
        "Abrir Ayuda inmediata",
        "Agendar teleconsulta",
        "Escuchar música suave",
      ],
    };
  }

  if (content.includes("energia") || content.includes("agotad") || content.includes("sin ganas")) {
    return {
      response:
        "Si te falta energía, intenta bajar el objetivo del día: agua, comida sencilla, una pausa breve y una tarea pequeña. Lo mínimo también cuenta.",
      recommendations: [
        "Ver música para dormir",
        "Leer sobre estrés",
        "Tomar una pausa guiada de 2 minutos",
      ],
    };
  }

  if (content.includes("musica") || content.includes("playlist")) {
    return {
      response:
        "La música puede ayudarte a regular el ritmo y bajar la tensión. Puedes elegir una lista para ansiedad, estrés o dormir, y si un reproductor no carga tienes un enlace directo para abrirlo.",
      recommendations: ["Ver Música para relajarte", "Elegir categoría ansiedad", "Elegir categoría dormir", "Abrir una sesión en YouTube"],
    };
  }

  if (content.includes("test") || content.includes("autoevalu") || content.includes("cuestion")) {
    return {
      response:
        "La autoevaluación es un buen primer paso para orientarte, pero no reemplaza una evaluación profesional. Puedes responder el test y revisar el resultado.",
      recommendations: ["Abrir Autoevaluación", "Leer: Ansiedad", "Leer: Estrés"],
    };
  }

  if (content.includes("cita") || content.includes("teleconsulta") || content.includes("profesional")) {
    return {
      response:
        "Si sientes que necesitas acompañamiento, puedes agendar una teleconsulta con un profesional y confirmar la cita desde el flujo de pago.",
      recommendations: ["Ir a Teleconsulta", "Leer: Información sobre salud mental", "Abrir Ayuda inmediata", "Revisar Mis Citas"],
    };
  }

  if (content.includes("duermo") || content.includes("agotad") || content.includes("sin ganas") || content.includes("energia")) {
    return {
      response:
        "Puede servirte bajar el ritmo hoy. Intenta hidratarte, comer algo sencillo y dividir el día en un paso pequeño por vez.",
      recommendations: ["Ver música para dormir", "Leer: Higiene del sueño", "Tomar una pausa guiada de 2 minutos"],
    };
  }

  if (content.includes("solo") || content.includes("aislad") || content.includes("nadie")) {
    return {
      response:
        "Gracias por decirlo. Sentirse solo puede doler mucho. Puedes escribirle a una persona de confianza, salir un momento al aire o usar el botón de ayuda inmediata si lo necesitas.",
      recommendations: ["Abrir Ayuda inmediata", "Agendar teleconsulta", "Escuchar música suave"],
    };
  }

  return {
    response:
      "Estoy aquí para escucharte. Puedo sugerirte respiración, música, autoevaluación, biblioteca o una teleconsulta si lo prefieres.",
    recommendations: ["Explorar biblioteca", "Probar respiración 4-7-8", "Ver música relajante"],
  };
}

