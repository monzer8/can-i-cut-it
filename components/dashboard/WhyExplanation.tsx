'use client';

import React from 'react';

interface MetricDetail {
  value: string | number;
  impact: 'Positive' | 'Neutral' | 'Negative';
  description: string;
}

interface Matrix {
  moisture: MetricDetail;
  wind: MetricDetail;
  precipitation: MetricDetail;
  growth: MetricDetail;
}

interface WhyExplanationProps {
  matrix: Matrix;
}

export default function WhyExplanation({ matrix }: WhyExplanationProps) {
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'Positive':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Negative':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const metricItems = [
    { label: '💧 Leaf Moisture', data: matrix.moisture },
    { label: '💨 Wind Speed', data: matrix.wind },
    { label: '🌧️ Rain History', data: matrix.precipitation },
    { label: '🌱 Growth Rate', data: matrix.growth },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-full flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
          <span>🧠</span> Factor Breakdown Matrix
        </h3>
        
        <div className="space-y-4">
          {metricItems.map((item, index) => (
            <div key={index} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getImpactBadge(item.data.impact)}`}>
                  {item.data.value}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{item.data.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}