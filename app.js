const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    $('#city-input-btn').on('click', function() {
        const cityName = $('#city-input').val();
        if (cityName) {
            weatherFn(cityName);
        } else {
            alert('Please enter a city name.');
        }
    });

    // Optional: Set default city when the page loads
    weatherFn('Pune');
});

async function weatherFn(cityName) {
    const query = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(query);
        const data = await response.json();
        if (response.ok) {
            weatherShowFn(data);
        } else {
            alert(`City not found: ${data.message}. Please try again.`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    $('#weather-info').fadeIn();
}
