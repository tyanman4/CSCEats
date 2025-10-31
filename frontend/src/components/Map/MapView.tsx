import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// デフォルトマーカーの画像を修正（Reactではパスが崩れやすいため）
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Restaurant {
  id: number;
  name: string;
  address: string;
  distance: number;
  averageBudget: string;
  description: string;
  lat: number;
  lng: number;
}

interface MapViewProps {
  restaurants: Restaurant[];
}


export const MapView: React.FC<MapViewProps> = ({ restaurants }) => {
  const center: [number, number] = [35.7129, 139.7034]; // 高田馬場駅中心
  console.log(restaurants);
  return (
    
    <MapContainer
      center={center}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
       {restaurants.map((r) => (
        <Marker key={r.id} position={[r.lat, r.lng] as [number, number]}>
          
          <Popup>
            <strong>{r.name}</strong>
            <br />
            {r.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
