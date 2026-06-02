// src/components/dashboard/ScoreDisplay.tsx
'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface BulletItem {
  status: 'success' | 'warning' | 'error';
  text: string;
}

interface ScoreDisplayProps {
  score: number;
  verdict: string;
  headline: string;
  bullets: BulletItem[];
}

export default function ScoreDisplay({ score, verdict, headline, bullets }: ScoreDisplayProps) {
  return (
    <Card className="overflow-hidden border-2 border-emerald-500/20 dark:border-emerald-400/10 shadow-xl bg-white dark:bg-slate-900">
      <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-8">
        <div className="relative flex items-center justify-center w-40 h-40 shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" fill="transparent" />
            <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" className="text-emerald-500 dark:text-emerald-400" fill="transparent"
                    strokeDasharray={263.8} strokeDashoffset={263.8 - (263.8 * score) / 100} strokeLinecap="round" />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">{score}</span>
            <span className="text-xs uppercase font-bold tracking-widest text-slate-400">Score</span>
          </div>
        </div>

        <div className="space-y-3 w-full">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
            {verdict}
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">{headline}</h2>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span className={`w-2 h-2 rounded-full ${bullet.status === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                {bullet.text}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}