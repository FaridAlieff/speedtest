function startSpeedTest() {
    const speedDisplay = document.getElementById("speed-value");
    const startButton = document.getElementById("start-button");
    startButton.disabled = true; // Düğmeyi devre dışı bırak
    speedDisplay.textContent = "0"; // Değerleri sıfırla

    let speed = 0;
    const maxSpeed = Math.floor(Math.random() * 100) + 50; // 50-150 arası rastgele hız
    const speedInterval = setInterval(() => {
        if (speed < maxSpeed) {
            speed += Math.floor(Math.random() * 5) + 1; // Rastgele artış
            speedDisplay.textContent = speed;
        } else {
            clearInterval(speedInterval); // Hız değerine ulaşıldığında durdur
            startButton.disabled = false; // Düğmeyi tekrar etkinleştir
        }
    }, 100);
}
