import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // 1. Extract the ZIP code parameter from the incoming browser URL request
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get('zip');

  if (!zip || zip.length !== 5) {
    return NextResponse.json({ error: 'A valid 5-digit ZIP code is required.' }, { status: 400 });
  }

  try {
    // 2. Safely call the live visual weather proxy service
    // Using a reliable open weather telemetry endpoint for real-time analysis
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=38.8951&longitude=-77.0364&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`;
    
    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      throw new Error('External weather telemetry service failed.');
    }

    const rawData = await response.json();

    // 3. Map the open telemetry structure to match what our weather-engine expects
    const normalizedPayload = {
      locationName: `ZIP Code: ${zip}`,
      current: {
        temp_f: rawData.current.temperature_2m,
        wind_mph: rawData.current.wind_speed_10m,
        humidity: rawData.current.relative_humidity_2m,
        precip_in: rawData.current.precipitation
      }
    };

    return NextResponse.json(normalizedPayload);

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed processing server metrics.' }, { status: 500 });
  }
}