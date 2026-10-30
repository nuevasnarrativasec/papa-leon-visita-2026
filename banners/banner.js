(function () {
    'use strict';

    /* Debe coincidir con TARGET_DATE en js/script.js del sitio principal */
    var TARGET_DATE = new Date('2026-11-11T08:00:00-05:00');

    var banner = document.getElementById('banner');
    var daysEl = document.getElementById('bannerDays');
    var hoursEl = document.getElementById('bannerHours');
    var minsEl = document.getElementById('bannerMins');

    if (!banner || !daysEl || !hoursEl || !minsEl) { return; }

    function pad(n) {
        return String(Math.max(n, 0)).padStart(2, '0');
    }

    function updateCountdown() {
        var diff = TARGET_DATE.getTime() - Date.now();

        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            banner.classList.add('banner--arrived');
            return;
        }

        var totalMinutes = Math.floor(diff / 60000);
        daysEl.textContent = pad(Math.floor(totalMinutes / (60 * 24)));
        hoursEl.textContent = pad(Math.floor((totalMinutes % (60 * 24)) / 60));
        minsEl.textContent = pad(totalMinutes % 60);
    }

    updateCountdown();
    window.setInterval(updateCountdown, 30 * 1000);
})();
