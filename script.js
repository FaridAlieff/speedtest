// API bilgilerini ayarla
const API_URL = 'https://api.coingecko.com/api/v3/exchange_rates'; // CoinGecko kripto ve döviz kurları

let currencyCards = 0;

async function fetchRates() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.rates;
}

function updateFlag(currencyCode, flagElement) {
    const countryCode = currencyCode.slice(0, 2).toLowerCase(); 
    if (currencyCode === 'BTC') {
        flagElement.src = `https://cryptologos.cc/logos/bitcoin-btc-logo.png`;
    } else if (currencyCode === 'ETH') {
        flagElement.src = `https://cryptologos.cc/logos/ethereum-eth-logo.png`;
    } else {
        flagElement.src = `https://flagcdn.com/w40/${countryCode}.png`;
    }
    flagElement.alt = `${currencyCode} Flag`;
}

function createCurrencyCard(currency, rate, flagUrl) {
    const card = document.createElement('div');
    card.className = 'currency-card';

    const flag = document.createElement('img');
    flag.className = 'flag';
    flag.src = flagUrl;
    card.appendChild(flag);

    const currencySelector = document.createElement('select');
    currencySelector.className = 'currency-selector';
    currencySelector.innerHTML = `
        <option value="USD">USD - US Dollar</option>
        <option value="EUR">EUR - Euro</option>
        <option value="TRY">TRY - Turkish Lira</option>
        <option value="BTC">BTC - Bitcoin</option>
        <option value="ETH">ETH - Ethereum</option>
    `;
    currencySelector.value = currency;
    currencySelector.onchange = () => updateExchangeRates();
    card.appendChild(currencySelector);

    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.value = rate;
    amountInput.placeholder = '0';
    amountInput.oninput = () => updateExchangeRates();
    card.appendChild(amountInput);

    document.getElementById('currency-cards').appendChild(card);
}

async function updateExchangeRates() {
    const rates = await fetchRates();
    const cards = document.querySelectorAll('.currency-card');
    let baseRate = parseFloat(cards[0].querySelector('input').value) || 1;

    cards.forEach((card, index) => {
        if (index > 0) {
            const currencyCode = card.querySelector('select').value.toLowerCase();
            const rate = rates[currencyCode]?.value || 1;
            const amount = baseRate * rate;
            card.querySelector('input').value = amount.toFixed(2);
        }
    });
}

function addCurrencyCard() {
    const currency = 'USD';
    const flagUrl = `https://flagcdn.com/w40/us.png`;
    const rate = 1;
    createCurrencyCard(currency, rate, flagUrl);
    currencyCards++;
    updateExchangeRates();
}

document.addEventListener('DOMContentLoaded', () => {
    addCurrencyCard();
    addCurrencyCard();
    addCurrencyCard();
});
