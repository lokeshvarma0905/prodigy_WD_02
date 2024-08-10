// script.js
let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];
let lastLapTime = 0; // Variable to track the last lap time

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1000);
        startStopBtn.textContent = 'Stop';
        lapBtn.disabled = false;
        running = true;
        document.body.style.backgroundColor = "#dff0d8"; // Light green when running
    } else {
        clearInterval(tInterval);
        startStopBtn.textContent = 'Start';
        lapBtn.disabled = true;
        running = false;
        document.body.style.backgroundColor = "#f2dede"; // Light red when stopped
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.textContent = 
        (hours < 10 ? "0" : "") + hours + ":" + 
        (minutes < 10 ? "0" : "") + minutes + ":" + 
        (seconds < 10 ? "0" : "") + seconds;
}

function reset() {
    clearInterval(tInterval);
    display.textContent = '00:00:00';
    difference = 0;
    lastLapTime = 0; // Reset last lap time
    laps = [];
    lapsContainer.innerHTML = '';
    startStopBtn.textContent = 'Start';
    running = false;
    document.body.style.backgroundColor = "#f4f4f4"; // Default background color
}

function recordLap() {
    let currentLapTime = difference - lastLapTime;
    lastLapTime = difference;

    let totalHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let totalMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let totalSeconds = Math.floor((difference % (1000 * 60)) / 1000);

    let lapHours = Math.floor((currentLapTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let lapMinutes = Math.floor((currentLapTime % (1000 * 60 * 60)) / (1000 * 60));
    let lapSeconds = Math.floor((currentLapTime % (1000 * 60)) / 1000);

    const lapElement = document.createElement('li');
    lapElement.innerHTML = 
        "<span>" + (totalHours < 10 ? "0" : "") + totalHours + ":" + (totalMinutes < 10 ? "0" : "") + totalMinutes + ":" + (totalSeconds < 10 ? "0" : "") + totalSeconds + 
        "</span><span>" + (lapHours < 10 ? "0" : "") + lapHours + ":" + (lapMinutes < 10 ? "0" : "") + lapMinutes + ":" + (lapSeconds < 10 ? "0" : "") + lapSeconds + "</span>";

    laps.push({
        total: display.textContent,
        lap: lapElement.innerHTML
    });

    lapsContainer.appendChild(lapElement);
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
