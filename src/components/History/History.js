import React from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from '../../redux/actions/weatherActions';
import './History.css';

const History = ({ history, fetchWeather }) => {
  if (!history.length) return null;

  return (
    <div className="history">
      <h4>Recent Searches:</h4>
      <div className="history-items">
        {history.map((city, index) => (
          <button
            key={index}
            className="history-item"
            onClick={() => fetchWeather(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  history: state.weather.history
});

export default connect(mapStateToProps, { fetchWeather })(History);