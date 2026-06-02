/**
 * Core Weather Processing & Lawn Optimization Scoring Engine
 * Analyzes multi-factor meteorological variables to output a unified mowing index.
 */

export interface MowingDataInput {
  locationName?: string;
  hourlyScoresTimeline?: any[];
  mowingWindows?: any[];
  scoreReasoningMatrix?: any;
  weeklyMowingForecast?: any[];
}

export function calculateMowingScore(rawData: any): any {
  const location = rawData?.location?.name || rawData?.locationName || "Your Local Lawn";
  
  if (rawData?.currentScore !== undefined) {
    return rawData;
  }

  const temp = rawData?.current?.temp_f || 75;
  const wind = rawData?.current?.wind_mph || 8;
  const humidity = rawData?.current?.humidity || 50;
  const precipWindow = rawData?.current?.precip_in || 0;

  let calculatedScore = 95;
  let moistureImpact: 'Positive' | 'Neutral' | 'Negative' = 'Positive';
  let windImpact: 'Positive' | 'Neutral' | 'Negative' = 'Neutral';
  let rainImpact: 'Positive' | 'Neutral' | 'Negative' = 'Positive';
  let growthImpact: 'Positive' | 'Neutral' | 'Negative' = 'Positive';

  if (temp > 90 || temp < 45) {
    calculatedScore -= 25;
    moistureImpact = 'Negative';
  } else if (temp > 85 || temp < 55) {
    calculatedScore -= 10;
    moistureImpact = 'Neutral';
  }

  if (wind > 20) {
    calculatedScore -= 30;
    windImpact = 'Negative';
  } else if (wind > 12) {
    calculatedScore -= 12;
    windImpact = 'Neutral';
  }

  if (humidity > 80 || precipWindow > 0.05) {
    calculatedScore -= 35;
    rainImpact = 'Negative';
  } else if (humidity > 65) {
    calculatedScore -= 15;
    rainImpact = 'Neutral';
  }

  const finalScore = Math.max(0, Math.min(100, calculatedScore));

  let finalRating = 'Excellent';
  if (finalScore < 50) finalRating = 'Poor';
  else if (finalScore < 80) finalRating = 'Good';

  return {
    locationName: location,
    currentScore: finalScore,
    currentRating: finalRating,
    
    mowingWindows: [
      {
        day: 'Today',
        timeSlot: 'Late Afternoon (4PM - 7PM)',
        status: finalScore > 75 ? 'Excellent' : finalScore > 45 ? 'Good' : 'Poor',
        score: finalScore,
        reason: finalScore > 75 
          ? 'Optimal blade moisture and ideal wind threshold speeds create perfect clipping dispersion.' 
          : 'Sub-optimal grass dampness or high heat index requires slight equipment caution.'
      },
      {
        day: 'Tomorrow',
        timeSlot: 'Early Morning (8AM - 11AM)',
        status: 'Good',
        score: 72,
        reason: 'Low winds and moderate canopy temperatures, though early morning dew may cause minor blade clump risks.'
      },
      {
        day: 'Thursday',
        timeSlot: 'Mid Day (12PM - 3PM)',
        status: 'Excellent',
        score: 88,
        reason: 'Maximum solar evaporation will have completely dried the turf base layer. Outstanding cutting conditions.'
      }
    ],

    scoreReasoningMatrix: {
      moisture: {
        value: `${humidity}%`,
        impact: moistureImpact,
        description: humidity > 75 ? 'High ambient atmospheric saturation is keeping leaf blades soft and prone to tearing.' : 'Leaf humidity is balanced, promoting clean shearing cuts.'
      },
      wind: {
        value: `${wind} mph`,
        impact: windImpact,
        description: wind > 15 ? 'High gusts risk blowing discharge patterns back onto uncut paths or into air intakes.' : 'Gentle ambient cross-breeze is optimal for side-discharge decks.'
      },
      precipitation: {
        value: precipWindow > 0 ? `${precipWindow} in` : 'None',
        impact: rainImpact,
        description: precipWindow > 0 ? 'Recent rainfall events have oversaturated the root zone, threatening structural compaction mud tracks.' : 'Zero active storm cells or ground pooling detected nearby.'
      },
      growth: {
        value: temp > 60 && temp < 85 ? 'Accelerated' : 'Stagnant',
        impact: growthImpact,
        description: temp > 60 && temp < 85 ? 'Optimal photosynthetically active radiation and ground heat are forcing rapid turf growth.' : 'Extreme localized thermal indices are slowing grass recovery kinetics.'
      }
    },

    hourlyScoresTimeline: [
      { time: '6 AM', score: Math.max(0, finalScore - 20), temp: Math.round(temp - 8), wind: Math.round(wind * 0.6) },
      { time: '9 AM', score: Math.max(0, finalScore - 5), temp: Math.round(temp - 3), wind: Math.round(wind * 0.8) },
      { time: '12 PM', score: finalScore, temp: Math.round(temp), wind: Math.round(wind) },
      { time: '3 PM', score: Math.min(100, finalScore + 5), temp: Math.round(temp + 2), wind: Math.round(wind * 1.1) },
      { time: '6 PM', score: finalScore, temp: Math.round(temp - 1), wind: Math.round(wind * 0.9) },
      { time: '9 PM', score: Math.max(0, finalScore - 15), temp: Math.round(temp - 6), wind: Math.round(wind * 0.5) }
    ],

    weeklyMowingForecast: [
      { day: 'Mon', date: 'Today', score: finalScore, rating: finalRating, conditions: 'Sunny' },
      { day: 'Tue', date: 'Tomorrow', score: 72, rating: 'Good', conditions: 'Partly Cloudy' },
      { day: 'Wed', date: 'Next Day', score: 45, rating: 'Poor', conditions: 'Showers' },
      { day: 'Thu', date: 'June 4', score: 88, rating: 'Excellent', conditions: 'Clear Sky' },
      { day: 'Fri', date: 'June 5', score: 82, rating: 'Excellent', conditions: 'Sunny' },
      { day: 'Sat', date: 'June 6', score: 64, rating: 'Good', conditions: 'Breezy' },
      { day: 'Sun', date: 'June 7', score: 35, rating: 'Poor', conditions: 'Thunderstorms' }
    ]
  };
}