// ==========================================
// ROPA PÁGINA PRINCIPAL (CORE / BLANCO)
// ==========================================
const dataRopaCore = [
    { id: 101, nombre: "Camiseta Básica xpuppet", img: "camisa_basica.png", precio: "$ 65.000", desc: "El lienzo basico. Camiseta oversized esencial con logo sutil." },
    { id: 102, nombre: "Hoodie 'Blank Canvas'", img: "BASE.jpg", precio: "$ 120.000", desc: "Buzo grueso negro. Minimalista, combinable con todo." },
    { id: 103, nombre: "Pantalón Cargo Urbano", img: "BASE.jpg", precio: "$ 140.000", desc: "Corte recto, bolsillos amplios, para el día a día." },
    { id: 104, nombre: "Tote Bag xpuppet", img: "BASE.jpg", precio: "$ 45.000", desc: "Lleva tu mundo en ella. Algodón resistente 100%." }
];

// ==========================================
// ROPA COLECCIÓN TAROT
// ==========================================
const dataRopa = [
    { id: 1, nombre: "Buzo Emperatriz", img: "buzo_empe.png", precio: "$ 130.000", desc: "Buzo oversized con estampado de The Empress en la espalda.", tipoTalla: "buzo" },
    { id: 2, nombre: "Camiseta The High Priestess", img: "shirt_high.png", precio: "$ 75.000", desc: "Camiseta con corte urbano con estampado de The High Priestess en la espalda.", tipoTalla: "camisa-regular" },
    { id: 3, nombre: "Camisa The Hierophant", img: "shirt_sacerdote.png", precio: "$ 65.000", desc: "Camiseta con corte urbano corta con estampado de The Hierophant.", tipoTalla: "camisa-mujer"},
    { id: 4, nombre: "Camisa The Hermit", img: "shirt_hermit.png", precio: "$ 70.000", desc: "Camiseta con corte urbano con estampado de The Hermit en frente.", tipoTalla: "camisa-regular" },
    { id: 5, nombre: "Camisa The Hanged Man", img: "shirt_hanged.png", precio: "$ 70.000", desc: "Camiseta con corte urbano con estampado de The Hanged Man en la espalda.", tipoTalla: "camisa-regular"}
];

