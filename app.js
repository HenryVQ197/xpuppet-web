// ==========================================
// ESTADO DE LA APLICACIÓN
// ==========================================
let pagCartas = 0;
const CARTAS_POR_PAG = 8; 
let pagRopa = 0;
const ROPA_POR_PAG = 8;
let cartasTirada = [];
let cartasReveladas = 0;
let temaActual = "general";
let prendaSeleccionada = null;

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. RENDERIZAR TIENDA CORE (Clases reparadas)
    const coreGrid = document.getElementById('core-ropa-grid');
    if(coreGrid) {
        dataRopaCore.forEach(prenda => {
            const div = document.createElement('div');
            div.className = 'core-product-card'; 
            div.innerHTML = `
                <img src="${prenda.img}" alt="${prenda.nombre}" onerror="this.src='BASE.jpg'">
                <div class="core-product-info">
                    <span class="core-product-title">${prenda.nombre}</span>
                    <span class="core-product-price">${prenda.precio}</span>
                </div>
            `;
            div.addEventListener('click', () => {
                window.open(`https://ig.me/m/xpuppet__`, '_blank');
            });
            coreGrid.appendChild(div);
        });
    }
// DENTRO DE TU document.addEventListener('DOMContentLoaded', () => { ... })
const modalPuppet = document.getElementById('modal-puppet');
const btnCerrarPuppet = document.getElementById('btn-cerrar-puppet');

document.querySelectorAll('.core-puppet-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const puppet = dataPuppets[index];
        if (puppet) {
            document.getElementById('puppet-modal-img').src = puppet.img;
            document.getElementById('puppet-modal-nombre').innerText = puppet.nombre;
            document.getElementById('puppet-modal-desc').innerText = puppet.desc;
            modalPuppet.style.display = 'flex';
        }
    });
});

if (btnCerrarPuppet) {
    btnCerrarPuppet.addEventListener('click', () => {
        modalPuppet.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modalPuppet) {
        modalPuppet.style.display = 'none';
    }
});

// INFORMACIÓN Y DESCRIPCIÓN DE LOS PUPPETS
const dataPuppets = [
    {
        nombre: "CLASSIC",
        img: "PP.png",
        desc: "El lienzo blanco original de XPUPPET. Representa la neutralidad pura y la base sobre la cual se adaptan todas las identidades."
    },
    {
        nombre: "XPUPPET1",
        img: "PP_F1.png",
        desc: "Inspirado en la cultura del automovilismo y la velocidad. Representa la adrenalina y el estilo urbano del motorsport."
    },
    {
        nombre: "XMUSIC",
        img: "PP_RAP.png",
        desc: "Inspirado en la música y la cultura de calle. Representa el ritmo, el graffiti y el movimiento urbano."
    },
    {
        nombre: "TAROTISTA",
        img: "PP_TAROTISTA.png",
        desc: "La versión mística del muñeco. Conecta directamente con la colección de los Arcanos, el destino y el oráculo."
    }
];

    // 2. NAVEGACIÓN CORE <-> TAROT
    const activarTarot = () => {
        document.body.classList.add('tarot-mode');
        window.scrollTo(0, 0);
    };
    document.getElementById('btn-nav-tarot').addEventListener('click', activarTarot);
    document.getElementById('btn-enter-tarot-main').addEventListener('click', activarTarot);
    document.getElementById('btn-salir-tarot').addEventListener('click', () => {
        document.body.classList.remove('tarot-mode');
        window.scrollTo(0, 0);
    });

    // 3. EVENTOS APP TAROT (Lógica Completa)
    
    renderRopaDestacada();

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget.getAttribute('data-target');
            if (target) irAPantalla(target);
        });
    });

    document.getElementById('btn-volver-resultados').addEventListener('click', () => {
        irAPantalla('pantalla-resultado-tarot');
        window.scrollTo(0, 0); 
    });

    const btnCartas = document.getElementById('btn-abrir-cartas');
    if (btnCartas) btnCartas.addEventListener('click', abrirColeccionCartas);
    
    const btnRopa = document.getElementById('btn-abrir-ropa');
    if (btnRopa) btnRopa.addEventListener('click', abrirColeccionRopa);
    
    const btnIg = document.getElementById('btn-ig');
    if (btnIg) btnIg.addEventListener('click', () => window.open('https://www.instagram.com/xpuppet__/', '_blank'));

    document.getElementById('btn-comprar-ropa').addEventListener('click', comprarPrendaActual);

    document.getElementById('btn-prev-cartas').addEventListener('click', () => cambiarPaginaCartas(-1));
    document.getElementById('btn-next-cartas').addEventListener('click', () => cambiarPaginaCartas(1));

    document.getElementById('btn-prev-ropa').addEventListener('click', () => cambiarPaginaRopa(-1));
    document.getElementById('btn-next-ropa').addEventListener('click', () => cambiarPaginaRopa(1));

    document.getElementById('btn-preparar-mazo').addEventListener('click', prepararMazo);
    
    for(let i=1; i<=3; i++) {
        document.getElementById(`card-pos-${i}`).addEventListener('click', () => voltearCartaReal(i));
    }

    document.getElementById('btn-compartir').addEventListener('click', prepararPantallaCompartir);

    document.getElementById('btn-carta-dia').addEventListener('click', abrirCartaDia);
    document.getElementById('card-dia').addEventListener('click', voltearCartaDia);
    aplicarEfectoTilt(document.getElementById('card-dia')); 

    document.getElementById('btn-guia-tallas').addEventListener('click', () => {
        document.getElementById('modal-tallas').style.display = 'flex';
    });
    
    document.getElementById('btn-cerrar-tallas').addEventListener('click', () => {
        document.getElementById('modal-tallas').style.display = 'none';
    });

    document.getElementById('select-tema').addEventListener('change', () => {
        document.getElementById('mensaje-limite-tarot').style.display = 'none';
    });
});

