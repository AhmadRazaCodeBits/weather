import axios from 'axios';
import { addToHistory } from '../reducers/weatherReducer'; // Add this import

export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
export const FETCH_FORECAST_SUCCESS = 'FETCH_FORECAST_SUCCESS';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = (city) => async (dispatch) => {
  dispatch({ type: FETCH_WEATHER_REQUEST });
  try {
    const [weatherRes, forecastRes] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, {
        params: { q: city, appid: API_KEY, units: 'metric' }
      }),
      axios.get(`${BASE_URL}/forecast`, {
        params: { q: city, appid: API_KEY, units: 'metric' }
      })
    ]);

    dispatch({ type: FETCH_WEATHER_SUCCESS, payload: weatherRes.data });
    dispatch({ type: FETCH_FORECAST_SUCCESS, payload: forecastRes.data });
    dispatch(addToHistory(city)); // Now properly referenced
  } catch (error) {
    dispatch({
      type: FETCH_WEATHER_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch weather data'
    });
  }
};

// Rest of the file remains the same...

export const fetchWeatherByCoords = (lat, lon) => async (dispatch) => {
  dispatch({ type: FETCH_WEATHER_REQUEST });
  try {
    const [weatherRes, forecastRes] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, {
        params: { lat, lon, appid: API_KEY, units: 'metric' }
      }),
      axios.get(`${BASE_URL}/forecast`, {
        params: { lat, lon, appid: API_KEY, units: 'metric' }
      })
    ]);

    dispatch({ type: FETCH_WEATHER_SUCCESS, payload: weatherRes.data });
    dispatch({ type: FETCH_FORECAST_SUCCESS, payload: forecastRes.data });
  } catch (error) {
    dispatch({
      type: FETCH_WEATHER_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch weather data'
    });
  }
};