package com.example.backend.service;

import com.example.backend.entity.Review;
import com.example.backend.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewMapper reviewMapper;

    
    public void insert(Review review) {
        reviewMapper.insert(review);
    }

    public List<Review> getReviewsByRestaurant(Long restaurantId) {
        return reviewMapper.findByRestaurantId(restaurantId);
    }
}