// ==========================================
// RENDERIZAR ROPA EN EL HOME DEL TAROT
// ==========================================
function renderRopaDestacada() {
    const grid = document.getElementById('ropa-preview-grid');
    if (!grid) return; 
    
    grid.innerHTML = '';
    const ropaDestacada = dataRopa.slice(0, 4);
    
    ropaDestacada.forEach(prenda => {
        const div = document.createElement('div');
        div.className = 'ropa-minimal-card'; 
        div.addEventListener('click', () => {
            verDetalleRopa(prenda);
        });
        
        div.innerHTML = `
            <img src="${prenda.img}" alt="${prenda.nombre}" onerror="this.src='xpuppet_borde.jpg'">
            <div class="ropa-minimal-info">
                <span class="ropa-minimal-nombre">${prenda.nombre}</span>
                <span class="ropa-minimal-precio">${prenda.precio}</span>
            </div>
        `;
        
        aplicarEfectoTilt(div); 
        grid.appendChild(div);
    });
}

// ==========================================
// NAVEGACIÓN PRINCIPAL 
// ==========================================
function irAPantalla(idPantalla) {
    const pantallaActual = document.querySelector('.screen.active');
    const nuevaPantalla = document.getElementById(idPantalla);

    if (pantallaActual && pantallaActual.id === idPantalla) return;

    if (pantallaActual) {
        pantallaActual.classList.add('fade-out');
        setTimeout(() => {
            pantallaActual.classList.remove('active', 'fade-out');
            nuevaPantalla.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }, 300); 
    } else {
        nuevaPantalla.classList.add('active');
    }
}

// ==========================================
// COLECCIÓN DE CARTAS
// ==========================================
function abrirColeccionCartas() {
    pagCartas = 0;
    renderCartas();
    irAPantalla('pantalla-coleccion-cartas');
}

function renderCartas() {
    const grid = document.getElementById('grid-cartas');
    grid.innerHTML = '';
    
    const inicio = pagCartas * CARTAS_POR_PAG;
    const fin = inicio + CARTAS_POR_PAG;
    const cartasMostradas = dataCartas.slice(inicio, fin);
    const totalPags = Math.ceil(dataCartas.length / CARTAS_POR_PAG);

    cartasMostradas.forEach(carta => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.addEventListener('click', () => verDetalleCarta(carta));

        let imgSrc = carta.img;
        let nombreMostrado = carta.nombre;

        if (carta.id === 23) {
            let desbloqueada = localStorage.getItem('xpuppet_secreta_desbloqueada') === 'true';
            if (!desbloqueada) {
                imgSrc = 'carta_dorso.png'; 
                nombreMostrado = '???'; 
            }
        }

        div.innerHTML = `<img src="${imgSrc}" alt="${nombreMostrado}" onerror="this.src='carta_dorso.png'"><div class="item-title">${nombreMostrado}</div>`;
        aplicarEfectoTilt(div);
        grid.appendChild(div);
    });

    actualizarControlesPaginacion('cartas', pagCartas, totalPags);
}

