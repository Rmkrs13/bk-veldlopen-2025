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

// Mobile elements
const daysMobileElem = document.getElementById('days-mobile');
const hoursMobileElem = document.getElementById('hours-mobile');
const minutesMobileElem = document.getElementById('minutes-mobile');
const secondsMobileElem = document.getElementById('seconds-mobile');

const daysLabelMobileElem = document.getElementById('daysLabel-mobile');
const hoursLabelMobileElem = document.getElementById('hoursLabel-mobile');
const minutesLabelMobileElem = document.getElementById('minutesLabel-mobile');
const secondsLabelMobileElem = document.getElementById('secondsLabel-mobile');

function updateLanguage() {
    const lang = document.documentElement.lang;
    let daysText, hoursText, minutesText, secondsText;
    
    switch(lang) {
        case 'nl':
            daysText = 'dagen';
            hoursText = 'uren';
            minutesText = 'minuten';
            secondsText = 'seconden';
            break;
        case 'fr':
            daysText = 'jours';
            hoursText = 'heures';
            minutesText = 'minutes';
            secondsText = 'secondes';
            break;
        case 'de':
            daysText = 'Tage';
            hoursText = 'Stunden';
            minutesText = 'Minuten';
            secondsText = 'Sekunden';
            break;
        default:
            daysText = 'days';
            hoursText = 'hours';
            minutesText = 'minutes';
            secondsText = 'seconds';
            break;
    }
    
    // Update desktop labels
    if (daysLabelElem) daysLabelElem.textContent = daysText;
    if (hoursLabelElem) hoursLabelElem.textContent = hoursText;
    if (minutesLabelElem) minutesLabelElem.textContent = minutesText;
    if (secondsLabelElem) secondsLabelElem.textContent = secondsText;
    
    // Update mobile labels
    if (daysLabelMobileElem) daysLabelMobileElem.textContent = daysText;
    if (hoursLabelMobileElem) hoursLabelMobileElem.textContent = hoursText;
    if (minutesLabelMobileElem) minutesLabelMobileElem.textContent = minutesText;
    if (secondsLabelMobileElem) secondsLabelMobileElem.textContent = secondsText;
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

    // Update desktop countdown
    if (daysElem) daysElem.textContent = days;
    if (hoursElem) hoursElem.textContent = hours;
    if (minutesElem) minutesElem.textContent = minutes;
    if (secondsElem) secondsElem.textContent = seconds;
    
    // Update mobile countdown
    if (daysMobileElem) daysMobileElem.textContent = days;
    if (hoursMobileElem) hoursMobileElem.textContent = hours;
    if (minutesMobileElem) minutesMobileElem.textContent = minutes;
    if (secondsMobileElem) secondsMobileElem.textContent = seconds;
}

updateLanguage();
setInterval(updateClock, 1000);