import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './reducers/weatherReducer';

const store = configureStore({
  reducer: {
    weather: weatherReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;