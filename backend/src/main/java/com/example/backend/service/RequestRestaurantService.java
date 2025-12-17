package com.example.backend.service;

import com.example.backend.entity.RequestRestaurants;
import com.example.backend.mapper.RequestRestaurantsMapper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RequestRestaurantService {
    private final RequestRestaurantsMapper requestRestaurantMapper;

    public Long insert(String name, String address, String url, Long userId) {
        RequestRestaurants requestRestaurant = new RequestRestaurants();
        requestRestaurant.setName(name);
        requestRestaurant.setAddress(address);
        requestRestaurant.setUrl(url);
        requestRestaurant.setUserId(userId);
        requestRestaurant.setStatus("pending");

        return requestRestaurantMapper.insert(requestRestaurant);
    };
}