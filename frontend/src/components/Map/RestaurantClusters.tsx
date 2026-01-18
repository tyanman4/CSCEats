// components/MapView/RestaurantClusters.tsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

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

export const RestaurantClusters: React.FC<Props> = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    const clusterGroup = (L as any).markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 50,
    });
    if (!markers.length) return;

    markers.forEach((m) => {
      const marker = L.marker([m.lat, m.lng]);

      const imageUrl = m.imageUrl
        ? `${import.meta.env.VITE_API_BASE_URL}${m.imageUrl}`
        : `${import.meta.env.VITE_API_BASE_URL}/uploads/no-image.png`;

      marker.bindPopup(`
        <div class="popupBody">
          <img src="${imageUrl}" class="popupImage" />
          <strong class="popupTitle">${m.name}</strong>
          ${m.address ? `<p class="popupAddress">${m.address}</p>` : ""}
          <a class="popupLink" href="/restaurants/${m.id}">
            詳細を見る
          </a>
        </div>
      `);

      clusterGroup.addLayer(marker);
    });

    map.addLayer(clusterGroup);

    return () => {
      clusterGroup.clearLayers();
      map.removeLayer(clusterGroup);
    };
  }, [map, markers]);

  return null;
};
