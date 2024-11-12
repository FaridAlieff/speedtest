// script.js

async function fetchExchangeRates() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD'); // Örnek bir API
    const data = await response.json();

    // Gelen veriyi işleyelim
    displayExchangeRates(data.rates);
}

function displayExchangeRates(rates) {
    const currencyList = document.getElementById('currency-list');
    currencyList.innerHTML = ''; // Eski içerikleri temizle

    for (const [currency, rate] of Object.entries(rates)) {
        const currencyItem = document.createElement('div');
        currencyItem.className = 'currency-item';
        currencyItem.textContent = `${currency}: ${rate.toFixed(2)}`;
        currencyList.appendChild(currencyItem);
    }
}

// Sayfa yüklendiğinde API'yi çalıştır
window.addEventListener('load', fetchExchangeRates);
