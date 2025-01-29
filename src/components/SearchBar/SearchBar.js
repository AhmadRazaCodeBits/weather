import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchWeather, fetchWeatherByCoords } from '../../redux/actions/weatherActions';
import './SearchBar.css';

const SearchBar = ({ fetchWeather, fetchWeatherByCoords }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query.trim());
      setQuery('');
    }
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => fetchWeatherByCoords(position.coords.latitude, position.coords.longitude),
      error => alert('Location access denied')
    );
  };

  return (
    <div className="search-container">
      <button className="location-btn" onClick={handleLocation}>
        📍
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city name..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default connect(null, { fetchWeather, fetchWeatherByCoords })(SearchBar);