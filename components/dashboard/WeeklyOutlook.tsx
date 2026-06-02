'use client';

import React from 'react';

interface DayForecast {
  day: string;
  date: string;
  score: number;
  rating: 'Excellent' | 'Good' | 'Poor';
  conditions: string;
}

interface WeeklyOutlookProps {
  forecast: DayForecast[];
}

export default function WeeklyOutlook({ forecast }: WeeklyOutlookProps) {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Excellent':
        return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'Good':
        return 'text-amber-600 bg-amber-50 border-amber-100';
      default:
        return 'text-rose-600 bg-rose-50 border-rose-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
        <span>📅</span> 7-Day Longitudinal Outlook
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecast.map((day, index) => (
          <div 
            key={index} 
            className="border border-slate-100 rounded-xl p-3 text-center bg-slate-50/50 flex flex-col justify-between h-36"
          >
            <div>
              <p className="text-xs font-bold text-slate-700">{day.day}</p>
              <p className="text-[10px] text-slate-400 font-medium mb-2">{day.date}</p>
            </div>
            
            <div className="my-2">
              <span className="text-2xl font-black tracking-tight text-slate-800">
                {day.score}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold block/2">/100</span>
            </div>

            <div className={`text-[10px] font-bold py-1 rounded-md border ${getRatingColor(day.rating)}`}>
              {day.rating}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}