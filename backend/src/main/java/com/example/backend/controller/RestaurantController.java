package com.example.backend.controller;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.RestaurantDetailDto;
import com.example.backend.entity.RestaurantReview;
import com.example.backend.service.CSCEatsService;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import com.example.backend.service.RestaurantDetailService;
import com.example.backend.security.JwtUtil;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // ReactサーバのURL
public class RestaurantController {

    private final CSCEatsService cscEatsService;
    private final RestaurantDetailService restaurantDetailService;
    private final JwtUtil jwtUtil;


    @GetMapping("/api/restaurants")
    public Map<String, Object> getRestaurants (
        @RequestParam(required = false) String search,
        @RequestParam(required = false) List<String> sorts,
        @RequestParam(defaultValue = "1") int page
    ) {
        List<RestaurantReview> listRestaurants = cscEatsService.findRestaurantsWithReviewSummary(search, sorts, page);
        long totalCount =  cscEatsService.findTotalCountRestaurants(search);
        List<Map<String, Object>> restaurants = new ArrayList<>();
        for (RestaurantReview rt : listRestaurants) {
            Map<String, Object> restaurant = new HashMap<>();
            restaurant.put("id", rt.getRestaurantId());
            restaurant.put("name", rt.getName());
            restaurant.put("distance", rt.getDistance());
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
       
        Map<String, Object> response = new HashMap<>();
        response.put("restaurants", restaurants);
        response.put("totalCount", totalCount);

        return response;
    }   

    @GetMapping("/api/restaurants/{id}")
    public ResponseEntity<?> getDetail(
        @PathVariable("id") Long restaurantId,
        HttpServletRequest request
    ) {
        // --- JWT から userId 抽出 ---
        String authHeader = request.getHeader("Authorization");
        String token = null;
        Long userId = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            userId = jwtUtil.extractUserId(token);
        } 
        // --- Service 呼び出し ---
        RestaurantDetailDto dto =
                restaurantDetailService.getRestaurantDetail(restaurantId, userId);

        return ResponseEntity.ok(dto);
    }
}
