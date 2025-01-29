import { createSlice } from '@reduxjs/toolkit';
import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  FETCH_FORECAST_SUCCESS,
  TOGGLE_UNIT,
  ADD_TO_HISTORY
} from '../actions/weatherActions';

const initialState = {
  loading: false,
  current: null,
  forecast: null,
  unit: 'metric',
  history: JSON.parse(localStorage.getItem('searchHistory')) || [],
  error: null
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
    },
    addToHistory: (state, action) => {
      const newHistory = [action.payload, ...state.history.filter(c => c !== action.payload)].slice(0, 5);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      state.history = newHistory;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(FETCH_WEATHER_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_WEATHER_SUCCESS, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(FETCH_FORECAST_SUCCESS, (state, action) => {
        state.forecast = action.payload;
      })
      .addCase(FETCH_WEATHER_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { toggleUnit, addToHistory } = weatherSlice.actions;
export default weatherSlice.reducer;