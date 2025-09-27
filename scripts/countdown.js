const targetDateString = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Brussels'
}).format(new Date(2025, 10, 30, 10, 0, 0));  // Remember, months are 0-indexed in JavaScript

const targetDate = new Date(targetDateString);

const countdownElem = document.querySelector('.countdown');
const daysElem = document.getElementById('days');
const hoursElem = document.getElementById('hours');
const minutesElem = document.getElementById('minutes');
const secondsElem = document.getElementById('seconds');

const daysLabelElem = document.getElementById('daysLabel');
const hoursLabelElem = document.getElementById('hoursLabel');
const minutesLabelElem = document.getElementById('minutesLabel');
const secondsLabelElem = document.getElementById('secondsLabel');

function updateLanguage() {
    const lang = document.documentElement.lang;
    switch(lang) {
        case 'nl':
            daysLabelElem.textContent = 'dagen';
            hoursLabelElem.textContent = 'uren';
            minutesLabelElem.textContent = 'minuten';
            secondsLabelElem.textContent = 'seconden';
            break;
        case 'fr':
            daysLabelElem.textContent = 'jours';
            hoursLabelElem.textContent = 'heures';
            minutesLabelElem.textContent = 'minutes';
            secondsLabelElem.textContent = 'secondes';
            break;
        case 'de':
            daysLabelElem.textContent = 'Tage';
            hoursLabelElem.textContent = 'Stunden';
            minutesLabelElem.textContent = 'Minuten';
            secondsLabelElem.textContent = 'Sekunden';
            break;
        default:
            daysLabelElem.textContent = 'days';
            hoursLabelElem.textContent = 'hours';
            minutesLabelElem.textContent = 'minutes';
            secondsLabelElem.textContent = 'seconds';
            break;
    }
}

function updateClock() {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
        countdownElem.style.display = 'none';
        return;  // Stop further execution if the date has passed
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    daysElem.textContent = days;
    hoursElem.textContent = hours;
    minutesElem.textContent = minutes;
    secondsElem.textContent = seconds;
}

updateLanguage();
setInterval(updateClock, 1000);