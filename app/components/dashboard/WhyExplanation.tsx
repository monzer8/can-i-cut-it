// src/components/dashboard/WhyExplanation.tsx
'use client';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface WhyExplanationProps {
  text: string;
  subScores: { dryness: number; weather: number; safety: number; convenience: number };
}

export default function WhyExplanation({ text, subScores }: WhyExplanationProps) {
  return (
    <Card className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
          📋 WHY IS MY SCORE THIS?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
          "{text}"
        </p>
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {Object.entries(subScores).map(([key, val]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 capitalize">
                <span>{key} Analysis</span>
                <span>{val}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}