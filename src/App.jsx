import React from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = React.useState('');
  const [weatherInfo, setWeatherInfo] = React.useState(null);

  const getWeather = () => {
    const apiKey = process.env.PUBLIC_WEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const MT = Math.round(data.main.temp);
        const FL = Math.round(data.main.feels_like);

        const weatherData = {
          location: `Weather in ${data.name}`,
          temperature: `Temperature: ${MT}°C`,
          feelsLike: `Feels like: ${FL}°C`,
          humidity: `Humidity: ${data.main.humidity}%`,
          wind: `Wind Speed: ${data.wind.speed} m/s`,
          condition: `Weather condition: ${data.weather[0].description}`,
        };

        setWeatherInfo(weatherData);
      });
  };

  return (
    <div className="weather-container">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a city"
      />
      <button type="button" onClick={getWeather}>
        Get Weather
      </button>
      {weatherInfo && (
        <div className="weather-info">
          <h3>{weatherInfo.location}</h3>
          <p>{weatherInfo.temperature}</p>
          <p>{weatherInfo.feelsLike}</p>
          <p>{weatherInfo.humidity}</p>
          <p>{weatherInfo.wind}</p>
          <p>{weatherInfo.condition}</p>
        </div>
      )}
    </div>
  );
};

export default App;
