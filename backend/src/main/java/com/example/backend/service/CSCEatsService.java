package com.example.backend.service;

import java.util.List;
import java.util.Map;

import com.example.backend.entity.RestaurantReview;
import com.example.backend.entity.User;

public interface CSCEatsService {

    List<RestaurantReview> findRestaurantsWithReviewSummary(String search, List<String> sorts, int page);

    int findTotalCountRestaurants(String search);

    User findByIdUser(Integer user_id);

    boolean checkExistsByName(String name);

    void insertUser(User user);

    String login(String username, String password);

    List<Map<String, Object>> findCategoriesByUsage();
}