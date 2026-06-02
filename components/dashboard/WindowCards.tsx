'use client';

import React from 'react';

interface Window {
  day: string;
  timeSlot: string;
  status: 'Excellent' | 'Good' | 'Poor';
  score: number;
  reason: string;
}

interface WindowCardsProps {
  windows: Window[];
}

export default function WindowCards({ windows }: WindowCardsProps) {
  // Helper to determine background colors based on mowing status
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Excellent':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800 tag-bg-emerald-600';
      case 'Good':
        return 'bg-amber-50 border-amber-200 text-amber-800 tag-bg-amber-500';
      default:
        return 'bg-rose-50 border-rose-200 text-rose-800 tag-bg-rose-500';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
        <span>⏱️</span> Best Upcoming Mowing Windows
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {windows.slice(0, 3).map((window, index) => {
          const styles = getStatusStyles(window.status);
          const badgeColor = window.status === 'Excellent' ? 'bg-emerald-600' : window.status === 'Good' ? 'bg-amber-500' : 'bg-rose-500';
          
          return (
            <div 
              key={index} 
              className={`rounded-2xl border p-5 shadow-sm bg-white flex flex-col justify-between transition-all hover:shadow-md`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">{window.day}</h4>
                    <p className="text-xs text-slate-500 font-medium">{window.timeSlot}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${badgeColor}`}>
                    {window.status} ({window.score}/100)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{window.reason}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}