function cambiarPaginaCartas(direccion) {
    const totalPags = Math.ceil(dataCartas.length / CARTAS_POR_PAG);
    pagCartas += direccion;
    if (pagCartas < 0) pagCartas = 0;
    if (pagCartas >= totalPags) pagCartas = totalPags - 1;
    renderCartas();
}

function verDetalleCarta(carta) {
    const imgElement = document.getElementById('det-carta-img');
    imgElement.classList.remove('animacion-revelacion-secreta');

    if (carta.id === 23) {
        const hoy = new Date().toLocaleDateString();
        let fechaGuardada = localStorage.getItem('xpuppet_secreta_fecha');
        let intentos = parseInt(localStorage.getItem('xpuppet_secreta_intentos') || '0');
        let desbloqueada = localStorage.getItem('xpuppet_secreta_desbloqueada') === 'true';

        if (fechaGuardada !== hoy) {
            intentos = 0;
            localStorage.setItem('xpuppet_secreta_fecha', hoy);
            localStorage.setItem('xpuppet_secreta_intentos', '0');
        }

        if (desbloqueada) {
            document.getElementById('det-carta-nombre').innerText = carta.nombre;
            imgElement.src = carta.img; 
            document.getElementById('det-carta-desc').innerText = carta.desc;
            imgElement.classList.add('animacion-revelacion-secreta');
        } else {
            if (intentos >= 3) {
                document.getElementById('det-carta-nombre').innerText = "???";
                imgElement.src = "carta_dorso.png";
                document.getElementById('det-carta-desc').innerText = "❌ Intentos agotados.\n\nNo conseguiste revelar el secreto hoy, pero no te desanimes. El oráculo requiere paciencia. Recupera tus energías y vuelve a intentarlo mañana.";
            } else {
                intentos++;
                localStorage.setItem('xpuppet_secreta_intentos', intentos.toString());

                if (Math.random() < 0.01) { 
                    localStorage.setItem('xpuppet_secreta_desbloqueada', 'true');
                    renderCartas();
                    document.getElementById('det-carta-nombre').innerText = carta.nombre;
                    imgElement.src = carta.img; 
                    document.getElementById('det-carta-desc').innerText = "¡Has roto el velo de la ilusión!\n\n" + carta.desc;
                    imgElement.classList.add('animacion-revelacion-secreta');
                } else {
                    document.getElementById('det-carta-nombre').innerText = `Intento ${intentos}/3`;
                    imgElement.src = "carta_dorso.png";
                    
                    if (intentos === 1) {
                        document.getElementById('det-carta-desc').innerText = "Esta es una carta sellada que solo se desbloquea si concentras todas tus energías.\n\nTienes 3 intentos diarios para revelarla. Has fallado el primero. Concéntrate, libera tu mente y vuelve a tocar la carta.";
                    } else if (intentos === 2) {
                        document.getElementById('det-carta-desc').innerText = "El sello sigue intacto. Tu mente aún divaga.\n\nRespira profundo, enfoca tu energía y usa tu último intento del día sabiamente.";
                    } else {
                        document.getElementById('det-carta-desc').innerText = "❌ Intentos agotados.\n\nNo conseguiste revelar el secreto hoy, pero no te desanimes. El oráculo requiere paciencia. Recupera tus energías y vuelve a intentarlo mañana.";
                    }
                }
            }
        }
    } else {
        document.getElementById('det-carta-nombre').innerText = carta.nombre;
        imgElement.src = carta.img;
        document.getElementById('det-carta-desc').innerText = carta.desc;
    }

    irAPantalla('pantalla-detalle-carta');
}

// ==========================================
// COLECCIÓN DE ROPA
// ==========================================
function abrirColeccionRopa() {
    pagRopa = 0;
    renderRopa();
    irAPantalla('pantalla-coleccion-ropa');
}

