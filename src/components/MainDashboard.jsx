import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import ExtraDetails from './ExtraDetails';
import Skeleton from './Skeleton';

const MainDashboard = () => {
  const { loading, unit, toggleUnit, weatherData } = useContext(WeatherContext);

  if (loading && !weatherData) return <Skeleton className="h-64" />;

  return (
    <div className="glass-panel p-6 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-wide">Today's Highlights</h2>
        <div className="flex bg-black/20 p-1 rounded-full border border-white/10">
          <button 
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${unit === 'metric' ? 'bg-white text-black shadow-sm' : 'text-white hover:bg-white/10'}`}
            onClick={() => unit !== 'metric' && toggleUnit()}
          >
            &deg;C, km/h
          </button>
          <button 
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${unit === 'imperial' ? 'bg-white text-black shadow-sm' : 'text-white hover:bg-white/10'}`}
            onClick={() => unit !== 'imperial' && toggleUnit()}
          >
            &deg;F, mph
          </button>
        </div>
      </div>
      
      <ExtraDetails />
    </div>
  );
};

export default MainDashboard;
