import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { Cloud, CloudRain, Sun, CloudLightning, Snowflake, Wind, Moon } from 'lucide-react';
import Skeleton from './Skeleton';

const getWeatherIcon = (main, icon, className) => {
  const p = main.toLowerCase();
  const isNight = icon && icon.endsWith('n');
  if (p.includes('clear')) return isNight ? <Moon className={className} /> : <Sun className={className} />;
  if (p.includes('cloud')) return <Cloud className={className} />;
  if (p.includes('rain') || p.includes('drizzle')) return <CloudRain className={className} />;
  if (p.includes('thunderstorm')) return <CloudLightning className={className} />;
  if (p.includes('snow')) return <Snowflake className={className} />;
  return <Wind className={className} />;
};

const CurrentWeather = ({ weatherData }) => {
  const { unit } = useContext(WeatherContext);
  
  if (!weatherData) return <Skeleton className="h-64" />;

  const temp = Math.round(weatherData.main.temp);
  const desc = weatherData.weather[0].description;
  const main = weatherData.weather[0].main;
  const icon = weatherData.weather[0].icon;

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center flex-1">
      {getWeatherIcon(main, icon, "w-32 h-32 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-float")}
      
      <div className="text-7xl font-bold tracking-tighter mb-2 animate-pulseGlow">
        {temp}&deg;{unit === 'metric' ? 'C' : 'F'}
      </div>
      
      <div className="text-xl capitalize text-white/90 font-medium tracking-wide">
        {desc}
      </div>
    </div>
  );
};

export default CurrentWeather;
