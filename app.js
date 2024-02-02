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
    
        const weatherIconsMap = {
            'clear': 'fas fa-sun',          // Día despejado
            'clouds': 'fas fa-cloud',       // Nublado
            'rain': 'fas fa-cloud-showers-heavy',  // Lluvia
            'snow': 'fas fa-snowflake'      // Nieve
            // Puedes agregar más mapeos según tus necesidades
        };
    
        for (let i = 0; i < data.list.length; i += 8) {
            const date = new Date(data.list[i].dt * 1000);
            const day = date.toLocaleDateString('es-ES', { weekday: 'long' });
            const temperature = data.list[i].main.temp;
            const weatherMain = data.list[i].weather[0].main.toLowerCase();
            const weatherIconClass = weatherIconsMap[weatherMain];
    
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="day">${day}</div>
                <div class="icon"><i class="${weatherIconClass}"></i></div>
                <div class="temperature">${temperature}°C</div>
            `;
            forecastElement.appendChild(li);
        }
    }
    
});
