// src/components/dashboard/WindowCards.tsx
'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface WindowCardsProps {
  title: string;
  timeWindow: string;
  score: number;
  variant: 'primary' | 'secondary';
}

export default function WindowCards({ title, timeWindow, score, variant }: WindowCardsProps) {
  const isPrimary = variant === 'primary';
  return (
    <Card className={`relative overflow-hidden border transition-transform duration-200 hover:scale-[1.01] ${isPrimary ? 'bg-emerald-600 border-emerald-700 text-white shadow-lg' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
      <CardContent className="p-5 flex justify-between items-center">
        <div className="space-y-1">
          <p className={`text-xs font-black tracking-widest uppercase ${isPrimary ? 'text-emerald-100' : 'text-slate-400'}`}>{title}</p>
          <p className="text-xl font-bold tracking-tight">{timeWindow}</p>
        </div>
        <div className={`px-3 py-2 rounded-xl text-center min-w-[52px] ${isPrimary ? 'bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'}`}>
          <span className="block text-lg font-black leading-none">{score}</span>
          <span className="text-[9px] uppercase tracking-tighter opacity-60 font-bold">Index</span>
        </div>
      </CardContent>
    </Card>
  );
}