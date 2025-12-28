import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const cscIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface Props {
  restaurant: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}

export const RestaurantMap: React.FC<Props> = ({ restaurant }) => {
  const csc: [number, number] = [35.712117, 139.704741];

  return (
    <div style={{ height: 300, borderRadius: 12, overflow: "hidden" }}>
      <MapContainer
        center={csc}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* CSC */}
        <Marker position={csc} icon={cscIcon}>
          <Popup>
            <strong>コンピュータ株式会社</strong>
            <br />
            東京都新宿区高田馬場1-28-10 三慶ビル6F
          </Popup>
        </Marker>

        {/* レストラン */}
        <Marker position={[restaurant.latitude, restaurant.longitude]}>
          <Popup>
            <strong>{restaurant.name}</strong>
            <br />
            {restaurant.address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
