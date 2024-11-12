// script.js

async function fetchRates(baseCurrency) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    const data = await response.json();
    return data.rates;
}

async function updateExchangeRates() {
    const currency1 = document.getElementById('currency1').value;
    const currency2 = document.getElementById('currency2').value;
    const currency3 = document.getElementById('currency3').value;

    const rates = await fetchRates(currency1);
    
    const amount1 = parseFloat(document.getElementById('amount1').value) || 0;
    
    document.getElementById('amount2').value = (amount1 * rates[currency2]).toFixed(2);
    document.getElementById('amount3').value = (amount1 * rates[currency3]).toFixed(2);
}

// Miktar girişi değiştiğinde veya döviz seçildiğinde güncelleme yap
document.getElementById('amount1').addEventListener('input', updateExchangeRates);
document.getElementById('currency1').addEventListener('change', updateExchangeRates);
document.getElementById('currency2').addEventListener('change', updateExchangeRates);
document.getElementById('currency3').addEventListener('change', updateExchangeRates);