// ==========================================
// CARTAS DEL TAROT Y CONSEJOS
// ==========================================
const dataCartas = [
    { id: 1, nombre: "The Fool", img: "fool.png", energia: "cambio", desc: "El comienzo de un viaje, la espontaneidad y los saltos de fe.", consejo: "Atrévete a dar ese salto de fe hoy. No temas a los nuevos comienzos, el universo te sostiene." },
    { id: 2, nombre: "The Magician", img: "magician.png", energia: "mente", desc: "El poder de la manifestación y la creación.", consejo: "Tienes todas las herramientas necesarias a tu disposición. Es el momento de confiar en tus talentos y manifestar tus ideas." },
    { id: 3, nombre: "The High Priestess", img: "high_priestess.png", energia: "emocion", desc: "La intuición, el misterio y la voz interior.", consejo: "Confía en tu intuición por encima de la lógica. Hay algo que ya sabes en el fondo de tu corazón; escúchalo." },
    { id: 4, nombre: "The Empress", img: "empress.png", energia: "emocion", desc: "Abundancia, fertilidad y energía creadora.", consejo: "Nutre tus proyectos y a ti mismo. Es un día para disfrutar de la abundancia, ser amable contigo y dejar que tu creatividad florezca." },
    { id: 5, nombre: "The Emperor", img: "emperor.png", energia: "estabilidad", desc: "Estructura, estabilidad y autoridad.", consejo: "Pon orden en el caos. Hoy debes establecer límites claros, tomar el control de tu situación y actuar con disciplina." },
    { id: 6, nombre: "The Hierophant", img: "hierophant.png", energia: "estabilidad", desc: "Tradición, creencias compartidas y conocimiento sagrado.", consejo: "A veces es mejor aferrarse a tus valores más profundos o buscar el consejo de un mentor. Sigue la sabiduría que ya está probada." },
    { id: 7, nombre: "The Lovers", img: "lovers.png", energia: "emocion", desc: "Conexiones profundas, alineación de valores y elecciones.", consejo: "Las decisiones que tomes hoy deben estar alineadas con tus verdaderos valores. Elige siempre desde el amor y la conexión genuina." },
    { id: 8, nombre: "The Chariot", img: "chariot.png", energia: "estabilidad", desc: "Determinación, control y victoria a través de la voluntad.", consejo: "Avanza con determinación pura. Los obstáculos y las dudas cederán si mantienes tu enfoque y tu voluntad inquebrantable." },
    { id: 9, nombre: "Strength", img: "strength.png", energia: "mente", desc: "Coraje silencioso, compasión y dominio interno.", consejo: "Tu verdadera fuerza radica en la suavidad y la compasión, no en la agresividad. Domina tus impulsos con paciencia y amor." },
    { id: 10, nombre: "The Hermit", img: "hermit.png", energia: "mente", desc: "Introspección, guía interior y soledad sanadora.", consejo: "Tómate un momento para la introspección. Las respuestas que buscas no están allá afuera, están en el silencio y en tu propia compañía." },
    { id: 11, nombre: "Wheel of Fortune", img: "wheel.png", energia: "cambio", desc: "Ciclos de la vida, destino y puntos de inflexión.", consejo: "El cambio es la única constante. Acepta los giros inesperados de hoy, recuerda que la suerte está cambiando a tu favor." },
    { id: 12, nombre: "Justice", img: "justice.png", energia: "estabilidad", desc: "Causa y efecto, claridad y verdad innegable.", consejo: "Busca el equilibrio. Toda acción tiene su consecuencia, así que asegúrate de actuar con justicia, honestidad y claridad." },
    { id: 13, nombre: "The Hanged Man", img: "hanged_man.png", energia: "mente", desc: "Pausa, rendición y nuevas perspectivas.", consejo: "Cambia tu perspectiva. Una pausa temporal no es un fracaso; ríndete al momento presente y descubrirás una verdad oculta." },
    { id: 14, nombre: "Death", img: "death.png", energia: "cambio", desc: "Transformación profunda, finales y nuevos comienzos.", consejo: "Deja ir lo que ya no te sirve. No temas a este final, porque es la limpieza necesaria para que algo mucho mejor pueda nacer." },
    { id: 15, nombre: "Temperance", img: "temperance.png", energia: "emocion", desc: "Equilibrio, alquimia y paciencia.", consejo: "Busca la moderación y la armonía. Mezcla los extremos con paciencia para encontrar tu punto de paz en medio del ruido." },
    { id: 16, nombre: "The Devil", img: "devil.png", energia: "mente", desc: "Apegos, sombras y tentaciones materiales.", consejo: "Cuidado con los apegos y los miedos que te limitan. Reconoce esas cadenas invisibles para que finalmente puedas liberarte de ellas." },
    { id: 17, nombre: "The Tower", img: "tower.png", energia: "cambio", desc: "Revelaciones repentinas y destrucción de falsas bases.", consejo: "Una falsa estructura está cayendo para dar paso a la verdad. Abraza el caos momentáneo, porque la liberación definitiva está muy cerca." },
    { id: 18, nombre: "The Star", img: "star.png", energia: "emocion", desc: "Esperanza, inspiración y serenidad.", consejo: "Mantén la esperanza viva. Después de la tormenta, la serenidad y la inspiración vuelven a iluminarte. Confía en el universo." },
    { id: 19, nombre: "The Moon", img: "moon.png", energia: "mente", desc: "Ilusiones, miedos subconscientes y misterio.", consejo: "Cuidado con permitir que la ansiedad te confunda. Las cosas no son tan oscuras como parecen, confía en tu intuición para guiarte en la noche." },
    { id: 20, nombre: "The Sun", img: "sun.png", energia: "emocion", desc: "Alegría, éxito y vitalidad absoluta.", consejo: "¡Es un día para brillar! La alegría, el éxito y la claridad absoluta te acompañan en este momento. Muestra tu luz sin esconderte." },
    { id: 21, nombre: "Judgement", img: "judgement.png", energia: "cambio", desc: "Renacimiento, llamados internos y absolución.", consejo: "Es hora de despertar y escuchar tu verdadero llamado. Perdónate a ti mismo por el pasado, saca tu propia conclusión y renace." },
    { id: 22, nombre: "The World", img: "world.png", energia: "estabilidad", desc: "Finalización, integración y viajes exitosos.", consejo: "Una etapa importante llega a su cierre exitoso. Siéntete orgulloso de lo que has recorrido, estás exactamente donde debes estar." },
    { id: 23, nombre: "La Tarotista", img: "tarotista.png", energia: "mente", desc: "El misterio final oculto en la baraja. La arquitecta de las probabilidades. Aquella que comprende que el destino no es una condena escrita en piedra, sino una ecuación mental que tú mismo puedes reescribir.", consejo: "El mayor engaño de la mente es hacerte creer que no tienes el control. Las cartas que te tocan no importan tanto como tu voluntad de jugarlas. Hoy, no busques respuestas en el exterior; tú eres quien crea las reglas del juego." }
];