import React from 'react';
import { format, parseISO } from 'date-fns';
import './Forecast.css';

const Forecast = ({ forecast, unit }) => {
  if (!forecast) return null;

  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = format(parseISO(item.dt_txt), 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {Object.entries(dailyForecast).slice(0, 5).map(([date, items]) => {
          const temps = items.map(item => item.main.temp);
          return (
            <div key={date} className="forecast-day">
              <div>{format(parseISO(date), 'EEE')}</div>
              <img
                src={`https://openweathermap.org/img/wn/${items[Math.floor(items.length/2)].weather[0].icon}.png`}
                alt="weather"
              />
              <div className="temps">
                <span className="max">{Math.round(Math.max(...temps))}°</span>
                <span className="min">{Math.round(Math.min(...temps))}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;