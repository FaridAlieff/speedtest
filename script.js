async function startSpeedTest() {
    document.getElementById("ping").textContent = "Ölçülüyor...";
    document.getElementById("download").textContent = "Ölçülüyor...";
    document.getElementById("upload").textContent = "Ölçülüyor...";

    // Ping simülasyonu
    const pingTime = await measurePing();
    document.getElementById("ping").textContent = pingTime;

    // Download simülasyonu
    const downloadSpeed = await measureDownloadSpeed();
    document.getElementById("download").textContent = downloadSpeed;

    // Upload simülasyonu
    const uploadSpeed = await measureUploadSpeed();
    document.getElementById("upload").textContent = uploadSpeed;
}

// Ping ölçümü (simüle edilmiş)
async function measurePing() {
    const start = new Date().getTime();
    await fetch("https://www.google.com", { mode: 'no-cors' });
    const end = new Date().getTime();
    return end - start;
}

// Download ölçümü (simüle edilmiş)
async function measureDownloadSpeed() {
    const startTime = new Date().getTime();
    const download = await fetch("https://speed.hetzner.de/10MB.bin");
    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000; // Saniye
    const fileSize = 10 * 1024 * 1024 * 8; // 10MB
    const speedMbps = (fileSize / duration / 1024 / 1024).toFixed(2); // Mbps cinsinden
    return speedMbps;
}

// Upload ölçümü (simüle edilmiş)
async function measureUploadSpeed() {
    const startTime = new Date().getTime();
    await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ test: "data" })
    });
    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000; // Saniye
    const fileSize = 1 * 1024 * 1024 * 8; // 1MB
    const speedMbps = (fileSize / duration / 1024 / 1024).toFixed(2); // Mbps cinsinden
    return speedMbps;
}
