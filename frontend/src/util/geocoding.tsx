export interface GsiResponse {
    geometry: {
        type: string;
        coordinates: [number, number]; // [lon, lat]
    };
}

// 住所から緯度経度を取得
export async function getLatLon(address: string): Promise<[number, number] | null> {
    try {
        const params = new URLSearchParams({ q: address });
        const res = await fetch(`https://msearch.gsi.go.jp/address-search/AddressSearch?${params.toString()}`, {
            headers: {
                "User-Agent": "MyApp/1.0"
            }
        });

        if (!res.ok) {
            console.error("Geocoding API error:", res.status);
            return null;
        }

        const data: GsiResponse[] = await res.json();

        if (!data || data.length === 0 || !data[0].geometry || !data[0].geometry.coordinates) {
            console.warn("住所が見つかりませんでした:", address);
            return null;
        }

        const [lon, lat] = data[0].geometry.coordinates;
        return [lat, lon]; // 緯度(lat), 経度(lon)の順で返す
    } catch (err) {
        console.error("Geocoding fetch error:", err);
        return null;
    }


}

export function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const EARTH_RADIUS_KM = 6371.0; // 地球半径（km）

    const toRadians = (deg: number) => deg * (Math.PI / 180);

    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);
    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);

    const a = Math.sin(deltaLat / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_KM * c * 1000; // 距離をmで返す
}

export function distanceFromCSC(lat: number, lon: number) {
    const CSC_OFFICE_LAT = 35.712117
    const CSC_OFFICE_LON = 139.704741
    return distance(lat, lon, CSC_OFFICE_LAT, CSC_OFFICE_LON)
}