'use client';

import React, { useState, useEffect } from 'react';
import ScoreDisplay from '../components/dashboard/ScoreDisplay';
import WindowCards from '../components/dashboard/WindowCards';
import WhyExplanation from '../components/dashboard/WhyExplanation';
import WeeklyOutlook from '../components/dashboard/WeeklyOutlook';
import HourlyChart from '../components/visualizations/HourlyChart';
import { calculateMowingScore } from '../lib/weather-engine';

export default function Home() {
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode || zipCode.length !== 5) {
      setError('Please enter a valid 5-digit ZIP code.');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      // Calls the internal Vercel/Next.js API route to fetch data securely
      const response = await fetch(`/api/weather?zip=${zipCode}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data for this ZIP code.');
      }

      const data = await response.json();
      
      // Processes the raw API data through our mathematical scoring engine
      const processedData = calculateMowingScore(data);
      setWeatherData(processedData);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Header Bar */}
      <header className="bg-emerald-700 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌱</span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Can I Cut It?</h1>
              <p className="text-xs text-emerald-100 font-medium">The Smart Lawn Care Forecast Dashboard</p>
            </div>
          </div>
          
          {/* Search Input Form */}
          <form onSubmit={handleSearch} className="flex w-full sm:w-auto shadow-inner bg-white/10 rounded-lg p-1 border border-white/20">
            <input
              type="text"
              placeholder="Enter ZIP Code..."
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
              className="px-4 py-2 bg-transparent text-white placeholder-emerald-200 focus:outline-none text-sm w-full sm:w-40"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-emerald-800 font-semibold px-5 py-2 rounded-md hover:bg-emerald-50 transition-colors text-sm disabled:opacity-50 whitespace-nowrap shadow"
            >
              {loading ? 'Checking...' : 'Check Lawn'}
            </button>
          </form>
        </div>
      </header>

      {/* Dynamic Content Body */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* State A: Initial Blank/Welcome View */}
        {!weatherData && !loading && !error && (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🚜</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Is Today a Good Mowing Day?</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Enter your zip code above. Our specialized turf engine analyzes real-time rain history, grass growth speeds, moisture levels, and hourly wind thresholds to map your perfect cutting windows.
            </p>
          </div>
        )}

        {/* State B: Loading Indicator Skeleton */}
        {loading && (
          <div className="space-y-6 animate-pulse">
            <div className="h-64 bg-slate-200 rounded-2xl w-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-32 bg-slate-200 rounded-xl" />
              <div className="h-32 bg-slate-200 rounded-xl" />
              <div className="h-32 bg-slate-200 rounded-xl" />
            </div>
          </div>
        )}

        {/* State C: Error Banner Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl max-w-xl mx-auto flex items-start gap-3 shadow-sm">
            <span className="text-xl mt-0.5">⚠️</span>
            <div>
              <h4 className="font-bold text-sm">Deployment Check Failed</h4>
              <p className="text-xs text-red-600 mt-1 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* State D: Fully Configured Data Visualizer Grid */}
        {weatherData && !loading && (
          <div className="space-y-8">
            {/* Row 1: The Main Score Circle Widget */}
            <ScoreDisplay score={weatherData.currentScore} rating={weatherData.currentRating} location={weatherData.locationName} />

            {/* Row 2: Optimization Windows Grid */}
            <WindowCards windows={weatherData.mowingWindows} />

            {/* Row 3: Behavioral Logic Engine Breakdown / Chart Analysis Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <WhyExplanation matrix={weatherData.scoreReasoningMatrix} />
              </div>
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
                  <span>📊</span> 24-Hour Optimization Timeline
                </h3>
                <HourlyChart data={weatherData.hourlyScoresTimeline} />
              </div>
            </div>

            {/* Row 4: Longitudinal 7-Day Matrix Overview */}
            <WeeklyOutlook forecast={weatherData.weeklyMowingForecast} />
          </div>
        )}
      </div>

      {/* Simple Footer */}
      <footer className="text-center text-xs text-slate-400 py-12 border-t border-slate-200 mt-20">
        <p>© 2026 Can I Cut It? • System utilizing zero-cost standard performance architecture.</p>
      </footer>
    </main>
  );
}