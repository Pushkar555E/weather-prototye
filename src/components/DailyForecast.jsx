import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { Cloud, CloudRain, Sun, CloudLightning, Snowflake, Wind, Moon, Calendar } from 'lucide-react';
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

const DailyForecast = () => {
  const { forecastData, loading } = useContext(WeatherContext);

  if (loading && !forecastData) return <Skeleton className="h-48" />;
  if (!forecastData) return null;

  // Group forecast by day
  const dailyData = [];
  const processedDays = new Set();

  for (let item of forecastData.list) {
    const date = new Date(item.dt * 1000);
    const dayString = date.toLocaleDateString();
    
    // Pick the first item of each new day as the representative for that day (usually daytime if offset aligns)
    if (!processedDays.has(dayString)) {
      dailyData.push(item);
      processedDays.add(dayString);
    }
    if (dailyData.length >= 5) break; // 5 Day limit
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-semibold">5-Day Forecast</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyData.map((item, i) => {
          const date = new Date(item.dt * 1000);
          const dayName = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
          const temp = Math.round(item.main.temp);
          const main = item.weather[0].main;

          return (
            <div key={i} className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg transition-all">
              <span className="text-sm font-bold text-white/90 mb-3 uppercase tracking-wider">{dayName}</span>
              {getWeatherIcon(main, item.weather[0].icon, "w-8 h-8 mb-3 text-white/80")}
              <span className="text-xl font-bold">{temp}&deg;</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
