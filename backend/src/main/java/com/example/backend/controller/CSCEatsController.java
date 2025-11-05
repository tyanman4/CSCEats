package com.example.backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.backend.entity.RestaurantReview;
import com.example.backend.entity.User;
import com.example.backend.service.CSCEatsService;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // ReactサーバのURL
public class CSCEatsController {

    private final CSCEatsService cscEatsService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/api/restaurants")
    public List<Map<String, Object>> getRestaurants(
        @RequestParam(defaultValue = "0") int offset
    ) {
       List<RestaurantReview> listRestaurants = cscEatsService.findRestaurantsWithReviewSummary(offset);
       List<Map<String, Object>> restaurants = new ArrayList<>();
       for (RestaurantReview rt : listRestaurants) {
            Map<String, Object> restaurant = new HashMap<>();
            restaurant.put("id", rt.getRestaurantId());
            restaurant.put("name", rt.getName());
            restaurant.put("address", rt.getAddress());
            restaurant.put("url", rt.getUrl());
            restaurant.put("averageBudget", rt.getAverageBudget());
            restaurant.put("description", rt.getDescription());
            restaurant.put("imageUrl", rt.getImageUrl());
            restaurant.put("createdAt", rt.getCreatedAt());
            restaurant.put("updatedAt", rt.getUpdatedAt());
            restaurant.put("latitude", rt.getLatitude());
            restaurant.put("longitude", rt.getLongitude());
            restaurant.put("averageRating", rt.getAverageRating()); 
            restaurant.put("reviewCount", rt.getReviewCount());
            restaurant.put("categories", rt.getCategories());

            restaurants.add(restaurant);
       };
       return restaurants;
    }

    @GetMapping("/api/user/{id}")
    public List<Map<String, Object>> getUser(@PathVariable Integer id) {
        User user = cscEatsService.findByIdUser(id);
        List<Map<String, Object>> users = new ArrayList<>();
        users.add(Map.of("id", user.getUser_id(), "name", user.getName(), "intro", user.getIntroduction()));
        return users;
    }

    @GetMapping("/api/user/")
    public List<Map<String, Object>> getAllUsers() {
        List<User> allUser = cscEatsService.findAllUser();
        List<Map<String, Object>> users = new ArrayList<>();

        for (User user : allUser) {
            users.add(Map.of("id", user.getUser_id(), "name", user.getName(), "intro", user.getIntroduction()));
        }
        return users;
    }
}