function renderRopa() {
    const grid = document.getElementById('grid-ropa');
    grid.innerHTML = '';
    
    const inicio = pagRopa * ROPA_POR_PAG;
    const fin = inicio + ROPA_POR_PAG;
    const ropaMostrada = dataRopa.slice(inicio, fin);
    const totalPags = Math.ceil(dataRopa.length / ROPA_POR_PAG);

    ropaMostrada.forEach(prenda => {
        const div = document.createElement('div');
        div.className = 'item-card ropa-card';
        div.addEventListener('click', () => verDetalleRopa(prenda));
        div.innerHTML = `<img src="${prenda.img}" alt="${prenda.nombre}" onerror="this.src='xpuppet_borde.jpg'"><div class="item-title">${prenda.nombre}</div>`;
        aplicarEfectoTilt(div); 
        grid.appendChild(div);
    });

    actualizarControlesPaginacion('ropa', pagRopa, totalPags);
}

function cambiarPaginaRopa(direccion) {
    const totalPags = Math.ceil(dataRopa.length / ROPA_POR_PAG);
    pagRopa += direccion;
    if (pagRopa < 0) pagRopa = 0;
    if (pagRopa >= totalPags) pagRopa = totalPags - 1;
    renderRopa();
}

function verDetalleRopa(prenda) {
    prendaSeleccionada = prenda; 
    document.getElementById('det-ropa-nombre').innerText = prenda.nombre;
    const imgEl = document.getElementById('det-ropa-img');
    imgEl.src = prenda.img;
    imgEl.onerror = function() { this.src = 'xpuppet_borde.jpg'; };
    document.getElementById('det-ropa-precio').innerText = prenda.precio;
    document.getElementById('det-ropa-desc').innerText = prenda.desc;
    
    document.getElementById('tabla-buzos').style.display = 'none';
    document.getElementById('tabla-camisa-hombre').style.display = 'none';
    document.getElementById('tabla-camisa-mujer').style.display = 'none';

    if (prenda.tipoTalla === 'buzo') {
        document.getElementById('titulo-tabla-tallas').innerText = "Medidas Buzo";
        document.getElementById('tabla-buzos').style.display = 'table';
        document.getElementById('nota-tallas-recomendacion').innerText = "Si buscas un estilo Oversized, te sugerimos pedir 1 o 2 tallas por encima de la tuya.";
    } else if (prenda.tipoTalla === 'camisa-regular') {
        document.getElementById('titulo-tabla-tallas').innerText = "Medidas Camiseta (Hombre/Unisex)";
        document.getElementById('tabla-camisa-hombre').style.display = 'table';
        document.getElementById('nota-tallas-recomendacion').innerText = "Corte clásico (Regular Fit).";
    } else if (prenda.tipoTalla === 'camisa-mujer') {
        document.getElementById('titulo-tabla-tallas').innerText = "Medidas Camiseta (Mujer)";
        document.getElementById('tabla-camisa-mujer').style.display = 'table';
        document.getElementById('nota-tallas-recomendacion').innerText = "Silueta entallada ajustada al cuerpo.";
    }
    
    irAPantalla('pantalla-detalle-ropa');
}

function comprarPrendaActual() {
    if(!prendaSeleccionada) return;
    const usuarioInstagram = "xpuppet__"; 
    alert(`¡Genial! Vas a ir a nuestro Instagram.\n\nRecuerda escribirnos pidiendo la prenda:\n"${prendaSeleccionada.nombre}"`);
    window.open(`https://ig.me/m/${usuarioInstagram}`, '_blank');
}

// ==========================================
// UTILIDADES UI
// ==========================================
function actualizarControlesPaginacion(tipo, paginaActual, totalPags) {
    document.getElementById(`texto-pag-${tipo}`).innerText = `${paginaActual + 1}/${totalPags}`;
    const btnPrev = document.getElementById(`btn-prev-${tipo}`);
    const btnNext = document.getElementById(`btn-next-${tipo}`);
    
    btnPrev.disabled = (paginaActual === 0);
    btnPrev.style.opacity = (paginaActual === 0) ? '0.5' : '1';
    btnPrev.style.cursor = (paginaActual === 0) ? 'not-allowed' : 'pointer';
    
    btnNext.disabled = (paginaActual === totalPags - 1);
    btnNext.style.opacity = (paginaActual === totalPags - 1) ? '0.5' : '1';
    btnNext.style.cursor = (paginaActual === totalPags - 1) ? 'not-allowed' : 'pointer';
}

