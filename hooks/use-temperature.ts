'use client';

import { useState, useEffect } from 'react';
import { fetchTemperatureData } from '@/lib/api';
import { TemperatureResponse } from '@/lib/types';

export function useTemperature() {
  const [data, setData] = useState<TemperatureResponse | null>(null);
  const [history, setHistory] = useState<TemperatureResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      setError(null);
      const newData = await fetchTemperatureData();
      setData(newData);
      setHistory(prev => {
        const newHistory = [...prev, newData];
        // Keep last 24 readings (24 hours)
        return newHistory.slice(-24);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // Fetch every hour
    const interval = setInterval(fetchData, 3600000);
    return () => clearInterval(interval);
  }, []);

  return { data, history, error, isLoading, refetch: fetchData };
}