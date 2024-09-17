let timerInterval;
let timeLeft = 1500; // 25 minutos en segundos
let alarmSound = new Audio('alarm.mp3');  // Asegúrate de tener 'alarm.mp3' en el directorio

// Mostrar Fecha y Hora Local
function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    dateTimeElement.textContent = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}

// Actualizar la visualización del cronómetro
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer-display').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Función para iniciar el cronómetro
function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alarmSound.play().catch((error) => {
                    console.log('Autoplay prevented:', error);
                });  // Intentar reproducir el sonido de la alarma
            }
        }, 1000);
    }
}

// Función para detener el cronómetro y la alarma
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    alarmSound.pause();  // Detener la alarma
    alarmSound.currentTime = 0;  // Reiniciar el sonido de la alarma
}

// Función para reiniciar el cronómetro y la alarma
function resetTimer() {
    stopTimer();
    timeLeft = 1500; // Reiniciar a 25 minutos
    updateDisplay();
}

// Función para establecer un nuevo tiempo
function setTimer(minutes) {
    stopTimer();
    timeLeft = minutes * 60;
    updateDisplay();
}

// Actualizar la fecha y hora cada segundo
setInterval(updateDateTime, 1000);