function prepararMazo() {
    const selectTema = document.getElementById('select-tema');
    temaActual = selectTema.value;

    const hoy = new Date().toLocaleDateString();
    let fechaTarot = localStorage.getItem('xpuppet_tarot_fecha');
    
    if (fechaTarot !== hoy) {
        localStorage.setItem('xpuppet_tarot_fecha', hoy);
        localStorage.removeItem('xpuppet_tarot_general');
        localStorage.removeItem('xpuppet_tarot_amor');
        localStorage.removeItem('xpuppet_tarot_trabajo');
    }

    let lecturaGuardada = localStorage.getItem(`xpuppet_tarot_${temaActual}`);
    const mensajeRegreso = document.getElementById('mensaje-regreso-mañana');

    let idsGuardados = null;
    if (lecturaGuardada) {
        try { idsGuardados = JSON.parse(lecturaGuardada); } 
        catch (e) { idsGuardados = null; }
    }

    if (idsGuardados && Array.isArray(idsGuardados)) {
        cartasTirada = idsGuardados.map(id => dataCartas.find(carta => carta.id === id));
        cartasReveladas = 3; 

        for(let i=1; i<=3; i++) {
            let cardElement = document.getElementById(`card-pos-${i}`);
            cardElement.classList.add('volteada'); 
            document.getElementById(`img-tirada-${i}`).src = cartasTirada[i-1].img;
            if(cartasTirada[i-1].id === 23) { cardElement.classList.add('carta-secreta-brillo'); } 
            else { cardElement.classList.remove('carta-secreta-brillo'); }
        }

        document.getElementById('nombre-pasado').innerText = cartasTirada[0].nombre;
        document.getElementById('desc-pasado').innerText = cartasTirada[0].desc;
        document.getElementById('nombre-presente').innerText = cartasTirada[1].nombre;
        document.getElementById('desc-presente').innerText = cartasTirada[1].desc;
        document.getElementById('nombre-futuro').innerText = cartasTirada[2].nombre;
        document.getElementById('desc-futuro').innerText = cartasTirada[2].desc;
        
        let prediccionGuardada = generarLecturaAvanzada(cartasTirada[0], cartasTirada[1], cartasTirada[2]);
        document.getElementById('desc-sintesis').innerText = prediccionGuardada;
        
        document.getElementById('instruccion-cartas-real').style.display = 'none'; 
        document.getElementById('info-tirada').style.display = 'flex'; 
        mensajeRegreso.style.display = 'block'; 

        irAPantalla('pantalla-resultado-tarot');
        window.scrollTo(0, 0); 
        return; 
    } 
    
    if (lecturaGuardada && !Array.isArray(idsGuardados)) {
        localStorage.removeItem(`xpuppet_tarot_${temaActual}`);
    }

    mensajeRegreso.style.display = 'none'; 

    let mazo = [...dataCartas].filter(c => c.id !== 23); 
    mazo.sort(() => 0.5 - Math.random());
    cartasTirada = mazo.slice(0, 3);
    
    if (Math.random() < 0.03) {
        let indiceRandom = Math.floor(Math.random() * 3);
        let cartaSecreta = dataCartas.find(c => c.id === 23);
        if (cartaSecreta) { cartasTirada[indiceRandom] = cartaSecreta; }
    }

    let idsParaGuardar = cartasTirada.map(carta => carta.id);
    localStorage.setItem(`xpuppet_tarot_${temaActual}`, JSON.stringify(idsParaGuardar));

    cartasReveladas = 0;
    cartasTirada.forEach(carta => {
        const imgPreload = new Image();
        imgPreload.src = carta.img;
    });

    for(let i=1; i<=3; i++) {
        let cardElement = document.getElementById(`card-pos-${i}`);
        cardElement.classList.remove('volteada');
        cardElement.classList.remove('carta-secreta-brillo'); 
        document.getElementById(`img-tirada-${i}`).src = cartasTirada[i-1].img;
    }

    document.getElementById('instruccion-cartas-real').style.display = 'block';
    document.getElementById('info-tirada').style.display = 'none';

    irAPantalla('pantalla-resultado-tarot');
    window.scrollTo(0, 0);
}

