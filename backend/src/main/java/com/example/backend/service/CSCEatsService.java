package com.example.backend.service;

import java.util.List;

import com.example.backend.entity.RestaurantReview;
import com.example.backend.entity.User;

public interface CSCEatsService {

    List<User> findAllUser();

    User findByIdUser(Integer user_id);

    List<RestaurantReview> findRestaurantsWithReviewSummary(int limit, int offset);

    int findTotalCountRestaurants();
}