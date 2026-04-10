import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { Cloud, CloudRain, Sun, CloudLightning, Snowflake, Wind, Moon } from 'lucide-react';
import Skeleton from './Skeleton';

const getWeatherIcon = (main, iconCode, className) => {
  const p = main.toLowerCase();
  const isNight = iconCode && iconCode.endsWith('n');
  if (p.includes('clear')) return isNight ? <Moon className={className} /> : <Sun className={className} />;
  if (p.includes('cloud')) return <Cloud className={className} />;
  if (p.includes('rain') || p.includes('drizzle')) return <CloudRain className={className} />;
  if (p.includes('thunderstorm')) return <CloudLightning className={className} />;
  if (p.includes('snow')) return <Snowflake className={className} />;
  return <Wind className={className} />;
};

const HourlyForecast = () => {
  const { forecastData, loading } = useContext(WeatherContext);

  if (loading && !forecastData) return <Skeleton className="h-48" />;
  if (!forecastData) return null;

  // Get next 8 items (24 hours approx)
  const items = forecastData.list.slice(0, 8);

  return (
    <div className="glass-panel p-6">
      <h2 className="text-xl font-semibold mb-6">Upcoming Forecast</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
        {items.map((item, i) => {
          const date = new Date(item.dt * 1000);
          const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const temp = Math.round(item.main.temp);
          const main = item.weather[0].main;

          return (
            <div key={i} className="min-w-[100px] flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all">
              <span className="text-sm text-white/80 mb-3">{time}</span>
              {getWeatherIcon(main, item.weather[0].icon, "w-8 h-8 mb-3")}
              <span className="text-lg font-bold">{temp}&deg;</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