function generarLecturaAvanzada(c1, c2, c3) {
    let energias = { cambio: 0, estabilidad: 0, emocion: 0, mente: 0 };
    energias[c1.energia]++;
    energias[c2.energia]++;
    energias[c3.energia]++;

    let energiaDominante = "";
    let max = 0;
    for (let e in energias) {
        if (energias[e] > max) { max = energias[e]; energiaDominante = e; }
    }

    let introTema = "";
    if (temaActual === 'amor') { introTema = "En el terreno de los sentimientos y tus conexiones profundas: "; } 
    else if (temaActual === 'trabajo') { introTema = "En el ámbito de tus proyectos, metas y finanzas: "; } 
    else { introTema = "Observando tu camino de vida actual: "; }

    let textoFinal = `${introTema} El paso de ${c1.nombre} en tu pasado hacia ${c3.nombre} en tu futuro nos muestra un tránsito claro. `;

    if (max >= 2) {
        if (energiaDominante === 'cambio') { textoFinal += `El oráculo detecta una fuerte presencia de transformación. Con ${c2.nombre} anclando tu presente, el universo te empuja a salir de tu zona de confort. Para construir lo nuevo, el terreno debe temblar un poco. `; } 
        else if (energiaDominante === 'estabilidad') { textoFinal += `Las cartas revelan energía de enraizamiento y orden. No es tiempo de saltos al vacío. ${c2.nombre} exige enfoque. Estás construyendo cimientos sólidos y el destino te pide paciencia y estrategia. `; } 
        else if (energiaDominante === 'emocion') { textoFinal += `Tu lectura respira intuición y empatía. ${c2.nombre} te recuerda que tu fuerza hoy radica en la vulnerabilidad. El futuro florecerá si permites que tu mundo interno y el amor propio guíen tus pasos. `; } 
        else if (energiaDominante === 'mente') { textoFinal += `Hay muchísima energía psíquica en tu tirada. La verdadera batalla o descubrimiento está en tu mente. La presencia de ${c2.nombre} hoy indica que debes escuchar tu sabiduría interna y dejar de sobrepensar. `; }
    } else {
        textoFinal += `Las cartas muestran fuerzas muy diferentes tirando de ti al mismo tiempo. Estás buscando el balance entre mente, corazón y acción. ${c2.nombre} indica que hoy debes fluir con esta contradicción en lugar de forzar una sola respuesta. `;
    }

    if (c3.energia === 'cambio') { textoFinal += `En cuanto a lo que viene, abraza lo inesperado; la metamorfosis es inminente.`; } 
    else if (c3.energia === 'estabilidad') { textoFinal += `Mantén la calma, el orden y la seguridad que buscas están por llegar.`; } 
    else if (c3.energia === 'emocion') { textoFinal += `Abre el pecho a lo que viene, déjate sentir sin miedo y confía.`; } 
    else { textoFinal += `Confía en el proceso; la verdad que necesitas pronto se revelará con total claridad.`; }

    return textoFinal;
}

function voltearCartaReal(numero) {
    let cardElement = document.getElementById(`card-pos-${numero}`);
    
    if(!cardElement.classList.contains('volteada')) {
        cardElement.style.transform = '';
        cardElement.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)';

        cardElement.classList.add('volteada');
        cartasReveladas++;
        
        if (cartasTirada[numero-1].id === 23) {
            cardElement.classList.add('carta-secreta-brillo');
            localStorage.setItem('xpuppet_secreta_desbloqueada', 'true');
            renderCartas();
        }

        if(cartasReveladas === 3) {
            document.getElementById('nombre-pasado').innerText = cartasTirada[0].nombre;
            document.getElementById('nombre-presente').innerText = cartasTirada[1].nombre;
            document.getElementById('nombre-futuro').innerText = cartasTirada[2].nombre;
            document.getElementById('desc-pasado').innerText = cartasTirada[0].desc;
            document.getElementById('desc-presente').innerText = cartasTirada[1].desc;
            document.getElementById('desc-futuro').innerText = cartasTirada[2].desc;

            let prediccionAvanzada = generarLecturaAvanzada(cartasTirada[0], cartasTirada[1], cartasTirada[2]);
            document.getElementById('desc-sintesis').innerText = prediccionAvanzada;

            setTimeout(() => {
                document.getElementById('instruccion-cartas-real').style.display = 'none';
                document.getElementById('info-tirada').style.display = 'flex';
                document.getElementById('info-tirada').scrollIntoView({ behavior: 'smooth' });
            }, 800);
        }
    }
}

