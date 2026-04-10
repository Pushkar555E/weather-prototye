import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(() => localStorage.getItem('lastCity') || '');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favCities')) || []);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';

  useEffect(() => {
    // If no city is saved, try to auto-detect location!
    if (!city) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
             fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
          },
          () => {
             // Fallback to a default city if permission denied
             fetchWeather('London');
          }
        );
      } else {
        fetchWeather('London');
      }
    } else {
      fetchWeather(city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]); // Don't re-run on city change automatically, only on unit change or mount

  const fetchWeather = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get Current Weather
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=${unit}&appid=${API_KEY}`
      );
      processAllData(weatherRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      processAllData(weatherRes.data);
    } catch (err) {
      setError('Failed to fetch location data');
      setLoading(false);
    }
  };

  const processAllData = async (currentData) => {
    try {
      setWeatherData(currentData);
      setCity(currentData.name);
      localStorage.setItem('lastCity', currentData.name);

      const { lat, lon } = currentData.coord;

      // 2. Get Forecast
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      setForecastData(forecastRes.data);

      // 3. Get Air Pollution Data
      const aqRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setAirQualityData(aqRes.data);
    } catch (err) {
      setError('Failed to fetch detailed data');
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  const toggleFavorite = (cityName) => {
    let updated;
    if (favorites.includes(cityName)) {
      updated = favorites.filter(c => c !== cityName);
    } else {
      updated = [...favorites, cityName];
    }
    setFavorites(updated);
    localStorage.setItem('favCities', JSON.stringify(updated));
  };

  return (
    <WeatherContext.Provider
      value={{
        city,
        weatherData,
        forecastData,
        airQualityData,
        loading,
        error,
        unit,
        favorites,
        toggleFavorite,
        toggleUnit,
        fetchWeather,
        fetchWeatherByCoords
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
