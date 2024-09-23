const apiKey = 'd3e23c2cba60e5f3eb5115021b28d83a';

document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    if (location) {
        getWeatherByLocation(location);
    } else {
        alert('Por favor, insira uma localização.');
    }
});

document.getElementById('geoWeatherBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        }, () => {
            alert('Não foi possível obter sua localização.');
        });
    } else {
        alert('Geolocalização não é suportada por este navegador.');
    }
});

function getWeatherByLocation(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=pt_br`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Erro ao buscar dados do clima.'));
}

function getWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Erro ao buscar dados do clima.'));
}

function displayWeather(data) {
    if (data.cod === 200) {
        const weatherOutput = `
            <h2>Clima em ${data.name}</h2>
            <p>Temperatura: ${data.main.temp} °C</p>
            <p>Condição: ${data.weather[0].description}</p>
            <p>Umidade: ${data.main.humidity}%</p>
            <p>Velocidade do Vento: ${data.wind.speed} m/s</p>
        `;
        document.getElementById('weatherOutput').innerHTML = weatherOutput;
    } else {
        alert('Localização não encontrada.');
    }
}
