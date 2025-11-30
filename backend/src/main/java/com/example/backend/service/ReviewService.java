package com.example.backend.service;

import com.example.backend.entity.Review;

import java.util.List;

public interface ReviewService {

    void insert(Review review);

    List<Review> getReviewsByRestaurant(Long restaurantId);

}