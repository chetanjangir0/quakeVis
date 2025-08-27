"use client";

import { APIProvider, Map, AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API_KEY } from '@/lib/config';
import { useEarthquakes, type TimePeriod } from '@/hooks/use-earthquakes';
import { useState, useEffect } from 'react';
import type { EarthquakeFeature } from '@/types/earthquake';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { getMagnitudeColor } from '@/lib/earthquake-helpers';
import { AlertTriangle, Loader2 } from 'lucide-react';

const getMagnitudeStyle = (magnitude: number) => {
  const color = getMagnitudeColor(magnitude);
  const size = Math.max(12, Math.min(50, (magnitude + 1) * 4));
  return { color, size };
};

const MapUpdater = ({ earthquakes }: { earthquakes: EarthquakeFeature[] }) => {
  const map = useMap();
  useEffect(() => {
    if (map && earthquakes.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      earthquakes.forEach(quake => {
        bounds.extend({
          lat: quake.geometry.coordinates[1],
          lng: quake.geometry.coordinates[0],
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, earthquakes]);
  return null;
}

export function QuakeMap({
  timePeriod,
  magnitudeRange,
  mapTypeId,
}: {
  timePeriod: TimePeriod;
  magnitudeRange: [number, number];
  mapTypeId: string;
}) {
  const { earthquakes, isLoading, error } = useEarthquakes(timePeriod, magnitudeRange);
  const [selectedQuake, setSelectedQuake] = useState<EarthquakeFeature | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setIsInitialLoad(false);
    }
  }, [isLoading]);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-muted p-4 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-2xl font-bold">API Key Missing</h2>
        <p className="mt-2 text-muted-foreground">
          Please provide a Google Maps API key in your environment variables to display the map.
        </p>
      </div>
    );
  }

  if (isInitialLoad && isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-muted p-4 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-2xl font-bold">Failed to Load Data</h2>
        <p className="mt-2 text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/75 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-lg">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-lg font-medium">Loading earthquakes...</span>
          </div>
        </div>
      )}
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={{ lat: 20, lng: 0 }}
          defaultZoom={2}
          mapId="quakevis_map"
          className="h-full w-full border-none"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapTypeId={mapTypeId}
        >
          {earthquakes.map((quake) => {
            const { color, size } = getMagnitudeStyle(quake.properties.mag);
            return (
              <AdvancedMarker
                key={quake.id}
                position={{ lat: quake.geometry.coordinates[1], lng: quake.geometry.coordinates[0] }}
                onClick={() => setSelectedQuake(quake)}
              >
                <div
                  className="cursor-pointer rounded-full border-2 transition-transform duration-200 ease-out hover:scale-125"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: `${color}B3`,
                    borderColor: color,
                  }}
                  title={`Mag ${quake.properties.mag}: ${quake.properties.place}`}
                />
              </AdvancedMarker>
            );
          })}

          {selectedQuake && (
            <InfoWindow
              position={{
                lat: selectedQuake.geometry.coordinates[1],
                lng: selectedQuake.geometry.coordinates[0],
              }}
              onCloseClick={() => setSelectedQuake(null)}
              pixelOffset={[0, -getMagnitudeStyle(selectedQuake.properties.mag).size / 2]}
            >
              <div className="p-2 min-w-48">
                <h3 className="font-bold font-headline text-lg">{selectedQuake.properties.title}</h3>
                <p className="text-base mt-1">
                  <strong>Magnitude:</strong> {selectedQuake.properties.mag.toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedQuake.properties.time).toLocaleString()}
                </p>
                <Button variant="link" asChild className="p-0 h-auto mt-2">
                  <a href={selectedQuake.properties.url} target="_blank" rel="noopener noreferrer">
                    More details on USGS
                  </a>
                </Button>
              </div>
            </InfoWindow>
          )}
          <MapUpdater earthquakes={earthquakes} />
        </Map>
      </APIProvider>
    </div>
  );
}
