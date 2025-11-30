package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.entity.RequestRestaurants;
import com.example.backend.helper.GeoUtils;
import com.example.backend.mapper.RequestRestaurantsMapper;
import com.example.backend.mapper.RestaurantsMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RequestHandlingService {

    private final RequestRestaurantsMapper requestRestaurantsMapper;
    private final GeocodingService geocodingService;
    private final RestaurantsMapper restaurantsMapper;
    private final GeoUtils geoUtils;

    public List<RequestRestaurants> findPendingRequestRestaurants() {
        return requestRestaurantsMapper.selectPendingRequestRestaurants();
    }

    public void approveRequestRestaurant(Integer requestId, Integer adminId) {

        final double CSC_OFFICE_LAT = 35.712117;
        final double CSC_OFFICE_LON = 139.704741;

        requestRestaurantsMapper.approveRequestRestaurant(requestId, adminId);
        RequestRestaurants requestRestaurants = requestRestaurantsMapper.selectRequestRestaurantsById(requestId);
        String restaurantName = requestRestaurants.getName();
        String address = requestRestaurants.getAddress();
        String url = requestRestaurants.getUrl();
        double[] latlon = geocodingService.getLatLon(address);
        Double lattitude = (latlon == null) ? CSC_OFFICE_LAT : latlon[0];
        Double longitude = (latlon == null) ? CSC_OFFICE_LON : latlon[1];
        Integer distance = (int) geoUtils.distance(lattitude, longitude, CSC_OFFICE_LAT, CSC_OFFICE_LON);
        restaurantsMapper.insertApprovedRestaurant(restaurantName, address, distance, url, lattitude, longitude);
    }

    public void rejectRequestRestaurant(Integer requestId, Integer adminId, String reason) {

        requestRestaurantsMapper.rejectRequestRestaurant(requestId, adminId, reason);
    }
}
