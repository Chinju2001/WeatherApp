const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

app.use(express.static(path.join(__dirname, 'public')));


// Initialize dotenv
dotenv.config();
console.log(process.env);


const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files from the 'public' folder

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!city) {
        return res.status(400).send({ error: 'City is required' });
    }

    try {
        const encodedCity = encodeURIComponent(city);
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`);

        // Log the response to check the data
        console.log(response.data); // This is to debug the API response

        res.json(response.data);
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).send({ error: 'Unable to fetch weather data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

