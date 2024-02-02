document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '52f0ab51ec11624889764da48cd156d1'; // Reemplaza con tu clave API de OpenWeatherMap
    const locationInput = prompt('Ingrese la ubicación para obtener el clima:');

    if (locationInput) {
        getLocationWeather(locationInput);
    }

    function getLocationWeather(location) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data);
                return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`);
            })
            .then(response => response.json())
            .then(data => displayWeeklyWeather(data))
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayCurrentWeather(data) {
        const locationElement = document.getElementById('location');
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('description');

        locationElement.textContent = `${data.name}, ${data.sys.country}`;
        temperatureElement.textContent = `Temperatura: ${data.main.temp}°C`;
        descriptionElement.textContent = `Descripción: ${data.weather[0].description}`;
    }

    function displayWeeklyWeather(data) {
        const forecastElement = document.getElementById('forecast');
        forecastElement.innerHTML = '';

        for (let i = 0; i < data.list.length; i += 8) {
            const date = new Date(data.list[i].dt * 1000);
            const day = date.toLocaleDateString('es-ES', { weekday: 'long' });
            const temperature = data.list[i].main.temp;

            const li = document.createElement('li');
            li.textContent = `${day}: ${temperature}°C`;
            forecastElement.appendChild(li);
        }
    }
});
