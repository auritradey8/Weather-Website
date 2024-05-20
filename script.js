const getWeather = async (city) => {
    document.getElementById('cityname').innerHTML = city;
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a173513e32msh17726ed826d53c8p179137jsnb02f328154f6',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();

        if (!result.temp) {
            throw new Error('Incomplete data received from the API');
        }

        const {
            cloud_pct,
            temp,
            feels_like,
            humidity,
            min_temp,
            max_temp,
            wind_speed,
            wind_degrees,
            sunrise,
            sunset
        } = result;

        document.getElementById('cloud_pct').innerHTML = `${cloud_pct}%`;
        document.getElementById('temp').innerHTML = `${temp}°C`;
        document.getElementById('temp2').innerHTML = `${temp}°C`;
        document.getElementById('feels_like').innerHTML = `${feels_like}°C`;
        document.getElementById('humidity').innerHTML = `${humidity}%`;
        document.getElementById('humidity2').innerHTML = `${humidity}%`;
        document.getElementById('min_temp').innerHTML = `${min_temp}°C`;
        document.getElementById('max_temp').innerHTML = `${max_temp}°C`;
        document.getElementById('wind_speed').innerHTML = `${wind_speed} m/s`;
        document.getElementById('wind_speed2').innerHTML = `${wind_speed} m/s`;
        document.getElementById('wind_degrees').innerHTML = `${wind_degrees}°`;
        document.getElementById('sunrise').innerHTML = `${sunrise}`;
        document.getElementById('sunset').innerHTML = `${sunset}`;
        document.getElementById('temp_button').innerHTML = `${temp}°C`;

        console.log('Temperature:', temp);

        const tempButton = document.getElementById('temp_button');
        if (temp >= 40) {
            tempButton.innerHTML = 'Excessive Heat';
            console.log('Excessive Heat condition met');
        } else if (temp >= 33 && temp <= 39) {
            tempButton.innerHTML = 'Moderate';
            console.log('Moderate condition met');
        } else if (temp >= 15 && temp <= 32) {
            tempButton.innerHTML = 'Cool';
            console.log('Cool condition met');
        } else {
            tempButton.innerHTML = 'Extremely Cold';
            console.log('Extremely Cold condition met');
        }

        console.log('Humidity:', humidity);

        const humidityButton = document.getElementById('humidity_button');
        if (humidity >= 60) {
            humidityButton.innerHTML = 'Humid';
            console.log('Humid condition met');
        } else if (humidity >= 30 && humidity <= 59) {
            humidityButton.innerHTML = 'Moderate';
            console.log('Moderate condition met');
        } else {
            humidityButton.innerHTML = 'Dry';
            console.log('Dry condition met');
        }

        console.log('Wind Speed:', wind_speed);

        const windSpeedButton = document.getElementById('wind_speed_button');
        if (wind_speed >= 10) {
            windSpeedButton.innerHTML = 'High Wind';
            console.log('High Wind condition met');
        } else if (wind_speed >= 5 && wind_speed < 10) {
            windSpeedButton.innerHTML = 'Moderate Wind';
            console.log('Moderate Wind condition met');
        } else {
            windSpeedButton.innerHTML = 'Low Wind';
            console.log('Low Wind condition met');
        }



    } catch (error) {
        console.error('Fetch error:', error.message);
    }
}

document.getElementById('submit').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    getWeather(city);
});

getWeather("Delhi");

const cities = ['Delhi', 'Bengaluru', 'New York', 'Tokyo'];

const fetchWeather = async (city) => {
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a173513e32msh17726ed826d53c8p179137jsnb02f328154f6',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Fetch error:', error.message);
        return null;
    }
}

const updateTable = async () => {
    for (let city of cities) {
        const weatherData = await fetchWeather(city);
        if (weatherData) {
            document.getElementById(`${city.toLowerCase().replace(' ', '_')}_temp`).textContent = `${weatherData.temp}°C`;
            document.getElementById(`${city.toLowerCase().replace(' ', '_')}_feels_like`).textContent = `${weatherData.feels_like}°C`;
            document.getElementById(`${city.toLowerCase().replace(' ', '_')}_humidity`).textContent = `${weatherData.humidity}%`;
            document.getElementById(`${city.toLowerCase().replace(' ', '_')}_max_temp`).textContent = `${weatherData.max_temp}°C`;
            document.getElementById(`${city.toLowerCase().replace(' ', '_')}_min_temp`).textContent = `${weatherData.min_temp}°C`;
            document.getElementById(`${city.toLowerCase().replace(' ', '_')}_cloud`).textContent = `${weatherData.cloud_pct}%`;
            document.getElementById(`${city.toLowerCase().replace(' ', '_')}_wind_speed`).textContent = `${weatherData.wind_speed} m/s`;
            document.getElementById(`${city.toLowerCase().replace(' ', '_')}_wind_degrees`).textContent = `${weatherData.wind_degrees}°`;
            document.getElementById(`${city.toLowerCase().replace(' ', '_')}_sunrise`).textContent = `${weatherData.sunrise}`;
            document.getElementById(`${city.toLowerCase().replace(' ', '_')}_sunset`).textContent = `${weatherData.sunset}`;
        }
    }
}

updateTable();
