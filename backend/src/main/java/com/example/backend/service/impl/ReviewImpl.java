package com.example.backend.service.impl;

import com.example.backend.entity.Review;
import com.example.backend.mapper.ReviewMapper;
import com.example.backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewImpl implements ReviewService {

    private final ReviewMapper reviewMapper;

    @Override
    public void insert(Review review) {
        reviewMapper.insert(review);
    }

    @Override
    public List<Review> getReviewsByRestaurant(Long restaurantId) {
        return reviewMapper.findByRestaurantId(restaurantId);
    }
}