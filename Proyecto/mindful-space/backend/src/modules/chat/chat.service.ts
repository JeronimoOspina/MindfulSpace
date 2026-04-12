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
        "Siento que estes pasando por esto. Si estas en peligro inmediato, contacta la linea 192 o 106 ahora mismo y busca a una persona de confianza cerca de ti. No estas solo.",
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
        "Entiendo que te sientas asi. Puedes probar 1 minuto de respiracion 4-7-8, beber un poco de agua y escribir que desencadeno esa sensacion.",
      recommendations: [
        "Ir a Ejercicios de respiracion",
        "Leer: Manejo de la ansiedad en el dia a dia",
        "Abrir Autoevaluacion",
        "Escuchar musica para bajar revoluciones",
      ],
    };
  }

  if (content.includes("relaj") || content.includes("calm")) {
    return {
      response:
        "Vamos paso a paso. Baja los hombros, relaja la mandibula y haz una exhalacion lenta. Tambien puedes poner una musica suave para acompanar la pausa.",
      recommendations: [
        "Ver Musica para relajarte",
        "Probar respiracion 4-7-8",
        "Leer una recomendacion breve",
        "Tomar una pausa de 5 minutos",
      ],
    };
  }

  if (content.includes("dorm") || content.includes("sueno") || content.includes("insom")) {
    return {
      response:
        "Gracias por contarlo. Para esta noche prueba bajar luces, evitar pantallas 30 minutos antes y usar una sesion de musica para dormir.",
      recommendations: [
        "Leer: Higiene del sueno para descansar mejor",
        "Ejercicio 4-7-8 por 3 ciclos",
        "Escuchar musica para dormir",
      ],
    };
  }

  if (content.includes("estres") || content.includes("cansad")) {
    return {
      response:
        "Tiene sentido sentirse saturado. Divide el problema en una accion pequena para hoy, toma agua y haz una pausa de un minuto.",
      recommendations: [
        "Leer: Micro habitos para reducir estres",
        "Tomar una pausa guiada de 2 minutos",
        "Escuchar musica para relajarte",
      ],
    };
  }

  if (content.includes("trist") || content.includes("deprimi") || content.includes("desanimo")) {
    return {
      response:
        "Lamento que te sientas asi. A veces ayuda reducir la exigencia del dia, hablar con alguien de confianza, comer algo ligero y pedir apoyo profesional cuando lo necesites.",
      recommendations: [
        "Leer: Informacion sobre depresion",
        "Abrir Autoevaluacion",
        "Agendar teleconsulta",
        "Abrir Ayuda inmediata si lo necesitas",
      ],
    };
  }

  if (content.includes("solo") || content.includes("aislad") || content.includes("nadie")) {
    return {
      response:
        "Sentirse solo puede doler mucho. Hoy puede ayudar escribirle a una persona de confianza, salir un momento al aire libre o acompañarte con musica tranquila.",
      recommendations: [
        "Abrir Ayuda inmediata",
        "Agendar teleconsulta",
        "Escuchar musica suave",
      ],
    };
  }

  if (content.includes("energia") || content.includes("agotad") || content.includes("sin ganas")) {
    return {
      response:
        "Si te falta energia, intenta bajar el objetivo del dia: agua, comida sencilla, una pausa breve y una tarea pequena. Lo minimo tambien cuenta.",
      recommendations: [
        "Ver musica para dormir",
        "Leer sobre estres",
        "Tomar una pausa guiada de 2 minutos",
      ],
    };
  }

  if (content.includes("musica") || content.includes("playlist")) {
    return {
      response:
        "La musica puede ayudarte a regular el ritmo y bajar la tension. Puedes elegir una lista para ansiedad, estres o dormir, y si un reproductor no carga tienes un enlace directo para abrirlo.",
      recommendations: ["Ver Musica para relajarte", "Elegir categoria ansiedad", "Elegir categoria dormir", "Abrir una sesion en YouTube"],
    };
  }

  if (content.includes("test") || content.includes("autoevalu") || content.includes("cuestion")) {
    return {
      response:
        "La autoevaluacion es un buen primer paso para orientarte, pero no reemplaza una evaluacion profesional. Puedes responder el test y revisar el resultado.",
      recommendations: ["Abrir Autoevaluacion", "Leer: Ansiedad", "Leer: Estres"],
    };
  }

  if (content.includes("cita") || content.includes("teleconsulta") || content.includes("profesional")) {
    return {
      response:
        "Si sientes que necesitas acompanamiento, puedes agendar una teleconsulta con un profesional y confirmar la cita desde el flujo de pago.",
      recommendations: ["Ir a Teleconsulta", "Leer: Informacion sobre salud mental", "Abrir Ayuda inmediata", "Revisar Mis Citas"],
    };
  }

  if (content.includes("duermo") || content.includes("agotad") || content.includes("sin ganas") || content.includes("energia")) {
    return {
      response:
        "Puede servirte bajar el ritmo hoy. Intenta hidratarte, comer algo sencillo y dividir el dia en un paso pequeno por vez.",
      recommendations: ["Ver musica para dormir", "Leer: Higiene del sueno", "Tomar una pausa guiada de 2 minutos"],
    };
  }

  if (content.includes("solo") || content.includes("aislad") || content.includes("nadie")) {
    return {
      response:
        "Gracias por decirlo. Sentirse solo puede doler mucho. Puedes escribirle a una persona de confianza, salir un momento al aire o usar el boton de ayuda inmediata si lo necesitas.",
      recommendations: ["Abrir Ayuda inmediata", "Agendar teleconsulta", "Escuchar musica suave"],
    };
  }

  return {
    response:
      "Estoy aqui para escucharte. Puedo sugerirte respiracion, musica, autoevaluacion, biblioteca o una teleconsulta si lo prefieres.",
    recommendations: ["Explorar biblioteca", "Probar respiracion 4-7-8", "Ver musica relajante"],
  };
}

