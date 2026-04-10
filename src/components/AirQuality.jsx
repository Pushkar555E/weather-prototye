import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import Skeleton from './Skeleton';

const getAQIDetails = (aqi) => {
  switch (aqi) {
    case 1: return { label: 'Good', color: 'bg-green-500' };
    case 2: return { label: 'Fair', color: 'bg-yellow-400' };
    case 3: return { label: 'Moderate', color: 'bg-orange-500' };
    case 4: return { label: 'Poor', color: 'bg-red-500' };
    case 5: return { label: 'Very Poor', color: 'bg-purple-600' };
    default: return { label: 'Unknown', color: 'bg-gray-500' };
  }
};

const AirQuality = () => {
  const { airQualityData, loading } = useContext(WeatherContext);

  if (loading && !airQualityData) return null;
  if (!airQualityData) return null;

  const aqi = airQualityData.list[0].main.aqi;
  const components = airQualityData.list[0].components;
  const { label, color } = getAQIDetails(aqi);

  return (
    <div className="mt-2">
      <div className="mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-white/80">Air Quality Index</span>
          <div className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${color}`}>
            Level {aqi} - {label}
          </div>
        </div>
        <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden drop-shadow-sm">
          <div 
            className={`h-full rounded-full ${color} transition-all duration-1000`} 
            style={{ width: `${(aqi / 5) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-white/40 mt-1 font-semibold px-1">
          <span>Good</span>
          <span>Hazardous</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-white/60 text-xs mb-1">PM2.5</div>
          <div className="font-bold">{components.pm2_5} <span className="text-xs font-normal">µg/m³</span></div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-white/60 text-xs mb-1">PM10</div>
          <div className="font-bold">{components.pm10} <span className="text-xs font-normal">µg/m³</span></div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-white/60 text-xs mb-1">SO2</div>
          <div className="font-bold">{components.so2} <span className="text-xs font-normal">µg/m³</span></div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-white/60 text-xs mb-1">NO2</div>
          <div className="font-bold">{components.no2} <span className="text-xs font-normal">µg/m³</span></div>
        </div>
      </div>
    </div>
  );
};

export default AirQuality;
