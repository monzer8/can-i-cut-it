// src/app/page.tsx
import React from 'react';
import { Metadata } from 'next';
import ScoreDisplay from '@/components/dashboard/ScoreDisplay';
import WindowCards from '@/components/dashboard/WindowCards';
import WhyExplanation from '@/components/dashboard/WhyExplanation';
import WeeklyOutlook from '@/components/dashboard/WeeklyOutlook';
import HourlyChart from '@/components/visualizations/HourlyChart';

// Explicitly export configuration items to run on high-performance infrastructure
export const runtime = 'edge';
export const revalidate = 900; // Force cache validation intervals every 15 minutes globally

interface PageProps {
  searchParams: Promise<{ lat?: string; lon?: string; zip?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const locStr = resolvedParams.zip || (resolvedParams.lat ? `${resolvedParams.lat},${resolvedParams.lon}` : 'Your Lawn');
  return {
    title: `Can I Mow Today? Personal Lawn Score for ${locStr}`,
    description: `Instant lawn cutting calculation and hyper-local forecast metrics for ${locStr}. Find your optimal mowing time window instantly.`,
  };
}

// Fallback Mock Function simulating data lookup
async function fetchMowDataEngine(lat: number, lon: number) {
  // Real world implementation imports OpenWeather API layer. 
  // Evaluated parameters mirror real data contracts.
  return {
    score: 87,
    locationName: 'Houston, TX',
    classification: 'GOOD' as const,
    verdict: 'YES — Great Time To Mow',
    headline: 'Conditions are excellent for mowing.',
    plainEnglishExplanation: 'No significant rain has fallen in the last 48 hours. Humidity is moderate, winds are light, and rain probability remains safely low.',
    subScores: { dryness: 92, weather: 85, safety: 80, convenience: 95 },
    bullets: [
      { status: 'success' as const, text: 'Lawn likely dry' },
      { status: 'success' as const, text: 'No significant rain expected' },
      { status: 'success' as const, text: 'Comfortable temperature' },
      { status: 'warning' as const, text: 'UV levels elevated' }
    ],
    windows: {
      bestToday: { timeRange: '6:00 PM – 8:15 PM', score: 94 },
      nextBest: { day: 'Tomorrow', timeRange: '7:00 AM – 9:00 AM', score: 91 }
    },
    weekly: [
      { day: 'Monday', score: 82, classification: 'GOOD' },
      { day: 'Tuesday', score: 94, classification: 'EXCELLENT' },
      { day: 'Wednesday', score: 61, classification: 'ACCEPTABLE' },
      { day: 'Thursday', score: 35, classification: 'DO_NOT_MOW' },
      { day: 'Friday', score: 88, classification: 'GOOD' }
    ],
    hourlyData: [
      { hour: '8 AM', score: 65, temp: 22, rainProb: 10 },
      { hour: '11 AM', score: 78, temp: 26, rainProb: 5 },
      { hour: '2 PM', score: 84, temp: 29, rainProb: 15 },
      { hour: '5 PM', score: 92, temp: 27, rainProb: 0 },
      { hour: '8 PM', score: 89, temp: 24, rainProb: 0 }
    ]
  };
}

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  // Standardize fallbacks natively to Houston if no geographic parameters given
  const targetLat = parseFloat(resolvedParams.lat || '29.7604');
  const targetLon = parseFloat(resolvedParams.lon || '-95.3698');
  
  const payload = await fetchMowDataEngine(targetLat, targetLon);

  return (
    <main className="min-gradient-bg min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">🌱 CAN I CUT IT?</span>
          </div>
          <div className="text-sm font-medium opacity-80">{payload.locationName}</div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ScoreDisplay 
              score={payload.score} 
              verdict={payload.verdict} 
              headline={payload.headline} 
              bullets={payload.bullets} 
            />
          </div>
          <div className="flex flex-col gap-4 justify-between">
            <WindowCards title="BEST TIME TODAY" timeWindow={payload.windows.bestToday.timeRange} score={payload.windows.bestToday.score} variant="primary" />
            <WindowCards title={`NEXT WINDOW: ${payload.windows.nextBest.day.toUpperCase()}`} timeWindow={payload.windows.nextBest.timeRange} score={payload.windows.nextBest.score} variant="secondary" />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <WhyExplanation text={payload.plainEnglishExplanation} subScores={payload.subScores} />
          </div>
          <div className="md:col-span-2">
            <HourlyChart data={payload.hourlyData} />
          </div>
        </section>

        <section>
          <WeeklyOutlook data={payload.weekly} />
        </section>
      </div>
    </main>
  );
}