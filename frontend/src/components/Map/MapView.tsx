import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "./MapView.scss";

import { RestaurantClusters } from "./RestaurantClusters";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

// サイズ補正
const MapFixer = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 0);
  }, [map]);
  return null;
};

// CSC アイコン
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

type MapRestaurant = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address?: string;
  imageUrl?: string | null;
};

type Props = {
  markers: MapRestaurant[];
};

export const MapView: React.FC<Props> = ({ markers }) => {
  const csc: [number, number] = [35.712117, 139.704741];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer center={csc} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <Marker position={csc} icon={cscIcon}>
          <Popup>
            <strong>コンピュータ株式会社</strong>
            <br />
            東京都新宿区高田馬場1-28-10 三慶ビル6F
          </Popup>
        </Marker>

        <MapFixer />
        <RestaurantClusters markers={markers} />
      </MapContainer>
    </div>
  );
};
