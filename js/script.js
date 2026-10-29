(function () {
    'use strict';

    /* ===== Contador regresivo ===== */
    // TODO: confirmar fecha/hora oficial de llegada de León XIV al Perú.
    var TARGET_DATE = new Date('2026-11-11T08:00:00-05:00');

    var countdownEl = document.getElementById('countdown');
    var daysEl = document.getElementById('cd-days');
    var hoursEl = document.getElementById('cd-hours');
    var minsEl = document.getElementById('cd-mins');

    function pad(n) {
        return String(Math.max(n, 0)).padStart(2, '0');
    }

    function updateCountdown() {
        var diff = TARGET_DATE.getTime() - Date.now();

        if (diff <= 0) {
            if (countdownEl) {
                countdownEl.style.display = 'none';
            }
            return;
        }

        var totalMinutes = Math.floor(diff / 60000);
        var days = Math.floor(totalMinutes / (60 * 24));
        var hours = Math.floor((totalMinutes % (60 * 24)) / 60);
        var mins = totalMinutes % 60;

        daysEl.textContent = pad(days);
        hoursEl.textContent = pad(hours);
        minsEl.textContent = pad(mins);
    }

    if (daysEl && hoursEl && minsEl) {
        updateCountdown();
        setInterval(updateCountdown, 1000 * 30);
    }

    /* ===== Activar himno del Papa (audio independiente del video del hero) ===== */
    var himnoAudio = document.getElementById('himnoAudio');
    var audioToggle = document.getElementById('audioToggle');
    var audioLabel = audioToggle ? audioToggle.querySelector('.audio-toggle__label') : null;

    if (himnoAudio && audioToggle) {
        audioToggle.addEventListener('click', function () {
            if (himnoAudio.paused) {
                himnoAudio.play().then(function () {
                    audioToggle.setAttribute('aria-pressed', 'true');
                    if (audioLabel) { audioLabel.textContent = 'Desactivar audio'; }
                }).catch(function () {});
            } else {
                himnoAudio.pause();
                audioToggle.setAttribute('aria-pressed', 'false');
                if (audioLabel) { audioLabel.textContent = 'Activar audio'; }
            }
        });
    }

    /* ===== Cintillo fijo al salir del hero ===== */
    var hero = document.getElementById('hero');
    var stickyBar = document.getElementById('stickyBar');

    if (hero && stickyBar && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    stickyBar.classList.toggle('is-visible', !entry.isIntersecting);
                });
            },
            { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
        );

        observer.observe(hero);
    }

    /* ===== Recorrido: selección de versión + mapa pineado por scroll ===== */
    // Para añadir la foto de cada parada, completa "photo" (ruta del archivo) y
    // "photoAlt" (texto alternativo). Convención de nombres sugerida:
    // ./img/mapa/foto-info-{n}-mapa-izq.jpg  (versión "El Perú de Prevost")
    // ./img/mapa/foto-info-{n}-mapa-der.jpg  (versión "El regreso de León XIV")
    // Si "photo" queda vacío (''), la tarjeta muestra un placeholder.
    var RECORRIDO_DATA = {
        '1': {
            side: 'left',
            mapPrefix: 'version-papa-1',
            mapCount: 4,
            stops: [
                {
                    date: '1985 · Chulucanas',
                    tagline: 'Donde comenzó la misión',
                    photo: './img/mapa/foto-info-1-mapa-izq.jpg',
                    photoAlt: 'Robert Prevost en una celebración en Chulucanas, Piura.',
                    paragraphs: [
                        'Robert Prevost llegó al Perú en 1985, destinado a la misión agustiniana de Chulucanas, en Piura. Durante un año fue vicario parroquial de la Catedral de la Sagrada Familia y canciller de la entonces prelatura territorial. Era su primera experiencia pastoral en el país.'
                    ],
                    badges: [
                        { type: 'huella', label: 'Su huella', text: 'Chulucanas fue el inicio de una relación con el Perú que marcaría buena parte de su vida religiosa.' }
                    ]
                },
                {
                    date: '1988 · Trujillo',
                    tagline: 'Donde formó y se formó',
                    photo: './img/mapa/foto-info-2-mapa-izq.jpg',
                    photoAlt: '',
                    paragraphs: [
                        'Tres años después volvió al Perú. Esta vez a Trujillo. Allí dirigió la casa de formación de los agustinos y durante más de una década fue formador, maestro de profesores, docente, vicario judicial y párroco. Enseñó derecho canónico, teología moral y patrística en el Seminario Mayor San Carlos y San Marcelo. Trujillo fue una de sus etapas más largas en el país: permaneció vinculado a la misión agustiniana entre 1988 y 1999.'
                    ],
                    badges: [
                        { type: 'huella', label: 'Su huella', text: 'Aquí dejó de ser únicamente un misionero que había llegado al Perú. Se convirtió también en formador de nuevas generaciones religiosas.' }
                    ]
                },
                {
                    date: '2014 · Chiclayo',
                    tagline: 'La diócesis que se convirtió en su casa',
                    photo: './img/mapa/foto-info-3-mapa-izq.jpg',
                    photoAlt: '',
                    paragraphs: [
                        'Después de varios años fuera del Perú, Prevost regresó en 2014. El papa Francisco lo nombró administrador apostólico de Chiclayo y obispo titular de Sufar. Un mes después fue ordenado obispo en la Catedral de Santa María. En 2015 fue nombrado oficialmente obispo de Chiclayo y ese mismo año obtuvo la nacionalidad peruana por naturalización. Permaneció al frente de la diócesis hasta que Francisco lo llamó a Roma en 2023.'
                    ],
                    badges: [
                        { type: 'huella', label: 'Su huella', text: 'Chiclayo concentra uno de los vínculos más profundos entre Prevost y el Perú. Fue aquí donde desarrolló una parte decisiva de su ministerio episcopal.' }
                    ]
                },
                {
                    date: '2020 · Callao',
                    tagline: 'Una responsabilidad en medio de la pandemia',
                    photo: './img/mapa/foto-info-4-mapa-izq.jpg',
                    photoAlt: '',
                    paragraphs: [
                        'En abril de 2020, mientras seguía siendo obispo de Chiclayo, Prevost fue nombrado también administrador apostólico de la diócesis del Callao. Fue una responsabilidad adicional en uno de los periodos más difíciles de la pandemia.'
                    ],
                    badges: [
                        { type: 'huella', label: 'Su huella', text: 'Cuatro años después sería creado cardenal. En 2023, Francisco lo llamó definitivamente a Roma para dirigir el Dicasterio para los Obispos. Y el 8 de mayo de 2025 Robert Prevost salió al balcón de la Basílica de San Pedro convertido en León XIV.' }
                    ]
                }
            ]
        },
        '2': {
            side: 'right',
            mapPrefix: 'version-papa-2',
            mapCount: 5,
            stops: [
                {
                    date: '11–12 de noviembre · Lima y Callao',
                    tagline: 'Un vínculo que también pasa por el Callao',
                    photo: './img/mapa/foto-info-1-mapa-der.jpg',
                    photoAlt: '',
                    paragraphs: [
                        'El Callao forma parte de la trayectoria de Prevost: en 2020 asumió su administración apostólica, sin dejar de ser obispo de Chiclayo. Lima, en cambio, adquiere especial protagonismo en esta nueva etapa por su condición de capital y sede de los principales encuentros institucionales de la visita.'
                    ],
                    badges: [
                        { type: 'regreso', label: 'Relación con su pasado', text: 'Callao, responsabilidad pastoral en 2020.' }
                    ]
                },
                {
                    date: '13–14 de noviembre · Chiclayo',
                    tagline: 'El regreso a su casa episcopal',
                    photo: './img/mapa/foto-info-2-mapa-der.jpg',
                    photoAlt: '',
                    paragraphs: [
                        'De todas las paradas, Chiclayo es la que más directamente se conecta con la vida de Robert Prevost. Allí asumió la conducción de la diócesis en 2014, fue nombrado obispo en 2015 y permaneció hasta 2023. También obtuvo la nacionalidad peruana durante esos años. Más que un destino de viaje, es una ciudad central en su biografía.'
                    ],
                    badges: [
                        { type: 'regreso', label: 'Relación con su pasado', text: 'Obispo de Chiclayo entre 2015 y 2023.' },
                       
                    ]
                },
                {
                    date: '15 de noviembre · Cusco',
                    tagline: 'Una ciudad fuera de sus principales etapas pastorales',
                    photo: './img/mapa/foto-info-3-mapa-der.jpg',
                    photoAlt: '',
                    paragraphs: [
                        'A diferencia de Chulucanas, Trujillo o Chiclayo, Cusco no figura entre los centros principales de la trayectoria pastoral de Prevost en el Perú. Su incorporación al recorrido de León XIV permite mostrar que el vínculo del pontífice con el país también se extiende a lugares que no marcaron directamente sus años como misionero y obispo.'
                    ],
                    badges: [
                        { type: 'ahora', label: 'Relación con su pasado', text: 'No es una de sus principales sedes pastorales conocidas.'},
                        
                    ]
                },
                {
                    date: '15 de noviembre · Pucallpa',
                    tagline: 'El encuentro con otro territorio del Perú',
                    photo: './img/mapa/foto-info-4-mapa-der.jpg',
                    photoAlt: '',
                    paragraphs: [
                        'El recorrido peruano de Prevost estuvo concentrado principalmente en ciudades de la costa norte, además de su responsabilidad en el Callao. Pucallpa introduce en su regreso una dimensión territorial diferente: la Amazonía. No es una de las sedes principales de su trayectoria anterior, pero amplía el alcance geográfico de esta nueva visita.'
                    ],
                    badges: [
                        { type: 'ahora', label: 'Relación con su pasado', text: 'No es una de sus principales sedes pastorales conocidas.' }
                    ]
                },
                {
                    date: '16 de noviembre · Lima',
                    tagline: 'El final de una visita, la continuidad de un vínculo',
                    photo: './img/mapa/foto-info-1-mapa-der.jpg',
                    photoAlt: '',
                    paragraphs: [
                        'León XIV concluirá su primera visita al Perú como pontífice en la capital. Su paso por el país habrá unido ciudades fundamentales en su trayectoria pastoral con nuevos destinos, reflejando una relación con el Perú que trasciende su elección como Papa.'
                    ],
                    badges: [
                        {type: 'ahora', label: 'Lo que representa', text: 'Lima simboliza la continuidad de un vínculo con el país que marcó buena parte de su vida religiosa.'}
                    ]
                }
            ]
        }
    };

    var FOOTPRINTS_ICON = '<img class="mapa-card__badge-footprints" src="./img/huella-icon.png" alt="" aria-hidden="true">';

    var MEDIA_PLACEHOLDER = '<div class="mapa-card__media-placeholder">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">' +
        '<rect x="2.5" y="4.5" width="19" height="15" rx="2"/>' +
        '<circle cx="8.5" cy="10" r="1.8"/>' +
        '<path d="M3 16.5 8.5 12l3 2.5L17 10l4 5"/>' +
        '</svg>' +
        '<span>Imagen referencial</span>' +
        '</div>';

    function escapeHTML(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function buildCardHTML(stop) {
        var media = stop.photo
            ? '<img src="' + stop.photo + '" alt="' + escapeHTML(stop.photoAlt || '') + '">'
            : MEDIA_PLACEHOLDER;

        var html = '<article class="mapa-card">';
        html += '<div class="mapa-card__media">' + media + '</div>';
        html += '<div class="mapa-card__body">';
        html += '<h4 class="mapa-card__date">' + escapeHTML(stop.date) + '</h4>';
        html += '<p class="mapa-card__tagline">' + escapeHTML(stop.tagline) + '</p>';

        stop.paragraphs.forEach(function (paragraph) {
            html += '<p class="mapa-card__text">' + escapeHTML(paragraph) + '</p>';
        });

        if (stop.badges && stop.badges.length) {
            html += '<div class="mapa-card__badges">';
            stop.badges.forEach(function (badge) {
                var isSalmon = badge.type === 'regreso' || badge.type === 'ahora';
                var badgeClass = 'mapa-card__badge' + (isSalmon ? ' mapa-card__badge--salmon' : '');
                html += '<div class="' + badgeClass + '">';
                html += '<p class="mapa-card__badge-label">';
                if (badge.type === 'huella') { html += FOOTPRINTS_ICON; }
                html += escapeHTML(badge.label) + '</p>';
                html += '<p class="mapa-card__badge-text">' + escapeHTML(badge.text) + '</p>';
                html += '</div>';
            });
            html += '</div>';
        }

        html += '</div></article>';
        return html;
    }

    var versionCards = document.querySelectorAll('.version-card');
    var mapaTrack = document.getElementById('mapaTrack');
    var mapaPin = document.getElementById('mapaPin');
    var mapaPinVisual = mapaPin ? mapaPin.querySelector('.mapa-pin__visual') : null;
    var mapaStack = document.getElementById('mapaStack');
    var mapaCards = document.getElementById('mapaCards');
    var mapaSwitch = document.getElementById('mapaSwitch');
    var mapaSwitchCards = document.querySelectorAll('.mapa-switch__item');

    var mobileLayoutQuery = window.matchMedia('(max-width: 720px)');

    var activeVersion = null;
    var currentStopIndex = -1;
    var isMobileLayout = false;
    var ticking = false;

    function buildMapStack(version) {
        var data = RECORRIDO_DATA[version];
        mapaStack.innerHTML = '';

        for (var i = 1; i <= data.mapCount; i++) {
            var img = document.createElement('img');
            img.src = './img/mapa/mapa-' + i + '-' + data.mapPrefix + '.png';
            img.alt = '';
            img.setAttribute('aria-hidden', 'true');
            mapaStack.appendChild(img);
        }
    }

    function setActiveMapImage(index) {
        var mapImages = mapaStack.querySelectorAll('img');
        mapImages.forEach(function (img, i) {
            img.classList.toggle('is-active', i === index);
        });
    }

    /* ----- Escritorio: una tarjeta con crossfade, pin lateral fijo ----- */

    function renderStopDesktop(version, index) {
        var data = RECORRIDO_DATA[version];
        setActiveMapImage(Math.max(index, 0));

        var previousCard = mapaCards.querySelector('.mapa-card');
        if (previousCard) { previousCard.classList.remove('is-visible'); }

        if (index < 0) {
            window.setTimeout(function () {
                if (currentStopIndex < 0) { mapaCards.innerHTML = ''; }
            }, previousCard ? 400 : 0);
            return;
        }

        var stop = data.stops[index];
        if (!stop) { return; }

        window.setTimeout(function () {
            mapaCards.innerHTML = buildCardHTML(stop);
            window.requestAnimationFrame(function () {
                var newCard = mapaCards.querySelector('.mapa-card');
                if (newCard) { newCard.classList.add('is-visible'); }
            });
        }, previousCard ? 180 : 0);
    }

    function setupDesktopTrack(version) {
        var data = RECORRIDO_DATA[version];
        mapaTrack.style.height = (data.stops.length * 100) + 'vh';
        currentStopIndex = 0;
        renderStopDesktop(version, 0);
    }

    function updateDesktopProgress() {
        var data = RECORRIDO_DATA[activeVersion];
        var rect = mapaTrack.getBoundingClientRect();
        var totalScrollable = mapaTrack.offsetHeight - window.innerHeight;

        if (totalScrollable <= 0) { return; }

        var progress = (-rect.top) / totalScrollable;
        progress = Math.min(Math.max(progress, 0), 1);

        var segments = data.stops.length - 1;
        var index = segments > 0 ? Math.floor(progress * segments) : 0;
        index = Math.min(Math.max(index, 0), data.stops.length - 1);

        if (index !== currentStopIndex) {
            currentStopIndex = index;
            renderStopDesktop(activeVersion, index);
        }
    }

    /* ----- Móvil: tarjetas en flujo normal, superpuestas sobre el mapa fijo -----
       El mapa queda "sticky" de fondo (ver CSS). Cada parada tiene, antes de su
       tarjeta, un espaciador de un viewport completo: primero se ve solo el mapa
       pineado en ese punto, luego la tarjeta correspondiente sube de abajo hacia
       arriba y vuelve a salir por encima, y el espaciador de la siguiente parada
       actualiza el mapa antes de que aparezca su tarjeta. Así se repite con cada
       parada. */

    function setupMobileTrack(version) {
        var data = RECORRIDO_DATA[version];
        mapaTrack.style.height = '';

        var html = '';
        data.stops.forEach(function (stop, i) {
            html += '<div class="mapa-stack-spacer" data-stop-index="' + i + '" aria-hidden="true"></div>';
            html += buildCardHTML(stop);
        });
        mapaCards.innerHTML = html;

        currentStopIndex = -1;
        setActiveMapImage(0);
    }

    function updateMobileProgress() {
        var spacers = mapaCards.querySelectorAll('.mapa-stack-spacer');
        if (!spacers.length) { return; }

        var threshold = window.innerHeight * 0.5;
        var index = -1;

        spacers.forEach(function (spacer) {
            if (spacer.getBoundingClientRect().top <= threshold) {
                index = parseInt(spacer.getAttribute('data-stop-index'), 10);
            }
        });

        if (index !== currentStopIndex) {
            currentStopIndex = index;
            setActiveMapImage(Math.max(index, 0));
        }
    }

    /* ----- Selección de versión ----- */

    function selectVersion(version, autoScroll) {
        var data = RECORRIDO_DATA[version];
        if (!data) { return; }

        if (autoScroll === undefined) { autoScroll = true; }

        activeVersion = version;
        isMobileLayout = mobileLayoutQuery.matches;

        versionCards.forEach(function (card) {
            var isSelected = card.getAttribute('data-version') === version;
            card.classList.toggle('is-selected', isSelected);
            card.setAttribute('aria-pressed', String(isSelected));
        });

        mapaSwitchCards.forEach(function (card) {
            var isSelected = card.getAttribute('data-version') === version;
            card.classList.toggle('is-selected', isSelected);
            card.setAttribute('aria-pressed', String(isSelected));
        });

        mapaPin.classList.toggle('is-right', data.side === 'right');

        buildMapStack(version);
        mapaTrack.hidden = false;

        if (isMobileLayout) {
            setupMobileTrack(version);
        } else {
            setupDesktopTrack(version);
        }

        if (autoScroll) {
            window.requestAnimationFrame(function () {
                mapaTrack.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    /* ----- Switcher de fotos fijo mientras el mapa está en pantalla ----- */

    function updateMapaSwitchVisibility() {
        if (!mapaSwitch) { return; }

        if (!activeVersion || mapaTrack.hidden) {
            mapaSwitch.classList.remove('is-visible');
            return;
        }

        var stickyOffset = stickyBar ? stickyBar.offsetHeight : 0;
        mapaSwitch.style.top = stickyOffset + 'px';

        var isPinned;

        if (mobileLayoutQuery.matches) {
            /* En móvil .mapa-pin no es sticky, pero .mapa-pin__visual sí
               (top:0; ver CSS). Igual que en escritorio, se usa ese rect
               para saber si de verdad sigue "pegado": antes de llegar
               (rect.top > 0) o al despegarse al final (rect.top < 0) no
               debe superponerse ni al selector grande ni al mapa saliente. */
            var visualRect = (mapaPinVisual || mapaPin).getBoundingClientRect();
            isPinned = visualRect.top <= 0 && visualRect.top > -2;
        } else {
            /* .mapa-pin es sticky con top:0. Mientras está realmente "pegado"
               su rect.top se mantiene en 0; al acercarse el final del track se
               despega y empieza a desplazarse hacia arriba con la página (top
               negativo), que es justo cuando no debe superponerse al mapa. */
            var pinRect = mapaPin.getBoundingClientRect();
            isPinned = pinRect.top <= 0 && pinRect.top > -2;
        }

        mapaSwitch.classList.toggle('is-visible', isPinned);
    }

    function updateScrollProgress() {
        ticking = false;

        updateMapaSwitchVisibility();

        if (!activeVersion || mapaTrack.hidden) { return; }

        if (isMobileLayout) {
            updateMobileProgress();
        } else {
            updateDesktopProgress();
        }
    }

    function onScroll() {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(updateScrollProgress);
        }
    }

    function onResize() {
        if (activeVersion && mobileLayoutQuery.matches !== isMobileLayout) {
            selectVersion(activeVersion);
            return;
        }
        onScroll();
    }

    if (versionCards.length && mapaTrack && mapaPin && mapaStack) {
        versionCards.forEach(function (card) {
            card.addEventListener('click', function () {
                selectVersion(card.getAttribute('data-version'));
            });
        });

        mapaSwitchCards.forEach(function (card) {
            card.addEventListener('click', function () {
                selectVersion(card.getAttribute('data-version'));
            });
        });

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        var versionSelectorWrap = document.getElementById('versionSelectorWrap');
        if (versionSelectorWrap && 'IntersectionObserver' in window) {
            var versionSelectorObserver = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting && !activeVersion) {
                            selectVersion('1', false);
                            versionSelectorObserver.disconnect();
                        }
                    });
                },
                { threshold: 0.4 }
            );

            versionSelectorObserver.observe(versionSelectorWrap);
        }

        if (mapaPinVisual && 'IntersectionObserver' in window) {
            var mapaPinRevealObserver = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            mapaPin.classList.add('is-revealed');
                            mapaPinRevealObserver.disconnect();
                        }
                    });
                },
                { threshold: 0.15 }
            );

            mapaPinRevealObserver.observe(mapaPinVisual);
        }
    }

    /* ===== Timeline: agenda día por día ===== */
    var TIMELINE_DATA = [
        {
            dayName: 'Miércoles',
            dayNumber: '11',
            place: 'Lima',
            stamp: './img/timeline-recorrido/estampilla-1.png',
            items: [
                { time: '5:30 p. m.', text: 'Llegada a la Base Aérea del Callao' },
                { time: '6:15 p. m.', text: 'Ceremonia de bienvenida en Palacio de Gobierno' },
                { time: '6:45 p. m.', text: 'Visita a la presidenta de la República' },
                { time: '7:45 p. m.', text: 'Encuentro con autoridades, sociedad civil y cuerpo diplomático en el Gran Teatro Nacional' }
            ]
        },
        {
            dayName: 'Jueves',
            dayNumber: '12',
            place: 'Lima',
            stamp: './img/timeline-recorrido/estampilla-2.png',
            items: [
                { time: '9:30 a. m.', text: 'Encuentro con los obispos del Perú' },
                { time: '10:20 a. m.', text: 'Celebración en la Catedral de Lima' },
                { time: '11:30 a. m.', text: 'Encuentro sobre los desafíos y las esperanzas para el futuro del pueblo peruano' },
                { time: '6:00 p. m.', text: 'Vigilia con jóvenes y universitarios en el Estadio Nacional' }
            ]
        },
        {
            dayName: 'Viernes',
            dayNumber: '13',
            place: 'Chiclayo y Pimentel',
            stamp: './img/timeline-recorrido/estampilla-3.png',
            items: [
                { time: '9:10 a. m.', text: 'Llegada a Chiclayo' },
                { time: '10:30 a. m.', text: 'Misa en las Pampas de Pimentel' },
                { time: '12:40 p. m.', text: 'Visita privada a la capilla San Óscar Romero' },
                { time: '4:30 p. m.', text: 'Encuentro en el Santuario Nuestra Señora de la Paz' },
                { time: '5:45 p. m.', text: 'Encuentro universitario en la USAT' }
            ]
        },
        {
            dayName: 'Sábado',
            dayNumber: '14',
            place: 'Chiclayo, Santa Cruz y Zaña',
            stamp: './img/timeline-recorrido/estampilla-4.png',
            items: [
                { time: '8:00 a. m.', text: 'Coronación de la Virgen Inmaculada' },
                { time: '11:00 a. m.', text: 'Misa en Santa Cruz de Succhabamba' },
                { time: '5:30 p. m.', text: 'Encuentro por la clausura del Año Jubilar de Santo Toribio de Mogrovejo en Zaña' }
            ]
        },
        {
            dayName: 'Domingo',
            dayNumber: '15',
            place: 'Cusco y Pucallpa',
            stamp: './img/timeline-recorrido/estampilla-5.png',
            items: [
                { time: '10:30 a. m.', text: 'Encuentro en Saqsaywaman' },
                { time: '11:45 a. m.', text: 'Ángelus frente a la Catedral del Cusco' },
                { time: '3:00 p. m.', text: 'Encuentro con misioneros y representantes de pueblos amazónicos en Pucallpa' },
                { time: '4:45 p. m.', text: 'Misa en la Villa Deportiva Regional Ucayali' }
            ]
        },
        {
            dayName: 'Lunes',
            dayNumber: '16',
            place: 'Lima',
            stamp: './img/timeline-recorrido/estampilla-6.png',
            items: [
                { time: '8:30 a. m.', text: 'Visita a la casa de acogida de las Hermanitas de los Ancianos Desamparados' },
                { time: '10:30 a. m.', text: 'Misa en la Base Aérea Las Palmas' },
                { time: '1:15 p. m.', text: 'Ceremonia de despedida' },
                { time: '1:45 p. m.', text: 'Partida hacia Roma' }
            ]
        }
    ];

    var FOOTPRINTS_SRC = './img/timeline-recorrido/pasos.png';

    function buildTimelineDayHTML(day, isLast) {
        var html = '<div class="timeline-day">';
        html += '<div class="timeline-day__stamp"><img src="' + day.stamp + '" alt="' + escapeHTML(day.place) + '"></div>';
        html += '<div class="timeline-day__daycol">';
        html += '<span class="timeline-day__name">' + escapeHTML(day.dayName) + '</span>';
        html += '<span class="timeline-day__num">' + escapeHTML(day.dayNumber) + '</span>';
        if (!isLast) {
            html += '<span class="timeline-day__circle" aria-hidden="true"></span>';
            html += '<span class="timeline-day__line" aria-hidden="true"></span>';
        }
        html += '</div>';
        html += '<div class="timeline-day__content">';
        html += '<p class="timeline-day__place">' + escapeHTML(day.place) + '</p>';
        day.items.forEach(function (item) {
            html += '<p class="timeline-day__item"><strong>' + escapeHTML(item.time) + '</strong> ' + escapeHTML(item.text) + '</p>';
        });
        html += '</div>';
        html += '</div>';
        return html;
    }

    function buildTimelineConnectorHTML(index) {
        return '<div class="timeline-connector" id="timeline-connector-' + index + '">' +
            '<div class="timeline-connector__footprints">' +
            '<img class="timeline-footprints" src="' + FOOTPRINTS_SRC + '" alt="" aria-hidden="true" width="100%">' +
            '</div>' +
            '<div class="timeline-connector__line-cell"><span class="timeline-connector__line" aria-hidden="true"></span></div>' +
            '</div>';
    }

    var timelineList = document.getElementById('timelineList');

    if (timelineList) {
        var timelineHTML = '';
        TIMELINE_DATA.forEach(function (day, index) {
            var isLast = index === TIMELINE_DATA.length - 1;
            timelineHTML += buildTimelineDayHTML(day, isLast);
            if (!isLast) { timelineHTML += buildTimelineConnectorHTML(index + 1); }
        });
        timelineList.innerHTML = timelineHTML;

        var footprints = timelineList.querySelectorAll('.timeline-footprints');

        if ('IntersectionObserver' in window) {
            var footprintsObserver = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            footprintsObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
            );

            footprints.forEach(function (el) { footprintsObserver.observe(el); });
        } else {
            footprints.forEach(function (el) { el.classList.add('is-visible'); });
        }
    }

    /* ===== Símbolos: secuencia de paneles pineados por scroll ===== */
    var SIMBOLOS_DATA = [
        {
            title: 'La Cruz',
            image: './img/simbolos/simbolo-1.png',
            imageAlt: 'Cruz pectoral de León XIV',
            text: 'La cruz pectoral que León XIV llevó el día de su elección guarda reliquias ligadas a su identidad agustiniana: San Agustín, Santa Mónica, Santo Tomás de Villanueva, el beato Anselmo Polanco y el venerable Giuseppe Bartolomeo Menochio. Fue un regalo de la Curia General Agustiniana cuando Robert Prevost fue creado cardenal en 2023.'
        },
        {
            title: 'El Anillo del Pescador',
            image: './img/simbolos/simbolo-2.png',
            imageAlt: 'Anillo del Pescador de León XIV',
            text: 'León XIV recibió el Anillo del Pescador el 18 de mayo de 2025, al iniciar formalmente su ministerio petrino. En el exterior aparece San Pedro con las llaves y la red; en el interior está grabado el nombre León XIV. El anillo simboliza la misión del Papa como sucesor de Pedro y custodio de la fe.'
        },
        {
            title: 'El Escudo',
            image: './img/simbolos/simbolo-3.png',
            imageAlt: 'Escudo pontificio de León XIV',
            text: 'Su escudo une dos elementos centrales de su identidad. Sobre fondo azul aparece un lirio, símbolo mariano. En el otro campo, un corazón ardiente atravesado por una flecha descansa sobre un libro: es el emblema agustiniano. Su lema, "In Illo uno unum", significa: "En el único Cristo somos uno".'
        },
        {
            title: 'La Mitra',
            image: './img/simbolos/simbolo-4.png',
            imageAlt: 'Mitra episcopal de León XIV',
            text: 'La mitra es una de las insignias propias del obispo y León XIV la utiliza en las celebraciones litúrgicas como obispo de Roma. También aparece sobre su escudo pontificio: una mitra de plata con tres bandas doradas, acompañada por las llaves cruzadas de San Pedro, símbolos tradicionales del papado.'
        },
        {
            title: 'El pasaporte peruano',
            image: './img/simbolos/simbolo-5.png',
            imageAlt: 'Pasaporte peruano de Robert Prevost',
            text: 'Robert Prevost no solo posee nacionalidad peruana: también ha tramitado tres pasaportes peruanos. Migraciones confirmó que obtuvo el título de nacionalidad peruana el 24 de agosto de 2015 y que su último pasaporte peruano se encuentra vigente.'
        },
        {
            title: 'El DNI peruano',
            image: './img/simbolos/simbolo-6.png',
            imageAlt: 'DNI peruano de Robert Prevost',
            text: 'Prevost obtuvo su primer DNI después de nacionalizarse peruano en 2015 y gestionó un DNI electrónico en 2016. En mayo de 2025, ya como Papa, recibió en el Vaticano a una delegación del Reniec para actualizarlo al DNI electrónico 3.0, con condición de no caduca.'
        },
        {
            title: 'El libro',
            image: './img/simbolos/simbolo-7.png',
            imageAlt: 'Detalle del libro en el escudo de León XIV',
            text: 'En su escudo, un libro sostiene el corazón atravesado por una flecha. Representa la Palabra de Dios y recuerda también los escritos de San Agustín, el pensador y santo que marcó la espiritualidad de la orden a la que pertenece León XIV.'
        }
    ];

    var simbolosTrack = document.getElementById('simbolosTrack');
    var simbolosPin = document.getElementById('simbolosPin');
    var simbolosOverlay = document.getElementById('simbolosOverlay');
    var simbolosPanels = document.getElementById('simbolosPanels');

    if (simbolosTrack && simbolosPin && simbolosPanels) {
        var simbolosHTML = '';
        SIMBOLOS_DATA.forEach(function (simbolo) {
            simbolosHTML += '<div class="simbolo-panel">' +
                '<div class="simbolo-panel__inner">' +
                    '<div class="simbolo-panel__visual"><img src="' + simbolo.image + '" alt="' + escapeHTML(simbolo.imageAlt) + '"></div>' +
                    '<div class="simbolo-panel__text">' +
                        '<h4 class="simbolo-card__title">' + escapeHTML(simbolo.title) + '</h4>' +
                        '<div class="simbolo-card__box"><p>' + escapeHTML(simbolo.text) + '</p></div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        });
        simbolosPanels.innerHTML = simbolosHTML;

        var simbolosPanelEls = simbolosPanels.querySelectorAll('.simbolo-panel');
        var totalSimbolosSteps = SIMBOLOS_DATA.length + 1;
        var SIMBOLOS_OVERLAY_MAX = 0.85;
        var SIMBOLOS_FADE = 0.2; // fracción del paso de cada símbolo dedicada a entrar/salir

        simbolosTrack.style.height = (totalSimbolosSteps * 100) + 'vh';

        var simbolosTicking = false;

        function updateSimbolosProgress() {
            simbolosTicking = false;

            var rect = simbolosTrack.getBoundingClientRect();
            var totalScrollable = simbolosTrack.offsetHeight - window.innerHeight;

            if (totalScrollable <= 0) { return; }

            var progress = (-rect.top) / totalScrollable;
            progress = Math.min(Math.max(progress, 0), 1);

            var overallIndex = progress * totalSimbolosSteps;

            if (simbolosOverlay) {
                var overlayProgress = Math.min(Math.max((overallIndex - 1) / SIMBOLOS_FADE, 0), 1);
                simbolosOverlay.style.opacity = overlayProgress * SIMBOLOS_OVERLAY_MAX;
            }

            simbolosPanelEls.forEach(function (panel, i) {
                var local = Math.min(Math.max(overallIndex - (i + 1), 0), 1);
                var opacity;

                if (local <= SIMBOLOS_FADE) {
                    opacity = local / SIMBOLOS_FADE;
                } else if (local >= 1 - SIMBOLOS_FADE) {
                    opacity = (1 - local) / SIMBOLOS_FADE;
                } else {
                    opacity = 1;
                }

                panel.style.opacity = opacity;
                panel.style.transform = 'translateY(' + ((1 - opacity) * 24) + 'px)';
            });
        }

        function onSimbolosScroll() {
            if (!simbolosTicking) {
                simbolosTicking = true;
                window.requestAnimationFrame(updateSimbolosProgress);
            }
        }

        updateSimbolosProgress();
        window.addEventListener('scroll', onSimbolosScroll, { passive: true });
        window.addEventListener('resize', onSimbolosScroll);
    }

    /* ===== Timeline horizontal: del misionero al Papa ===== */
    var TIMELINE_H_DATA = [
        {
            year: '1985',
            image: './img/timeline-horizontal/bg-item-1.jpg',
            imageAlt: 'Robert Prevost como joven misionero agustino',
            imageCredit: 'Foto: Vatican News ',
            cover: './img/timeline-horizontal/bg-portada-item-1.jpg',
            coverAlt: 'Portada de El Comercio sobre la visita de Juan Pablo II al Perú',
            headline: 'Llegó al Perú como misionero agustino y se instaló en Chulucanas, Piura, donde fue vicepárroco y canciller de la prelatura.',
            peru: 'Alan García inició su primer gobierno, en medio de una crisis económica y creciente violencia terrorista.',
            mundo: 'Mijaíl Gorbachov asumió el liderazgo de la Unión Soviética e inició una etapa de reformas que contribuirían al fin de la Guerra Fría.'
        },
        {
            year: '1987',
            image: './img/timeline-horizontal/bg-item-2.jpg',
            imageCredit: 'Foto: EFE ',
            headline: 'Defendió su tesis doctoral y asumió la dirección de Vocaciones y Misiones de su provincia agustiniana en Estados Unidos.',
            peru: 'Alan García anunció la estatización de la banca en medio de una profunda crisis económica y política.',
            mundo: 'El Lunes Negro provocó un desplome de las bolsas internacionales.'
        },
        {
            year: '1989',
            image: './img/timeline-horizontal/bg-item-3.jpg',
            imageCredit: 'Foto: Redes sociales ',
            headline: 'Se consolidó como formador y profesor de religiosos en Trujillo.',
            peru: 'El país enfrentó un mayor deterioro económico y la expansión de la violencia terrorista.',
            mundo: 'Cayó el Muro de Berlín, símbolo del inicio del fin de la Guerra Fría.'
        },
        /*{
            year: '1991',
            headline: 'Continuó enseñando y formando religiosos en Trujillo.',
            peru: 'El gobierno de Fujimori aplicó el Fujishock y continuó la violencia política.',
            mundo: 'Se disolvió la Unión Soviética y terminó la Guerra Fría.'
        },*/
        {
            year: '1993',
            image: './img/timeline-horizontal/bg-item-5.jpg',
            imageCredit: 'Foto: Redes sociales ',
            cover: './img/timeline-horizontal/portada-1993.jpg',
            headline: 'Continuó como formador y profesor en Trujillo.',
            peru: 'Se aprobó la Constitución Política de 1993.',
            mundo: 'Israel y la Organización para la Liberación de Palestina firmaron los Acuerdos de Oslo.'
        },
        {
            year: '1995',
            image: './img/timeline-horizontal/bg-item-6.jpg',
            imageCredit: 'Foto: Casa de Formación Agustiniana de Trujillo',
            cover: './img/timeline-horizontal/portada-1995.jpg',
            headline: 'Cumplió siete años de trabajo en Trujillo, dedicándose a la formación religiosa y la atención parroquial.',
            peru: 'Alberto Fujimori fue reelegido presidente.',
            mundo: 'Los Acuerdos de Dayton sentaron las bases para poner fin a la guerra de Bosnia.'
        },
        {
            year: '1997',
            image: './img/timeline-horizontal/bg-item-7.jpg',
            imageCredit: 'Foto: Redes sociales ',
            headline: 'Continuó su labor sacerdotal en Trujillo.',
            peru: 'La operación Chavín de Huántar puso fin a la crisis de los rehenes en la residencia japonesa.',
            mundo: 'Se presentó públicamente a Dolly, la primera oveja clonada a partir de una célula adulta.'
        },
        {
            year: '1999',
            image: './img/timeline-horizontal/bg-item-8.jpg',
            imageCredit: 'Foto: Facebook Hermanas de San Casimiro',
            headline: 'Dejó Trujillo después de 11 años al ser elegido prior provincial de los agustinos en Chicago.',
            peru: 'Fujimori buscó una nueva reelección entre crecientes denuncias de autoritarismo.',
            mundo: 'Entró en vigor el euro como moneda común de once países europeos, inicialmente para operaciones financieras.'
        },
        {
            year: '2000',
            image: './img/timeline-horizontal/bg-item-9.jpg',
            imageCredit: 'Foto: Noviciado Agustiniano Internacional Nuestra señora de la Gracia',
            markerBefore: 'Siglo XXI',
            cover: './img/timeline-horizontal/portada-2000.jpg',
            headline: 'Inició una nueva etapa de liderazgo internacional en la Orden de San Agustín.',
            peru: 'Cayó el régimen de Alberto Fujimori tras una crisis política marcada por la Marcha de los Cuatro Suyos.',
            mundo: 'Científicos del Proyecto Genoma Humano anunciaron el primer borrador de la secuencia del genoma humano.'
        },
        {
            year: '2002 - 2006',
            image: './img/timeline-horizontal/bg-item-10.jpg',
            imageCredit: 'Foto: Orden de San Agustín ',
            headline: 'Dirigió la Orden de San Agustín a escala internacional.',
            peru: 'Alejandro Toledo gobernó el Perú.',
            mundo: 'En 2005 murió Juan Pablo II y Benedicto XVI fue elegido papa.'
        },
        {
            year: '2008 - 2012',
            image: './img/timeline-horizontal/bg-item-11.jpg',
            imageCredit: 'Foto: Fray Génesis Pacaldo Labana',
            headline: 'Continuó liderando la Orden de San Agustín en el mundo.',
            peru: 'El Perú vivió un período de crecimiento económico durante el segundo gobierno de Alan García y el inicio del de Ollanta Humala.',
            mundo: 'La crisis financiera de 2008 desencadenó una recesión mundial. En 2011 comenzaron las revueltas de la Primavera Árabe.'
        },
        {
            year: '2014',
            image: './img/timeline-horizontal/bg-item-12.jpg',
            imageCredit: 'Foto: Vatican News',
            headline: 'Francisco lo nombró administrador apostólico de Chiclayo. Fue ordenado obispo el 12 de diciembre.',
            peru: 'El gobierno de Ollanta Humala enfrentó conflictos sociales y cuestionamientos por corrupción y gobernabilidad.',
            mundo: 'La epidemia de ébola en África occidental fue declarada emergencia sanitaria internacional.'
        },
        {
            year: '2016',
            image: './img/timeline-horizontal/bg-item-13.jpg',
            imageCredit: 'Foto: Diócesis de Chiclayo ',
            cover: './img/timeline-horizontal/portada-2016.jpg',
            headline: 'Desarrolló su labor episcopal en Chiclayo, atendiendo parroquias, comunidades rurales y poblaciones vulnerables.',
            peru: 'Pedro Pablo Kuczynski ganó las elecciones presidenciales frente a Keiko Fujimori.',
            mundo: 'El Reino Unido votó a favor del Brexit y Donald Trump ganó las elecciones presidenciales de Estados Unidos.'
        },
        {
            year: '2018',
            image: './img/timeline-horizontal/bg-item-14.jpg',
            imageCredit: 'Foto: Conferencia Episcopal Peruana',
            cover: './img/timeline-horizontal/portada-2018.jpg',
            headline: 'Fue elegido segundo vicepresidente de la Conferencia Episcopal Peruana y asumió responsabilidades en sus comisiones.',
            peru: 'Pedro Pablo Kuczynski renunció a la presidencia y Martín Vizcarra asumió el poder.',
            mundo: 'Estados Unidos y China iniciaron una guerra comercial con la imposición de aranceles a sus productos.'
        },
        {
            year: '2020',
            image: './img/timeline-horizontal/bg-item-15.jpg',
            imageCredit: 'Foto: Parroquia Santa María Catedral',
            headline: 'Fue nombrado administrador apostólico del Callao y participó en acciones de asistencia durante la pandemia.',
            peru: 'Comenzó la cuarentena por COVID-19 y el país enfrentó una grave emergencia sanitaria.',
            mundo: 'La OMS caracterizó la propagación del COVID-19 como una pandemia mundial.'
        },
        {
            year: '2021',
            image: './img/timeline-horizontal/bg-item-2021.jpg',
            imageCredit: 'Foto: Caritas Chiclayo',
            headline: 'En la Diócesis de Chiclayo, lideró acciones concretas durante la emergencia por la pandemia del COVID-19: obras sociales, entrega de alimentos y refugio.',
            peru: 'El presidente Castillo termina el 2021 involucrado en chats que revelaban presiones desde el gobierno para imponer ascensos militares. ',
            mundo: 'El 2021 los talibanes retomaron el poder en Afganistán tras 20 años; en tanto, Angela Merkel dejó la cancillería alemana luego de 16 años. Fuente: Archivo El Comercio'
        },
        {
            year: '2022',
            image: './img/timeline-horizontal/bg-item-16.jpg',
            imageCredit: 'Foto: Archivo Diócesis de Chiclayo ',
            headline: 'Continuó su labor pastoral en Chiclayo, visitando parroquias y comunidades como Tumán.',
            peru: 'Pedro Castillo intentó disolver el Congreso, fue detenido y Dina Boluarte asumió la presidencia.',
            mundo: 'Rusia inició una invasión a gran escala de Ucrania, desencadenando una guerra de repercusión mundial.'
        },
        {
            year: '2024',
            image: './img/timeline-horizontal/bg-item-17.jpg',
            imageCredit: 'Foto: Paul Sunción',
            headline: 'Desde Roma mantuvo su vínculo con el Perú y visitó Chulucanas, donde había comenzado su misión en 1985.',
            peru: 'Persistió la crisis de confianza en las instituciones del país.',
            mundo: 'París acogió los Juegos Olímpicos, que reunieron a deportistas de todo el mundo.'
        },
        {
            year: '2025',
            image: './img/timeline-horizontal/bg-item-2025.jpg',
            imageCredit: 'Foto: Paul Sunción',
            headline: 'León XIV fue elegido Papa el 8 de mayo de 2025, en la cuarta votación del cónclave, convirtiéndose en el pontífice número 267 de la Iglesia católica.',
            peru: 'Dina Boluarte anunció el despliegue de 900 policías y 150 militares para enfrentar la violencia criminal en Pataz.',
            mundo: 'En mayo de 2025, Donald Trump y el primer ministro británico Keir Starmer anunciaron un acuerdo comercial.'
        },
        {
            year: '2026',
            image: './img/timeline-horizontal/bg-item-18.jpg',
            imageCredit: 'Foto: AP',
            headline: 'La Santa Sede anunció una visita apostólica de León XIV al Perú del 11 al 17 de noviembre, con paradas previstas en Lima, Chiclayo, Cusco y Pucallpa.',
            peru: 'Keiko Fujimori ganó las elecciones presidenciales y juró como presidenta de la República el 28 de julio.',
            mundo: 'Trump intensificó las redadas del ICE y las deportaciones de inmigrantes en Estados Unidos, desatando protestas.'
        }
    ];

    var timelineHTrack = document.getElementById('timelineHTrack');
    var timelineHScroll = document.getElementById('timelineHScroll');
    var timelineHLightbox = document.getElementById('timelineHLightbox');
    var timelineHLightboxImg = document.getElementById('timelineHLightboxImg');
    var timelineHLightboxClose = document.getElementById('timelineHLightboxClose');

    var TIMELINE_H_PHOTO_PLACEHOLDER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">' +
        '<rect x="2.5" y="4.5" width="19" height="15" rx="2"/>' +
        '<circle cx="8.5" cy="10" r="1.8"/>' +
        '<path d="M3 16.5 8.5 12l3 2.5L17 10l4 5"/>' +
        '</svg>';

    var TIMELINE_H_ZOOM_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
        '<circle cx="10.5" cy="10.5" r="6.5"/>' +
        '<path d="M20 20l-4.35-4.35"/>' +
        '</svg>';

    if (timelineHTrack && timelineHScroll) {
        var timelineHHTML = '';

        TIMELINE_H_DATA.forEach(function (item) {
            if (item.markerBefore) {
                timelineHHTML += '<div class="timeline-h__marker"><span>' + escapeHTML(item.markerBefore) + '</span></div>';
            }

            var photo = item.image
                ? '<img src="' + item.image + '" alt="' + escapeHTML(item.imageAlt || '') + '">'
                : TIMELINE_H_PHOTO_PLACEHOLDER;

            var photoCredit = (item.image && item.imageCredit)
                ? '<p class="timeline-h__photo-credit">' + escapeHTML(item.imageCredit) + '</p>'
                : '';

            var coverSection = item.cover
                ? '<hr class="timeline-h__divider">' +
                    '<p class="timeline-h__source-label">Cómo informó El Comercio</p>' +
                    '<button type="button" class="timeline-h__cover" data-cover="' + item.cover + '" data-cover-alt="' + escapeHTML(item.coverAlt || '') + '">' +
                        '<img src="' + item.cover + '" alt="' + escapeHTML(item.coverAlt || '') + '">' +
                        '<span class="timeline-h__cover-icon">' + TIMELINE_H_ZOOM_ICON + '</span>' +
                    '</button>'
                : '';

            timelineHHTML += '<div class="timeline-h__item">' +
                '<div class="timeline-h__badge">' +
                    '<span class="timeline-h__year">' + escapeHTML(item.year) + '</span>' +
                    '<span class="timeline-h__connector"></span>' +
                    '<span class="timeline-h__dot"></span>' +                    
                '</div>' +
                '<div class="timeline-h__card">' +
                    '<div class="timeline-h__photo">' + photo + '</div>' +
                    photoCredit +
                    '<p class="timeline-h__headline">' + escapeHTML(item.headline) + '</p>' +
                    '<span class="timeline-h__select-label">Selecciona un ítem</span>' +
                    '<div class="timeline-h__tabs">' +
                        '<button type="button" class="timeline-h__tab-btn is-active" data-tab="peru" aria-pressed="true">' +
                            '<img src="./img/timeline-horizontal/btn-mapa-activo.png" data-active="./img/timeline-horizontal/btn-mapa-activo.png" data-inactive="./img/timeline-horizontal/btn-mapa-inactivo.png" alt="Perú">' +
                        '</button>' +
                        '<button type="button" class="timeline-h__tab-btn" data-tab="mundo" aria-pressed="false">' +
                            '<img src="./img/timeline-horizontal/btn-mundo-inactivo.png" data-active="./img/timeline-horizontal/btn-mundo-activo.png" data-inactive="./img/timeline-horizontal/btn-mundo-inactivo.png" alt="Mundo">' +
                        '</button>' +
                    '</div>' +
                    '<div class="timeline-h__panel is-active" data-panel="peru">' +
                        '<strong>Perú:</strong>' +
                        '<p>' + escapeHTML(item.peru) + '</p>' +
                    '</div>' +
                    '<div class="timeline-h__panel" data-panel="mundo">' +
                        '<strong>Mundo:</strong>' +
                        '<p>' + escapeHTML(item.mundo) + '</p>' +
                    '</div>' +
                    coverSection +
                '</div>' +
            '</div>';
        });

        timelineHTrack.innerHTML = timelineHHTML;

        /* Tabs Perú / Mundo y apertura del lightbox de portadas */
        timelineHTrack.addEventListener('click', function (e) {
            if (timelineHDidDrag) { return; }

            var tabBtn = e.target.closest('.timeline-h__tab-btn');
            if (tabBtn) {
                var item = tabBtn.closest('.timeline-h__item');
                var tab = tabBtn.getAttribute('data-tab');

                item.querySelectorAll('.timeline-h__tab-btn').forEach(function (btn) {
                    var active = btn === tabBtn;
                    btn.classList.toggle('is-active', active);
                    btn.setAttribute('aria-pressed', String(active));
                    var img = btn.querySelector('img');
                    img.src = active ? img.getAttribute('data-active') : img.getAttribute('data-inactive');
                });

                item.querySelectorAll('.timeline-h__panel').forEach(function (panel) {
                    panel.classList.toggle('is-active', panel.getAttribute('data-panel') === tab);
                });

                return;
            }

            var coverBtn = e.target.closest('.timeline-h__cover');
            if (coverBtn && !coverBtn.disabled) {
                timelineHLightboxImg.src = coverBtn.getAttribute('data-cover');
                timelineHLightboxImg.alt = coverBtn.getAttribute('data-cover-alt') || '';
                timelineHLightbox.hidden = false;
            }
        });

        /* Cierre del lightbox */
        function closeTimelineHLightbox() {
            timelineHLightbox.hidden = true;
            timelineHLightboxImg.src = '';
        }

        if (timelineHLightboxClose) {
            timelineHLightboxClose.addEventListener('click', closeTimelineHLightbox);
        }
        if (timelineHLightbox) {
            timelineHLightbox.addEventListener('click', function (e) {
                if (e.target === timelineHLightbox) { closeTimelineHLightbox(); }
            });
        }
        window.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !timelineHLightbox.hidden) { closeTimelineHLightbox(); }
        });

        /* Arrastre con el cursor del mouse (grab / grabbing) */
        var timelineHDragging = false;
        var timelineHDidDrag = false;
        var timelineHDragStartX = 0;
        var timelineHDragStartScroll = 0;

        timelineHScroll.addEventListener('pointerdown', function (e) {
            if (e.pointerType !== 'mouse') { return; }
            timelineHDragging = true;
            timelineHDidDrag = false;
            timelineHDragStartX = e.clientX;
            timelineHDragStartScroll = timelineHScroll.scrollLeft;
            timelineHScroll.classList.add('is-grabbing');
        });

        window.addEventListener('pointermove', function (e) {
            if (!timelineHDragging) { return; }
            var delta = e.clientX - timelineHDragStartX;
            if (Math.abs(delta) > 4) { timelineHDidDrag = true; }
            timelineHScroll.scrollLeft = timelineHDragStartScroll - delta;
        });

        function endTimelineHDrag() {
            timelineHDragging = false;
            timelineHScroll.classList.remove('is-grabbing');
        }

        window.addEventListener('pointerup', endTimelineHDrag);
        window.addEventListener('pointercancel', endTimelineHDrag);
    }

    /* ----- Mural: el scroll vertical empuja el mural horizontalmente -----
       La sección se pinea a pantalla completa; mientras su contenedor
       (más alto que un viewport) sigue pasando por debajo, el track se
       traslada en X según el progreso de ese scroll, hasta agotarlo. */
    var muralH = document.getElementById('muralH');
    var muralHPin = document.getElementById('muralHPin');
    var muralHTrack = document.getElementById('muralHTrack');

    if (muralH && muralHPin && muralHTrack) {
        var muralMaxScroll = 0;
        var muralTicking = false;

        function setupMuralTrack() {
            var viewportWidth = muralHPin.clientWidth;
            muralMaxScroll = Math.max(muralHTrack.scrollWidth - viewportWidth, 0);
            muralH.style.height = (window.innerHeight + muralMaxScroll) + 'px';
            updateMuralProgress();
        }

        function updateMuralProgress() {
            muralTicking = false;
            if (muralMaxScroll <= 0) { return; }

            var rect = muralH.getBoundingClientRect();
            var progress = -rect.top / muralMaxScroll;
            progress = Math.min(Math.max(progress, 0), 1);

            muralHTrack.style.transform = 'translateX(' + (-progress * muralMaxScroll) + 'px)';
        }

        function onMuralScroll() {
            if (!muralTicking) {
                muralTicking = true;
                window.requestAnimationFrame(updateMuralProgress);
            }
        }

        setupMuralTrack();
        window.addEventListener('load', setupMuralTrack);
        window.addEventListener('resize', setupMuralTrack);
        window.addEventListener('scroll', onMuralScroll, { passive: true });

        /* Los tiles miden 100% de alto y ancho automático: su ancho real
           se conoce recién al cargar cada imagen, así que recalculamos el
           alto del contenedor a medida que van llegando. */
        muralHTrack.querySelectorAll('img').forEach(function (img) {
            if (!img.complete) {
                img.addEventListener('load', setupMuralTrack);
            }
        });
    }
})();
