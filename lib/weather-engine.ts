// src/types/index.ts
export interface WeatherMetrics {
  currentTemp: number;         // Celsius
  feelsLike: number;           // Celsius
  humidity: number;            // Percentage 0-100
  dewPoint: number;            // Celsius
  uvIndex: number;
  aqi: number;                 // 1-5 Scale (Common EPA variant or standard index)
  windSpeed: number;           // m/s
  windGust: number;            // m/s
  precipitationCurrent: number;// mm/hr
  rainProbabilityCurrent: number; // Percentage 0-100
  rainLast24Hours: number;     // mm accum
  rainLast48Hours: number;     // mm accum
  rainLast72Hours: number;     // mm accum
  thunderstormRisk: boolean;   // Binary flag
  daylightRemainingMinutes: number;
}

export type ScoreClassification = 'EXCELLENT' | 'GOOD' | 'ACCEPTABLE' | 'POOR' | 'DO_NOT_MOW';

export interface ScoreBreakdown {
  finalScore: number;
  classification: ScoreClassification;
  isHardStopTriggered: boolean;
  hardStopReason?: string;
  subScores: {
    dryness: number;
    weather: number;
    safety: number;
    convenience: number;
  };
}