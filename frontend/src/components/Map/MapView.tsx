import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./MapView.scss";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";

// ===============================
// Leaflet デフォルトアイコン修正
// ===============================
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ===============================
// CSC（会社）用マーカー
// ===============================
const cscIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// ===============================
// 型定義
// ===============================
interface Category {
  categoryId: number;
  name: string;
}

interface Restaurant {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  distance: number;
  averageBudget: string;
  description: string;
  averageRating?: number;
  reviewCount?: number;
  categories?: Category[];
}

interface MapViewProps {
  restaurants: Restaurant[];
}

// ===============================
// MapView
// ===============================
export const MapView: React.FC<MapViewProps> = ({ restaurants }) => {
  const csc: [number, number] = [35.712117, 139.704741]; // CSC（高田馬場）

  return (
    <div className="mapView">
      <MapContainer
        center={csc}
        zoom={36}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* ===============================
            CSC マーカー
        =============================== */}
        <Marker position={csc} icon={cscIcon}>
          <Popup>
            <strong>コンピュータ株式会社</strong>
            <br />
            東京都新宿区高田馬場1-28-10 三慶ビル6F
          </Popup>
        </Marker>

        {/* ===============================
            レストランマーカー
        =============================== */}
        {restaurants.map((r) => (
          <Marker
            key={r.id}
            position={[r.latitude, r.longitude] as [number, number]}
          >
            <Popup>
              <img
                src={
                  r.imageUrl
                    ? `http://localhost:8080/uploads/mainimage/${r.imageUrl}`
                    : "http://localhost:8080/uploads/no-image.png"
                }
                alt={r.name}
                className="popupImage"
              />

              <div className="popupBody">
                <strong className="popupTitle">{r.name}</strong>
                <p className="popupAddress">{r.address}</p>

                <Link
                  to={`/restaurants/${r.id}`}
                  className="popupLink"
                >
                  詳細を見る
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
