function startCountdown() {
    const eventName = document.getElementById('eventName').value;
    const eventDate = new Date(document.getElementById('eventDate').value);
    const now = new Date();

    // Calculate the time difference in seconds
    const timeDiff = (eventDate - now) / 1000;

    if (timeDiff <= 0) {
        alert('Please select a future date.');
        return;
    }

    // Update countdown every second
    const countdownTimer = document.getElementById('countdownTimer');

    const countdownInterval = setInterval(() => {
        const now = new Date();
        const timeDiff = (eventDate - now) / 1000;

        if (timeDiff <= 0) {
            clearInterval(countdownInterval);
            countdownTimer.innerHTML = 'Event started!';
            return;
        }

        const days = Math.floor(timeDiff / (60 * 60 * 24));
        const hours = Math.floor((timeDiff % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((timeDiff % (60 * 60)) / 60);
        const seconds = Math.floor(timeDiff % 60);

        countdownTimer.innerHTML = `
            <span id="days">${days}</span> days
            <span id="hours">${hours}</span> hours
            <span id="minutes">${minutes}</span> minutes
            <span id="seconds">${seconds}</span> seconds
        `;
    }, 1000);
}
