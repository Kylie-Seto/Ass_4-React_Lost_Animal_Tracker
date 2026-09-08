// reads reports from JSONBIN.io and displays them on the map as pins

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import type { AnimalReport } from "../../types/AnimalReport";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const SFU: [number, number] = [49.2761, -122.9162];

interface MapPannerProps {
  selectedId: string | null;
  reports: AnimalReport[];
}

/** Inner component that can call useMap() inside MapContainer context */
function MapPanner({ selectedId, reports }: MapPannerProps) {
  const map = useMap();
  const prevId = useRef<string | null>(null);

  useEffect(() => {
    if (!selectedId || selectedId === prevId.current) return;
    const selected = reports.find((r) => String(r.id) === selectedId);
    if (selected) {
      map.flyTo([selected.lat, selected.lng], 15, { duration: 0.8 });
      prevId.current = selectedId;
    }
  }, [selectedId, reports, map]);

  return null;
}

interface LeafletViewProps {
  report: AnimalReport[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function LeafletView({
  report,
  selectedId,
  onSelect,
}: LeafletViewProps) {
  return (
    <MapContainer
      center={SFU}
      zoom={13}
      style={{ height: "100vh", width: "100%", cursor: "pointer" }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      <MapPanner selectedId={selectedId} reports={report} />

      {report.map((r) => {
        const isSelected = String(r.id) === selectedId;
        
        // Use an object to conditionally hold the icon prop
        const markerProps = isSelected
          ? {
              icon: L.icon({
                iconUrl:
                  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                iconRetinaUrl:
                  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                shadowUrl:
                  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                iconSize: [32, 52],
                iconAnchor: [16, 52],
                popupAnchor: [0, -52],
              }),
            }
          : {}; // If not selected, pass an empty object instead of undefined

        return (
          <Marker
            key={String(r.id)}
            position={[r.lat, r.lng]}
            {...markerProps}
            eventHandlers={{ click: () => onSelect(String(r.id)) }}
          >
            <Popup>
              <div style={{ minWidth: "160px" }}>
                <strong>
                  {r.animalType}: {r.animalName}
                </strong>
                <br />
                <small style={{ color: "#666" }}>{r.address}</small>
                <br />
                <Link
                  to={`/report/${r.id}`}
                  style={{
                    display: "inline-block",
                    marginTop: "6px",
                    color: "#0d6efd",
                    fontSize: "0.85rem",
                  }}
                >
                  View details →
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}

    </MapContainer>
  );
}

