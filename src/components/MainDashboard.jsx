import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import ExtraDetails from './ExtraDetails';
import Skeleton from './Skeleton';

const MainDashboard = () => {
  const { loading, unit, toggleUnit, weatherData } = useContext(WeatherContext);

  if (loading && !weatherData) return <Skeleton className="h-64" />;

  const getOutfitSuggestion = () => {
    if (!weatherData) return "";
    const temp = weatherData.main.temp;
    const isMetric = unit === 'metric';
    const tempC = isMetric ? temp : (temp - 32) * 5/9;
    const main = weatherData.weather[0].main.toLowerCase();

    let suggestion = "";
    if (tempC < 5) suggestion = "Heavy winter coat, gloves, and a scarf.";
    else if (tempC < 15) suggestion = "A warm jacket or sweater.";
    else if (tempC < 25) suggestion = "Light layers, like a t-shirt and a light jacket.";
    else suggestion = "Breathable summer clothes, shorts, and sunglasses!";

    if (main.includes('rain') || main.includes('drizzle')) suggestion += " Don't forget an umbrella! ☔";
    else if (main.includes('snow')) suggestion += " Wear snow boots! ❄️";
    else if (main.includes('clear') && tempC > 20) suggestion += " Don't forget sunscreen! ☀️";

    return suggestion;
  };

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
      
      {weatherData && (
        <div className="mb-6 bg-indigo-500/20 border border-indigo-400/30 rounded-xl p-3 flex items-center gap-3 animate-fadeUp">
          <span className="text-2xl">🤖</span>
          <div>
            <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-0.5">Smart Suggestion</div>
            <div className="text-sm font-medium">{getOutfitSuggestion()}</div>
          </div>
        </div>
      )}
      
      <ExtraDetails />
    </div>
  );
};

export default MainDashboard;
