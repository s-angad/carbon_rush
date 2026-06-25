"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon path issues in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface LocationMapProps {
  lat: number | null;
  lng: number | null;
  onChange: (lat: number, lng: number) => void;
  readOnly?: boolean;
}

function LocationMarker({ lat, lng, onChange, readOnly }: LocationMapProps) {
  useMapEvents({
    click(e) {
      if (!readOnly) {
        onChange(e.latlng.lat, e.latlng.lng);
      }
    },
  });

  return lat && lng ? <Marker position={[lat, lng]} icon={icon} /> : null;
}

export default function LocationMap({ lat, lng, onChange, readOnly }: LocationMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">Loading map...</div>;
  }

  const defaultCenter: [number, number] = [20.5937, 78.9629]; // India center
  const center: [number, number] = lat && lng ? [lat, lng] : defaultCenter;

  return (
    <div className="h-64 rounded-xl overflow-hidden border border-gray-200 z-0 relative">
      <MapContainer center={center} zoom={lat && lng ? 13 : 5} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker lat={lat} lng={lng} onChange={onChange} readOnly={readOnly} />
      </MapContainer>
    </div>
  );
}
