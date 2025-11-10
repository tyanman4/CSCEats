package com.example.backend.service;

import java.util.List;

import com.example.backend.entity.RestaurantReview;
import com.example.backend.entity.User;

public interface CSCEatsService {

    List<User> findAllUser();

    User findByIdUser(Integer user_id);

    List<RestaurantReview> findRestaurantsWithReviewSummary(String search, List<String> sorts, int limit, int offset);

    int findTotalCountRestaurants(String search);
}