import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get('zip');

  if (!zip || zip.length !== 5) {
    return NextResponse.json({ error: 'A valid 5-digit ZIP code is required.' }, { status: 400 });
  }

  try {
    // 1. DYNAMIC LOOKUP: Convert ZIP code to Latitude and Longitude coordinates
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=US&format=json`;
    
    // Custom user-agent header is required by this free lookup service to prevent getting blocked
    const geoResponse = await fetch(geocodeUrl, {
      headers: { 'User-Agent': 'CanICutItLawnApp/1.0' }
    });

    if (!geoResponse.ok) {
      throw new Error('Failed to translate ZIP code coordinates.');
    }

    const geoData = await geoResponse.json();

    // Fallback coordinates if the lookup comes back blank
    let lat = '38.8951';
    let lon = '-77.0364';
    let locationLabel = `ZIP Code: ${zip}`;

    if (geoData && geoData.length > 0) {
      lat = geoData[0].lat;
      lon = geoData[0].lon;
      // Extracts a clean display name (like "Harlingen, TX") if available
      locationLabel = geoData[0].display_name.split(',')[0] + ', ' + geoData[0].display_name.split(',')[2] || `ZIP Code: ${zip}`;
    }

    // 2. FETCH ACCURATE WEATHER: Inject the dynamic coordinates directly into the weather URL
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`;
    
    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      throw new Error('External weather telemetry service failed.');
    }

    const rawData = await response.json();

    // 3. NORMALIZE DATA: Package everything up for your weather engine matrix
    const normalizedPayload = {
      locationName: locationLabel,
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