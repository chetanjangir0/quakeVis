# Earthquake Visualizer

A web application that visualizes recent earthquakes around the world on an interactive Google Map.  
Users can filter earthquakes by magnitude and time period, view details for each event, and explore dense regions using marker clustering.

---

## Features

- Display earthquakes on a world map with interactive markers
- Filter earthquakes by magnitude and time period (hour, day, week, month)
- Click on markers to see details (magnitude, location, time, USGS link)
- Marker clustering for dense areas
- Color and size coded markers based on magnitude
- Only renders markers visible in the current viewport for performance optimization
- Responsive and interactive map interface

---

## Tech Stack

- Frontend: React, TypeScript
- Map: Google Maps via `@vis.gl/react-google-maps`
- State Management: React hooks
- Data: USGS Earthquake API (GeoJSON)
- Styling: TailwindCSS
- Marker Clustering: `@googlemaps/markerclusterer`

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/username/earthquake-visualizer.git
cd earthquake-visualizer
```

2. Install Dependencies:

```bash
npm install
```
3. Add your Google Maps API key in .env

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
```

4. Run the app

```bash
npm run dev
```

