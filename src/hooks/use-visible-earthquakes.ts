import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps"; 
import type { EarthquakeFeature } from "@/types/earthquake";

export function useVisibleEarthquakes(earthquakes: EarthquakeFeature[]) {
  const map = useMap();
  const [visible, setVisible] = useState<EarthquakeFeature[]>([]);

  useEffect(() => {
    if (!map) return;

    const update = () => {
      const bounds = map.getBounds();
      if (!bounds) return;

      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      const minLat = sw.lat(), maxLat = ne.lat();
      const minLng = sw.lng(), maxLng = ne.lng();
      const crossesDateLine = minLng > maxLng;

      const filtered = earthquakes.filter((q) => {
        const lat = q.geometry.coordinates[1];
        const lng = q.geometry.coordinates[0];
        const inLat = lat >= minLat && lat <= maxLat;
        const inLng = crossesDateLine
          ? lng >= minLng || lng <= maxLng
          : lng >= minLng && lng <= maxLng;
        return inLat && inLng;
      });

      setVisible(filtered);
    };

    update(); // run once on mount
    const listener = map.addListener("idle", update);

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map, earthquakes]);

  return visible;
}
