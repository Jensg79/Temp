export async function fetchTemperatureData(): Promise<TemperatureResponse> {
  const response = await fetch('https://bzrd6i1w.run.nodescript.dev/schule/shelly');
  
  if (!response.ok) {
    throw new Error('Failed to fetch temperature data');
  }

  return response.json();
}