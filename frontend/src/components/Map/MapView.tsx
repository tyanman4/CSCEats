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

const cscIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
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
  const csc: [number, number] = [35.712117, 139.704741]; // 高田馬場駅中心 
  return (
    
    <MapContainer
      center={csc}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={csc} icon={cscIcon}>
          <Popup>
            <strong>コンピュータ株式会社</strong>
            <br />
            東京都新宿区高田馬場1-28-10 三慶ビル6F
          </Popup>
      </Marker>
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
