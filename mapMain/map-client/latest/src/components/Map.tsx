// components/Map.tsx
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationData {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface Position {
  lat: number;
  lng: number;
}

interface MapProps {
  markers: LocationData[];
  onMapClick: (position: Position) => void;
  isReady: boolean;
  currentPosition: Position | null;
  pickup: string | null;
  dropoff: string | null;
  onMapReady?: () => void;
}

// Fix for default marker icons in Leaflet
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icon for current location with a different color
const currentLocationIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icon for pickup and dropoff locations
const pickupIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const dropoffIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = ({ markers, onMapClick, isReady, currentPosition, pickup, dropoff }: MapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const currentMarkerRef = useRef<L.Marker | null>(null);
  const pickupMarkerRef = useRef<L.Marker | null>(null);
  const dropoffMarkerRef = useRef<L.Marker | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);

  // Initialize map
  useEffect(() => {
    if (!isReady || !mapContainerRef.current || mapRef.current) return;

    // Default view is London, but we'll update it when we get the real location
    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: true,
      maxZoom: 19
    }).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Force a resize after initialization
    setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 100);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isReady]);

  // Handle current position updates
  useEffect(() => {
    if (!mapRef.current || !currentPosition) return;

    // Remove existing marker
    if (currentMarkerRef.current) {
      currentMarkerRef.current.remove();
    }

    // Create new marker at current position
    currentMarkerRef.current = L.marker(
      [currentPosition.lat, currentPosition.lng],
      { icon: currentLocationIcon }
    )
      .addTo(mapRef.current)
      .bindPopup('Your current location')
      .openPopup();

    // Center and zoom the map on the current location
    mapRef.current.setView([currentPosition.lat, currentPosition.lng], 16, {
      animate: true
    });
  }, [currentPosition]);

  // Handle pickup and dropoff locations
  useEffect(() => {
    if (!mapRef.current || !pickup || !dropoff) return;

    // Remove existing markers and route line
    if (pickupMarkerRef.current) pickupMarkerRef.current.remove();
    if (dropoffMarkerRef.current) dropoffMarkerRef.current.remove();
    if (routeLineRef.current) routeLineRef.current.remove();

    // Geocode pickup and dropoff locations
    const geocodeAddress = async (address: string) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await response.json();
        if (data && data[0]) {
          return {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
          };
        }
        return null;
      } catch (error) {
        console.error('Error geocoding address:', error);
        return null;
      }
    };

    const plotRoute = async () => {
      const pickupCoords = await geocodeAddress(pickup);
      const dropoffCoords = await geocodeAddress(dropoff);

      if (pickupCoords && dropoffCoords) {
        // Add pickup marker
        pickupMarkerRef.current = L.marker(
          [pickupCoords.lat, pickupCoords.lng],
          { icon: pickupIcon }
        )
          .addTo(mapRef.current!)
          .bindPopup('Pickup Location')
          .openPopup();

        // Add dropoff marker
        dropoffMarkerRef.current = L.marker(
          [dropoffCoords.lat, dropoffCoords.lng],
          { icon: dropoffIcon }
        )
          .addTo(mapRef.current!)
          .bindPopup('Dropoff Location')
          .openPopup();

        // Draw route line
        routeLineRef.current = L.polyline(
          [[pickupCoords.lat, pickupCoords.lng], [dropoffCoords.lat, dropoffCoords.lng]],
          { color: 'blue', weight: 5 }
        ).addTo(mapRef.current!);

        // Fit map to show both markers
        const bounds = L.latLngBounds(
          [pickupCoords.lat, pickupCoords.lng],
          [dropoffCoords.lat, dropoffCoords.lng]
        );
        mapRef.current!.fitBounds(bounds, { padding: [50, 50] });
      }
    };

    plotRoute();
  }, [pickup, dropoff]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: 'calc(100vh - 64px)', width: '100%', position: 'relative' }}
      onClick={(e) => {
        if (mapRef.current) {
          const latlng = mapRef.current.mouseEventToLatLng(e as any);
          onMapClick({ lat: latlng.lat, lng: latlng.lng });
        }
      }}
    />
  );
};

export default Map;