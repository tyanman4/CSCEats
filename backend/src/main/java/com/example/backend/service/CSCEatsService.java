package com.example.backend.service;

import java.util.List;
import java.util.Map;

import com.example.backend.entity.RestaurantReview;

public interface CSCEatsService {

    List<RestaurantReview> findRestaurantsWithReviewSummary(String search, List<String> sorts, int page);

    int findTotalCountRestaurants(String search);

    List<Map<String, Object>> findCategoriesByUsage();
}