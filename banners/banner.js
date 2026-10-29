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

    function hasArrived() {
        return TARGET_DATE.getTime() - Date.now() <= 0;
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
    var countdownTimeout = null;

    function replayVideo() {
        countdown.classList.remove('is-visible');

        if (countdownInterval) {
            window.clearInterval(countdownInterval);
            countdownInterval = null;
        }

        if (countdownTimeout) {
            window.clearTimeout(countdownTimeout);
            countdownTimeout = null;
        }

        video.currentTime = 0;
        video.play().catch(function () {});
    }

    /* Al terminar el video: si ya se llegó a la fecha de llegada, el banner
       solo repite el video en loop, sin mostrar el contador. Si todavía no,
       se muestra el contador 5 minutos (revisando también ahí si la fecha
       se cumple mientras está visible) y luego se retoma el video. */
    function onVideoEnded() {
        if (hasArrived()) {
            replayVideo();
            return;
        }

        updateCountdownValues();
        countdown.classList.add('is-visible');

        countdownInterval = window.setInterval(function () {
            updateCountdownValues();
            if (hasArrived()) { replayVideo(); }
        }, 1000 * 30);

        countdownTimeout = window.setTimeout(replayVideo, COUNTDOWN_DURATION);
    }

    video.addEventListener('ended', onVideoEnded);
})();
