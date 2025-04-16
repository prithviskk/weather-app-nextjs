'use client';

import { useState, ChangeEvent } from 'react';

type WeatherData = {
  city: string;
  temperature: number;
  description: string;
  icon: string;
};

const HomePage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
        setError('');
      } else {
        setWeather(null);
        setError(data.message || 'Error occurred');
      }
    } catch (err) {
      setWeather(null);
      setError('Something went wrong!');
    }
  };

  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🌤️ Weather Checker</h1>
      <input
        className="border p-2 rounded mb-2"
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={handleCityChange}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={fetchWeather}
      >
        Get Weather
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weather && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold">{weather.city}</h2>
          <p className="text-lg">🌡️ {weather.temperature}°C</p>
          <p className="capitalize">{weather.description}</p>
          <img src={weather.icon} alt="weather icon" />
        </div>
      )}
    </main>
  );
};

export default HomePage;
