import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import AirQuality from './AirQuality';
import Skeleton from './Skeleton';
import { Activity } from 'lucide-react';

const HealthMetrics = () => {
  const { loading, airQualityData } = useContext(WeatherContext);

  if (loading && !airQualityData) return <Skeleton className="h-48" />;

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="w-6 h-6 text-pink-400" />
        <h2 className="text-xl font-semibold">Health & Air Quality</h2>
      </div>
      <AirQuality />
    </div>
  );
};

export default HealthMetrics;
