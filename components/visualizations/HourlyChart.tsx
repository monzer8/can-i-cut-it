'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HourlyChartProps {
  data: Array<{
    time: string;
    score: number;
    temp: number;
    wind: number;
  }>;
}

export default function HourlyChart({ data }: HourlyChartProps) {
  // Simple formatting for the pop-up box when you hover over the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg text-xs shadow-md border border-slate-700">
          <p className="font-bold mb-1">{payload[0].payload.time}</p>
          <p className="text-emerald-400">Mowing Score: {payload[0].value}/100</p>
          <p className="text-sky-300">Temp: {payload[0].payload.temp}°F</p>
          <p className="text-slate-300">Wind: {payload[0].payload.wind} mph</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-72 min-h-[280px] bg-slate-50 rounded-xl p-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#94a3b8" 
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            domain={[0, 100]} 
            stroke="#94a3b8" 
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickCount={6}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="score" 
            stroke="#10b981" 
            strokeWidth={2.5}
            fillOpacity={1} 
            fill="url(#colorScore)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}