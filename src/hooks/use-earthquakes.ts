"use client";

import { useState, useEffect, useCallback } from 'react';
import type { EarthquakeData, EarthquakeFeature } from '@/types/earthquake';
import { useToast } from "@/hooks/use-toast";

export type TimePeriod = 'hour' | 'day' | 'week' | 'month';

const API_URLS: Record<TimePeriod, string> = {
  hour: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
  day: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
  week: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',
  month: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
};

export function useEarthquakes(timePeriod: TimePeriod, magnitudeRange: [number, number]) {
  const [earthquakes, setEarthquakes] = useState<EarthquakeFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URLS[timePeriod]);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data: EarthquakeData = await response.json();
      const filtered = data.features.filter(
        (feature) =>
          feature.properties.mag !== null &&
          feature.properties.mag >= magnitudeRange[0] &&
          feature.properties.mag <= magnitudeRange[1]
      );
      setEarthquakes(filtered);
    } catch (e: any) {
      setError(e.message);
      toast({
        variant: "destructive",
        title: "Error fetching earthquake data",
        description: e.message || "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [timePeriod, magnitudeRange, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { earthquakes, isLoading, error };
}
