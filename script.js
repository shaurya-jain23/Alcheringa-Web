document.addEventListener("DOMContentLoaded", async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
async function getWeather(position) {
    const panel = document.getElementsByClassName('panel')[0];
    const container = document.getElementsByClassName('container')[0];
    const apiKey = "3cd0ee6fdf721c16bd7df159e4c9f5f7";
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiUrl =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    await fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Weather data not available");
            }
            panel.style.display= 'none'
            container.style.display = 'flex'
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("You denied the request for Geolocation. Please allow location access to view the weather.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function displayWeather(weatherData) {
    const temperatureElement = document.getElementsByClassName("temp")[0];
    const cityE = document.getElementsByClassName("city")[0];
    const feelE = document.getElementsByClassName("feel")[0];
    const dateE = document.getElementsByClassName("date")[0];
    const visE = document.getElementsByClassName("vis")[0];
    // const precE = document.getElementsByClassName("prepress0];
    const wsE = document.getElementsByClassName("ws")[0];
    const humidE = document.getElementsByClassName("humid")[0];
    const pressE = document.getElementsByClassName("press")[0];
    const weatherDescriptionElement = document.getElementsByClassName("overview")[0];
    let city = weatherData.name;
    let date = new Date();
    let feel = weatherData.main.feels_like;
    const temperature = weatherData.main.temp;
    const vis = weatherData.visibility;
    const ws = weatherData.wind.speed;
    const humid = weatherData.main.humidity;
    const press = weatherData.main.pressure;
    let icon = document.createElement('img');
    icon.className = 'icon';
    let id = weatherData.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${id}@2x.png`
    const weatherDescription = weatherData.weather[0].description;
    visE.textContent = vis;
    pressE.textContent = press;
    wsE.textContent = ws;
    humidE.textContent = humid;
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    cityE.textContent = city;
    feelE.textContent = feelE.textContent + feel;
    dateE.textContent = date.toLocaleString('en-US', options);
    temperatureElement.textContent = Math.round(temperature);
    temperatureElement.append(icon);
    weatherDescriptionElement.textContent = weatherDescription;
}
