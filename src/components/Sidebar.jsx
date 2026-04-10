import React, { useContext, useState, useEffect, useRef } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { Search, MapPin, Mic, Heart } from 'lucide-react';
import CurrentWeather from './CurrentWeather';
import Skeleton from './Skeleton';
import axios from 'axios';

const Sidebar = () => {
  const { fetchWeather, fetchWeatherByCoords, loading, error, weatherData, favorites, toggleFavorite, city } = useContext(WeatherContext);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const dropdownRef = useRef(null);
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle clicking outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Handle Input typing and fetching OpenWeatherMap Geocoding API
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    if (value.trim().length > 2) {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
        );
        const unique = res.data.reduce((acc, current) => {
          const x = acc.find(item => item.name === current.name && item.state === current.state && item.country === current.country);
          if (!x) return acc.concat([current]);
          return acc;
        }, []);
        setSuggestions(unique);
        setShowDropdown(true);
      } catch (err) {
        console.error("Failed to fetch autocomplete suggestions", err);
      }
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput);
      setSearchInput('');
      setShowDropdown(false);
    }
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice Search is not supported in this browser.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.replace('.', '');
      setSearchInput(transcript);
      fetchWeather(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
  };

  if (loading && !weatherData) return <Skeleton className="h-full min-h-[500px]" />;

  const isFav = weatherData && favorites.includes(weatherData.name);

  return (
    <div className="glass-panel p-6 h-full flex flex-col gap-6">
      
      {/* Search Bar with Autocomplete Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <form onSubmit={handleSearch} className="flex relative">
          <input
            type="text"
            placeholder="Search any city..."
            value={searchInput}
            onChange={handleInputChange}
            onFocus={() => { if(suggestions.length > 0) setShowDropdown(true); }}
            className="w-full bg-white/10 border border-white/20 rounded-full py-2.5 px-4 pl-11 pr-12 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium shadow-inner"
          />
          <Search className="absolute left-4 top-3 text-white/50 w-5 h-5 pointer-events-none" />
          <button 
            type="button"
            onClick={startVoiceSearch}
            className={`absolute right-3 top-2 p-1 rounded-full transition-all duration-300 ${isListening ? 'bg-red-500 animate-pulse' : 'hover:bg-white/20'}`}
          >
            <Mic className={`w-5 h-5 ${isListening ? 'text-white' : 'text-white/70'}`} />
          </button>
        </form>
        
        {/* Quick Actions & Favorites */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scroll-smooth items-center">
          <button 
            type="button"
            onClick={() => {
              if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                  (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
                  () => alert('Location access denied. Please enable it in your browser settings.')
                );
              } else {
                alert('Geolocation is not supported by your browser.');
              }
            }}
            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 bg-blue-500/20 text-blue-50 border border-blue-400/30 rounded-full hover:bg-blue-500/40 hover:scale-105 transition-all whitespace-nowrap shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5" />
            Locate Me
          </button>

          {favorites.map(fav => (
             <button 
              key={fav} 
              onClick={() => fetchWeather(fav)}
              className="text-xs font-bold px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/20 hover:scale-105 transition-all whitespace-nowrap shadow-sm"
             >
               {fav}
             </button>
          ))}
        </div>

        {/* The Dropdown Options */}
        {showDropdown && suggestions.length > 0 && (
          <div className="absolute top-14 left-0 w-full bg-[#1e293b]/95 backdrop-blur-2xl border border-white/20 rounded-xl max-h-64 overflow-y-auto z-50 shadow-2xl animate-fadeUp">
            {suggestions.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  fetchWeather(`${item.name},${item.country}`);
                  setSearchInput('');
                  setShowDropdown(false);
                }}
                className="px-4 py-3 hover:bg-white/10 cursor-pointer flex justify-between items-center transition-colors border-b border-white/5 last:border-none"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-white drop-shadow-sm">{item.name}</span>
                  {item.state && <span className="text-white/50 text-xs font-medium">{item.state}</span>}
                </div>
                <span className="text-white/70 text-xs font-bold bg-white/10 px-2.5 py-1 rounded-md shadow-sm">
                  {item.country}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {error && <div className="bg-red-500/20 shadow-lg border border-red-500/30 text-red-100 p-3 rounded-lg text-sm text-center font-medium animate-pulse">{error}</div>}

      {!error && weatherData && (
        <>
          <CurrentWeather weatherData={weatherData} />
          <div className="mt-auto pt-6 border-t border-white/20 relative">
            <div className="flex justify-between items-end">
              <div>
                <div className="flex items-center gap-2 text-white/90 font-medium">
                  <MapPin className="w-5 h-5 text-red-400 animate-bounce" />
                  <span className="text-lg tracking-wide">{weatherData.name}, {weatherData.sys.country}</span>
                </div>
                <div className="mt-2 text-4xl font-light tracking-tight text-white/90 drop-shadow-md">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </div>
              </div>
              <button 
                onClick={() => toggleFavorite(weatherData.name)}
                className={`p-3 rounded-full border border-white/10 transition-all duration-300 hover:scale-110 shadow-lg ${isFav ? 'bg-pink-500/20 border-pink-500/50' : 'bg-white/5 hover:bg-white/20'}`}
              >
                <Heart className={`w-6 h-6 transition-colors duration-300 ${isFav ? 'fill-pink-500 text-pink-500' : 'text-white/70'}`} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
