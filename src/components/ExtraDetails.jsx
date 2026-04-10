import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { Wind, Droplets, Thermometer, Eye, Gauge, Sunrise, Sunset } from 'lucide-react';
import Skeleton from './Skeleton';

const DetailCard = ({ icon, title, value, subValue, iconColor }) => (
  <div className="bg-white/5 rounded-xl border border-white/10 p-4 hover:bg-white/10 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl transition-all duration-300 cursor-default group">
    <div className="flex items-center gap-2 text-white/80 mb-2 font-semibold">
      <div className={`${iconColor || 'text-white/70'} group-hover:scale-110 transition-transform`}>{icon}</div>
      <span className="text-sm font-medium tracking-wide">{title}</span>
    </div>
    <div className="flex items-end gap-2">
      <span className="text-3xl font-bold drop-shadow-sm">{value}</span>
      {subValue && <span className="text-sm text-white/70 mb-1 font-medium">{subValue}</span>}
    </div>
  </div>
);

const ExtraDetails = () => {
  const { weatherData, unit, loading } = useContext(WeatherContext);

  if (loading && !weatherData) return null;
  if (!weatherData) return null;

  const { main, wind, visibility, sys } = weatherData;
  const speedUnit = unit === 'metric' ? 'km/h' : 'mph';
  // convert m/s to km/h if metric, otherwise wind is mph if imperial
  const windSpeed = unit === 'metric' ? Math.round(wind.speed * 3.6) : Math.round(wind.speed);
  const v = Math.round(visibility / 1000); 

  const formatTime = (ts) => {
    return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      <DetailCard 
        icon={<Wind size={20}/>} 
        iconColor="text-teal-400"
        title="Wind Status" 
        value={windSpeed} 
        subValue={speedUnit} 
      />
      <DetailCard 
        icon={<Droplets size={20}/>} 
        iconColor="text-blue-400"
        title="Humidity" 
        value={`${main.humidity}%`} 
      />
      <DetailCard 
        icon={<Eye size={20}/>} 
        iconColor="text-purple-400"
        title="Visibility" 
        value={v} 
        subValue="km" 
      />
      <DetailCard 
        icon={<Thermometer size={20}/>} 
        iconColor="text-orange-400"
        title="Feels Like" 
        value={`${Math.round(main.feels_like)}°`} 
      />
      <DetailCard 
        icon={<Gauge size={20}/>} 
        iconColor="text-indigo-400"
        title="Pressure" 
        value={main.pressure} 
        subValue="hPa" 
      />
      <DetailCard 
        icon={<Sunrise size={20}/>} 
        iconColor="text-yellow-400"
        title="Sunrise & Sunset" 
        value={formatTime(sys.sunrise)} 
        subValue={`/ ${formatTime(sys.sunset)}`} 
      />
    </div>
  );
};

export default ExtraDetails;