// ==========================================
// FUNCIÓN PARA COMPARTIR LECTURA
// ==========================================
function prepararPantallaCompartir() {
    document.getElementById('story-img-1').src = cartasTirada[0].img;
    document.getElementById('story-img-2').src = cartasTirada[1].img;
    document.getElementById('story-img-3').src = cartasTirada[2].img;
    let textoSintesis = document.getElementById('desc-sintesis').innerText;
    document.getElementById('story-sintesis').innerText = `"${textoSintesis}"`;
    irAPantalla('pantalla-compartir');
}

// ==========================================
// EFECTO TILT 3D 
// ==========================================
function aplicarEfectoTilt(elemento) {
    elemento.addEventListener('mousemove', (e) => {
        if(elemento.style.transition.includes('0.6s')) return; 

        const rect = elemento.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        let rotateX = ((y - centerY) / centerY) * -15;
        let rotateY = ((x - centerX) / centerX) * 15;

        if(elemento.classList.contains('volteada')) {
            rotateY += 180;
            rotateX = -rotateX; 
        }
        
        elemento.style.transition = 'transform 0.1s ease-out';
        elemento.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    elemento.addEventListener('mouseleave', () => {
        elemento.style.transition = 'transform 0.5s ease-out';
        elemento.style.transform = ''; 
        setTimeout(() => { elemento.style.transition = ''; }, 500);
    });
}

// ==========================================
// LÓGICA DE LA CARTA DEL DÍA
// ==========================================
function abrirCartaDia() {
    const hoy = new Date().toLocaleDateString(); 
    const fechaGuardada = localStorage.getItem('xpuppet_fecha');
    const idCartaGuardada = localStorage.getItem('xpuppet_carta_id');

    const cardElement = document.getElementById('card-dia');
    const infoElement = document.getElementById('info-carta-dia');
    const mensajeEstado = document.getElementById('mensaje-estado-dia');

    cardElement.style.transition = '';

    if (fechaGuardada === hoy && idCartaGuardada) {
        const cartaDiaria = dataCartas.find(c => c.id == idCartaGuardada);
        document.getElementById('img-carta-dia').src = cartaDiaria.img;
        cardElement.classList.add('volteada'); 
        
        mensajeEstado.innerText = "Ya recibiste tu mensaje de hoy. Vuelve mañana 🦇";
        document.getElementById('nombre-carta-dia').innerText = cartaDiaria.nombre;
        document.getElementById('desc-carta-dia').innerText = cartaDiaria.consejo;
        infoElement.style.display = 'flex';
    } else {
        cardElement.classList.remove('volteada');
        mensajeEstado.innerText = "Concéntrate y toca la carta para recibir tu consejo.";
        infoElement.style.display = 'none';
    }

    irAPantalla('pantalla-carta-dia');
}

function voltearCartaDia() {
    const cardElement = document.getElementById('card-dia');
    if (cardElement.classList.contains('volteada')) return;

    const hoy = new Date().toLocaleDateString();
    let mazo = [...dataCartas].slice(0, 22);
    let cartaAleatoria = mazo[Math.floor(Math.random() * mazo.length)];

    if (Math.random() < 0.01) { cartaAleatoria = dataCartas[22]; }

    localStorage.setItem('xpuppet_fecha', hoy);
    localStorage.setItem('xpuppet_carta_id', cartaAleatoria.id);

    document.getElementById('img-carta-dia').src = cartaAleatoria.img;
    cardElement.style.transform = '';
    cardElement.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)';
    cardElement.classList.add('volteada');

    if (cartaAleatoria.id === 23) {
        cardElement.classList.add('carta-secreta-brillo');
        localStorage.setItem('xpuppet_secreta_desbloqueada', 'true');
        renderCartas();
    }

    setTimeout(() => {
        document.getElementById('mensaje-estado-dia').innerText = "Este es tu mensaje para hoy:";
        document.getElementById('nombre-carta-dia').innerText = cartaAleatoria.nombre;
        document.getElementById('desc-carta-dia').innerText = cartaAleatoria.consejo;
        document.getElementById('info-carta-dia').style.display = 'flex';
    }, 600);
}