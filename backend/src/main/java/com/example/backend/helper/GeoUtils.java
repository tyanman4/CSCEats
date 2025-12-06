package com.example.backend.helper;

import org.springframework.stereotype.Component;

@Component
public class GeoUtils {

    private static final double EARTH_RADIUS_KM = 6371.0; // 地球半径（km）

    /**
     * 緯度経度から距離を計算（ハーサイン距離）
     *
     * @param lat1 緯度1
     * @param lon1 経度1
     * @param lat2 緯度2
     * @param lon2 経度2
     * @return 距離（m）
     */
    public double distance(double lat1, double lon1, double lat2, double lon2) {
        double lat1Rad = Math.toRadians(lat1);
        double lat2Rad = Math.toRadians(lat2);
        double deltaLat = Math.toRadians(lat2 - lat1);
        double deltaLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2)
                + Math.cos(lat1Rad) * Math.cos(lat2Rad)
                        * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS_KM * c * 1000;
    }
}