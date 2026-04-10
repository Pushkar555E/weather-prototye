import React, { useContext } from 'react';
import { WeatherContext } from './context/WeatherContext';
import Sidebar from './components/Sidebar';
import MainDashboard from './components/MainDashboard';
import HourlyForecast from './components/HourlyForecast';
import HealthMetrics from './components/HealthMetrics';
import WeatherMap from './components/WeatherMap';

function App() {
  const { weatherData } = useContext(WeatherContext);

  // Dynamic background based on weather conditions
  const getBackground = () => {
    if (!weatherData) return 'from-blue-900 via-indigo-900 to-purple-900';
    const main = weatherData.weather[0].main.toLowerCase();
    const icon = weatherData.weather[0].icon;
    const isNight = icon && icon.endsWith('n');
    
    if (main.includes('clear')) return isNight ? 'from-slate-900 via-indigo-950 to-black' : 'from-sky-400 via-blue-500 to-cyan-400';
    if (main.includes('cloud')) return isNight ? 'from-gray-800 via-slate-900 to-black' : 'from-gray-300 via-gray-400 to-gray-500';
    if (main.includes('rain') || main.includes('drizzle')) return isNight ? 'from-slate-900 to-blue-950' : 'from-slate-600 to-slate-800';
    if (main.includes('snow')) return isNight ? 'from-slate-800 to-gray-900' : 'from-blue-100 via-blue-200 to-gray-300';
    if (main.includes('thunderstorm')) return 'from-purple-950 via-slate-950 to-black';
    return isNight ? 'from-indigo-950 to-black' : 'from-blue-600 to-indigo-600';
  };

  return (
    <div className={`min-h-screen bg-[length:400%_400%] bg-gradient-to-br animate-gradient ${getBackground()} transition-colors duration-1000 text-white p-4 md:p-8 flex justify-center`}>
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Search & Current Basic Info */}
        <div className="w-full lg:w-1/3 xl:w-1/4 animate-fadeUp">
          <Sidebar />
        </div>
        
        {/* Right Content - Full Dashboard */}
        <div className="w-full lg:w-2/3 xl:w-3/4 flex flex-col gap-6 animate-fadeUpDelayed">
          <MainDashboard />
          <HourlyForecast />
          <HealthMetrics />
          <WeatherMap />
        </div>
      </div>
    </div>
  );
}

export default App;
