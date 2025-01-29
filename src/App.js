import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchWeatherByCoords } from './redux/actions/weatherActions';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherCard from './components/WeatherCard/WeatherCard';
import Forecast from './components/Forecast/Forecast';
import History from './components/History/History';
import Loader from './components/Loader/Loader';
import './App.css';

const App = ({ 
  current, 
  forecast, 
  loading, 
  error, 
  unit, 
  history, 
  fetchWeatherByCoords 
}) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => fetchWeatherByCoords(position.coords.latitude, position.coords.longitude),
      () => fetchWeatherByCoords(51.5074, -0.1278) // Default to London
    );
  }, [fetchWeatherByCoords]);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <SearchBar />
        
        {loading && <Loader />}
        {error && <div className="error-message">{error}</div>}

        <div className="weather-display">
          {current && <WeatherCard current={current} unit={unit} />}
          {forecast && <Forecast forecast={forecast} unit={unit} />}
        </div>

        <History history={history} />
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  current: state.weather.current,
  forecast: state.weather.forecast,
  loading: state.weather.loading,
  error: state.weather.error,
  unit: state.weather.unit,
  history: state.weather.history
});

export default connect(mapStateToProps, { fetchWeatherByCoords })(App);