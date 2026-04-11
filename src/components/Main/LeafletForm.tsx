import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import Nominatim from "../../services/Nominatim";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export interface SelectedLocation {
  lat: number;
  lng: number;
  label: string;
}

interface LeafletFormProps {
  onLocationSelect: (location: SelectedLocation) => void;
}

interface ClickHandlerProps {
  onMapClick: (lat: number, lng: number) => void;
}

function ClickHandler({ onMapClick }: ClickHandlerProps) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const SFU: [number, number] = [49.2761, -122.9162];

export default function LeafletForm({ onLocationSelect }: LeafletFormProps) {
  const [pin, setPin] = useState<SelectedLocation | null>(null);

  async function handleMapClick(lat: number, lng: number) {
    try {
      const label = await Nominatim(lat, lng);
      const newPin: SelectedLocation = { lat, lng, label };
      setPin(newPin);
      onLocationSelect(newPin);
    } catch (err) {
      console.error("Reverse geocoding failed", err);
    }
  }

  return (
    <MapContainer
      center={SFU}
      zoom={13}
      style={{
        height: "calc(100vh - 56px)",
        cursor: "crosshair",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      <ClickHandler onMapClick={handleMapClick} />

      {pin && (
        <Marker position={[pin.lat, pin.lng]}>
          <Popup>
            <strong>{pin.label}</strong>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}