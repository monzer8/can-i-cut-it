// src/components/visualizations/HourlyChart.tsx
'use client';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface HourlyData {
  hour: string;
  score: number;
  temp: number;
  rainProb: number;
}

export default function HourlyChart({ data }: { data: HourlyData[] }) {
  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-black uppercase tracking-wider text-slate-400">📈 HOURLY RISK CONDITIONS (NEXT 24H)</CardTitle>
      </CardHeader>
      <CardContent className="h-[260px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: -10, left: -20, bottom: 0 }}>
            <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
            <YAxis yAxisId="right" stroke="#38bdf8" orientation="right" fontSize={11} domain={[0, 100]} visible={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', paddingTop: '10px' }} />
            <Bar yAxisId="right" dataKey="rainProb" name="Rain Risk %" fill="#38bdf8" fillOpacity={0.15} radius={[4, 4, 0, 0]} barSize={24} />
            <Line yAxisId="left" type="monotone" dataKey="score" name="Mow Index" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line yAxisId="left" type="monotone" dataKey="temp" name="Temp (°C)" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="4 4" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}