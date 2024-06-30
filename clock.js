function updateClock() {
    let now = new Date();
    let hour = now.getHours().toString().padStart(2, '0');
    let min = now.getMinutes().toString().padStart(2, '0');
    let sec = now.getSeconds().toString().padStart(2, '0');

    let timeString = `${hour}:${min}:${sec}`;
    document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000);

updateClock();