// src/components/dashboard/WeeklyOutlook.tsx
'use client';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface OutlookItem {
  day: string;
  score: number;
  classification: 'EXCELLENT' | 'GOOD' | 'ACCEPTABLE' | 'POOR' | 'DO_NOT_MOW';
}

export default function WeeklyOutlook({ data }: { data: OutlookItem[] }) {
  const getColor = (cls: OutlookItem['classification']) => {
    switch (cls) {
      case 'EXCELLENT': return 'bg-emerald-700 dark:bg-emerald-600';
      case 'GOOD': return 'bg-emerald-500 dark:bg-emerald-500';
      case 'ACCEPTABLE': return 'bg-amber-500';
      case 'POOR': return 'bg-orange-500';
      case 'DO_NOT_MOW': return 'bg-rose-500';
    }
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="text-sm font-black uppercase tracking-wider text-slate-400">📅 7-DAY LAWN OUTLOOK</CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-slate-100 dark:divide-slate-800">
        {data.map((item, idx) => (
          <div key={idx} className="py-3 flex items-center justify-between gap-4">
            <span className="w-24 text-sm font-bold text-slate-700 dark:text-slate-300">{item.day}</span>
            <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden relative flex items-center">
              <div className={`h-full ${getColor(item.classification)} rounded-full`} style={{ width: `${item.score}%` }} />
              <span className="absolute left-3 text-[10px] font-black text-white mix-blend-difference">{item.classification}</span>
            </div>
            <span className="text-sm font-black w-12 text-right">{item.score}%</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}