import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

// Fix default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Create custom emoji markers
const createEmojiMarker = (status) => {
  return L.divIcon({
    className: "emoji-marker",
    html: `<div style="font-size: 28px; text-shadow: 0 0 3px white;">${
      status === "Active" ? "⚡" : "🗲"
    }</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const MapView = ({ stations }) => {
  const position =
    stations.length > 0
      ? [parseFloat(stations[0].latitude), parseFloat(stations[0].longitude)]
      : [51.505, -0.09]; // Default to London if no stations

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer center={position} zoom={3} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[
              parseFloat(station.latitude),
              parseFloat(station.longitude),
            ]}
            icon={createEmojiMarker(station.status)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{station.name}</h3>
                <p
                  className={`text-sm ${
                    station.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {station.status}
                </p>
                <p className="text-sm">Power: {station.powerOutput} kW</p>
                <p className="text-sm">Connector: {station.connectorType}</p>
                <Link
                  to={`/station/${station.id}`}
                  className="mt-4 inline-block w-full text-center bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
                >
                  View Station Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
