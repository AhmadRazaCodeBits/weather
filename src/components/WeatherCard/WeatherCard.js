import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ current, unit }) => {
  if (!current) return null;

  return (
    <div className="weather-card">
      <h2>
        {current.name}, {current.sys.country}
        <span className="unit">{unit === 'metric' ? '°C' : '°F'}</span>
      </h2>
      <div className="current-weather">
        <img
          src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
          alt={current.weather[0].description}
        />
        <div className="temperature">
          {Math.round(current.main.temp)}°
          <span>{unit === 'metric' ? 'C' : 'F'}</span>
        </div>
        <div className="details">
          <p>Feels like {Math.round(current.main.feels_like)}°</p>
          <p>Humidity: {current.main.humidity}%</p>
          <p>Wind: {current.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;