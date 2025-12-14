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

    public void insert(Integer restaurant_id, Integer user_id, Integer rating, String comment) {
        Review review = new Review();
        review.setRestaurantId(restaurant_id.longValue());
        review.setUserId(user_id.longValue());
        review.setRating(rating);
        review.setComment(comment);
        reviewMapper.insert(review);
    }

    public List<Review> getReviewsByRestaurant(Long restaurantId) {
        return reviewMapper.findByRestaurantId(restaurantId);
    }
}