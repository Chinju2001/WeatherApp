document.getElementById('weather-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent page reload

    const city = document.getElementById('city').value; // Get the city name from the input field
    const weatherResult = document.getElementById('weather-result');
    const errorMessage = document.getElementById('error-message');

    try {
        // Send the GET request to the backend (make sure the backend is running)
        const response = await fetch(`/weather?city=${city}`);

        // Handle any error responses (e.g., city not found)
        if (!response.ok) {
            throw new Error('City not found or API issue');
        }

        const data = await response.json();

        // Check if the data has the required fields
        if (data.weather && data.main) {
            const weather = data.weather[0].description;
            const temperature = Math.round(data.main.temp); // Temperature in Celsius
            const feelsLike = Math.round(data.main.feels_like); // Feels like temperature in Celsius
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            // Display weather information
            weatherResult.innerHTML = `
                <strong>Weather:</strong> ${weather}<br>
                <strong>Temperature:</strong> ${temperature}°C<br>
                <strong>Feels Like:</strong> ${feelsLike}°C<br>
                <strong>Humidity:</strong> ${humidity}%<br>
                <strong>Wind Speed:</strong> ${windSpeed} m/s
            `;
            weatherResult.style.display = 'block';
            errorMessage.style.display = 'none'; // Hide error message
        }
    } catch (error) {
        // Display error message if something goes wrong
        errorMessage.innerHTML = error.message;
        errorMessage.style.display = 'block';
        weatherResult.style.display = 'none'; // Hide the weather info
    }
});
