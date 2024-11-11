async function startSpeedTest() {
    // Hız ölçüm sonuçlarını sıfırla
    document.getElementById("ping").textContent = "Ölçülüyor...";
    document.getElementById("download").textContent = "Ölçülüyor...";
    document.getElementById("upload").textContent = "Ölçülüyor...";

    // Ping süresi
    const pingStartTime = new Date().getTime();
    await fetch("https://www.google.com", { mode: 'no-cors' });
    const pingEndTime = new Date().getTime();
    const ping = pingEndTime - pingStartTime;

    // İndirme hızı (Download)
    const downloadStart = new Date().getTime();
    const download = await fetch("https://speed.hetzner.de/10MB.bin");
    const downloadEnd = new Date().getTime();
    const downloadSize = 10 * 1024 * 1024 * 8; // 10 MB
    const downloadSpeed = (downloadSize / ((downloadEnd - downloadStart) / 1000) / 1024 / 1024).toFixed(2);

    // Yükleme hızı (Upload)
    const uploadStart = new Date().getTime();
    await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "test", body: "test" })
    });
    const uploadEnd = new Date().getTime();
    const uploadSize = 1 * 1024 * 1024 * 8; // 1 MB
    const uploadSpeed = (uploadSize / ((uploadEnd - uploadStart) / 1000) / 1024 / 1024).toFixed(2);

    // Sonuçları göster
    document.getElementById("ping").textContent = ping;
    document.getElementById("download").textContent = downloadSpeed;
    document.getElementById("upload").textContent = uploadSpeed;
}
