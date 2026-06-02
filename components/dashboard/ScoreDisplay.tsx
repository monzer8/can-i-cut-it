'use client';

import React from 'react';

interface ScoreDisplayProps {
  score: number;
  rating: string;
  location: string;
}

export default function ScoreDisplay({ score, rating, location }: ScoreDisplayProps) {
  // Determine dynamic accent colors based on the mowing score value
  const getScoreColor = (scoreValue: number) => {
    if (scoreValue >= 80) return { text: 'text-emerald-600', border: 'border-emerald-200', bg: 'bg-emerald-50' };
    if (scoreValue >= 50) return { text: 'text-amber-600', border: 'border-amber-200', bg: 'bg-amber-50' };
    return { text: 'text-rose-600', border: 'border-rose-200', bg: 'bg-rose-50' };
  };

  const colors = getScoreColor(score);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Meta Text Context */}
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Live Analysis
          </span>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight mt-1">
            {location || 'Current Location'}
          </h2>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
            Our turf algorithms have calculated your local grass growth cycles against active atmospheric moisture, wind patterns, and precipitation data.
          </p>
        </div>

        {/* Right Side: Visual Circular Data Widget */}
        <div className={`flex items-center gap-5 border p-4 rounded-xl px-6 ${colors.bg} ${colors.border}`}>
          <div className="relative flex items-center justify-center">
            {/* Simple Circular Ring Layout */}
            <div className="w-16 h-16 rounded-full border-4 border-slate-200 absolute"></div>
            <div className={`w-16 h-16 rounded-full border-4 border-t-current border-r-current rotate-45 absolute ${colors.text}`}></div>
            <span className="text-xl font-black text-slate-800 z-10">{score}</span>
          </div>
          
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mowing Index</div>
            <div className={`text-xl font-extrabold tracking-tight ${colors.text}`}>
              {rating}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}