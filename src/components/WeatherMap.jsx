import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import Skeleton from './Skeleton';
import { Map } from 'lucide-react';

const WeatherMap = () => {
  const { weatherData, loading, unit } = useContext(WeatherContext);

  if (loading && !weatherData) return <Skeleton className="h-[400px]" />;
  if (!weatherData) return null;

  const { lat, lon } = weatherData.coord;
  const tempUnit = unit === 'metric' ? '%C2%B0C' : '%C2%B0F';
  const windUnit = unit === 'metric' ? 'km%2Fh' : 'mph';

  return (
    <div className="glass-panel p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <Map className="w-6 h-6 text-emerald-400" />
        <h2 className="text-xl font-semibold">Live Global Radar</h2>
      </div>
      <div className="rounded-xl overflow-hidden w-full h-[450px] border border-white/10 relative shadow-inner">
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=${tempUnit}&metricWind=${windUnit}&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}`}
          frameBorder="0"
          className="absolute inset-0 saturate-150 contrast-125 hover:brightness-110 transition-all duration-700"
        ></iframe>
      </div>
    </div>
  );
};

export default WeatherMap;
