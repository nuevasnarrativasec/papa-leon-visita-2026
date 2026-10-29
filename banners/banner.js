(function () {
    'use strict';

    /* Debe coincidir con TARGET_DATE en js/script.js del sitio principal */
    var TARGET_DATE = new Date('2026-11-11T08:00:00-05:00');
    var COUNTDOWN_DURATION = 5 * 60 * 1000; // el contador se muestra 5 minutos

    var video = document.getElementById('bannerVideo');
    var countdown = document.getElementById('bannerCountdown');
    var daysEl = document.getElementById('bannerDays');
    var hoursEl = document.getElementById('bannerHours');
    var minsEl = document.getElementById('bannerMins');

    if (!video || !countdown || !daysEl || !hoursEl || !minsEl) { return; }

    function pad(n) {
        return String(Math.max(n, 0)).padStart(2, '0');
    }

    function updateCountdownValues() {
        var diff = TARGET_DATE.getTime() - Date.now();

        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            return;
        }

        var totalMinutes = Math.floor(diff / 60000);
        daysEl.textContent = pad(Math.floor(totalMinutes / (60 * 24)));
        hoursEl.textContent = pad(Math.floor((totalMinutes % (60 * 24)) / 60));
        minsEl.textContent = pad(totalMinutes % 60);
    }

    var countdownInterval = null;

    /* Al terminar el video: se muestra el contador 5 minutos y luego se
       vuelve a reproducir el video desde el inicio, en un ciclo continuo. */
    function showCountdown() {
        updateCountdownValues();
        countdownInterval = window.setInterval(updateCountdownValues, 1000 * 30);
        countdown.classList.add('is-visible');

        window.setTimeout(function () {
            countdown.classList.remove('is-visible');
            window.clearInterval(countdownInterval);
            video.currentTime = 0;
            video.play().catch(function () {});
        }, COUNTDOWN_DURATION);
    }

    video.addEventListener('ended', showCountdown);
})();
