package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entity.Photo;
import com.example.backend.entity.RequestRestaurants;
import com.example.backend.entity.Restaurants;
import com.example.backend.helper.GeoUtils;
import com.example.backend.mapper.NotificationsMapper;
import com.example.backend.mapper.PhotoMapper;
import com.example.backend.mapper.RequestRestaurantsMapper;
import com.example.backend.mapper.RestaurantsMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RequestHandlingService {

    private final RequestRestaurantsMapper requestRestaurantsMapper;
    private final GeocodingService geocodingService;
    private final RestaurantsMapper restaurantsMapper;
    private final NotificationsMapper notificationsMapper;
    private final PhotoMapper photoMapper;
    private final GeoUtils geoUtils;

    public List<RequestRestaurants> findPendingRequestRestaurants() {
        return requestRestaurantsMapper.selectPendingRequestRestaurants();
    }

    @Transactional
    public void approveRequestRestaurant(Long requestId, Long adminId, Long userId) {

        notificationsMapper.insert(userId, "request_approved", requestId);

        // 事務所の緯度経度
        final double CSC_OFFICE_LAT = 35.712117;
        final double CSC_OFFICE_LON = 139.704741;

        requestRestaurantsMapper.approveRequestRestaurant(requestId, adminId);
        RequestRestaurants requestRestaurants = requestRestaurantsMapper.selectRequestRestaurantsById(requestId);
        String restaurantName = requestRestaurants.getName();
        String address = requestRestaurants.getAddress();
        String url = requestRestaurants.getUrl();

        double[] latlon = geocodingService.getLatLon(address);
        if (latlon == null) {
            Restaurants restaurants = new Restaurants();
            restaurants.setName(restaurantName);
            restaurants.setAddress(address);
            restaurants.setUrl(url);

            restaurantsMapper.insertApprovedRestaurant(restaurants);
            Long restaurantId = restaurants.getRestaurantId();
            photoMapper.updateRestaurantIdByRequestId(restaurantId, requestId);
            requestRestaurantsMapper.updateApprovedRestaurantId(restaurantId, requestId);
            return;
        }
        Double lattitude = latlon[0];
        Double longitude = latlon[1];
        Integer distance = (int) geoUtils.distance(lattitude, longitude, CSC_OFFICE_LAT, CSC_OFFICE_LON);
        Restaurants restaurants = new Restaurants();
        restaurants.setName(restaurantName);
        restaurants.setAddress(address);
        restaurants.setUrl(url);
        restaurants.setLatitude(lattitude);
        restaurants.setLongitude(longitude);
        restaurants.setDistance(distance);

        restaurantsMapper.insertApprovedRestaurant(restaurants);
        Long restaurantId = restaurants.getRestaurantId();
        photoMapper.updateRestaurantIdByRequestId(restaurantId, requestId);
        requestRestaurantsMapper.updateApprovedRestaurantId(restaurantId, requestId);
    }

    @Transactional
    public void rejectRequestRestaurant(Long requestId, Long adminId, String reason, Long userId) {

        notificationsMapper.insert(userId, "request_rejected", requestId);

        requestRestaurantsMapper.rejectRequestRestaurant(requestId, adminId, reason);
    }

    @Transactional
    public void approvePhoto(Long photoId, Long userId) {

        notificationsMapper.insert(userId, "photo_approved", photoId);

        Photo photo = new Photo();
        photo.setPhotoId(photoId);
        photo.setStatus("approved");
        photoMapper.update(photo);
    }

    @Transactional
    public void rejectPhoto(Long photoId, String reason, Long userId) {

        notificationsMapper.insert(userId, "photo_rejected", photoId);

        Photo photo = new Photo();
        photo.setPhotoId(photoId);
        photo.setStatus("rejected");
        photo.setRejectReason(reason);
        photoMapper.update(photo);
    }
}