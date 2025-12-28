package com.example.backend.service;

import com.example.backend.dto.ReviewRequestDto;
import com.example.backend.entity.Review;
import com.example.backend.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewMapper reviewMapper;

    public void insert(ReviewRequestDto reviewRequestDto, Long user_id) {
        Review review = new Review();
        review.setRestaurantId(reviewRequestDto.getRestaurantId());
        review.setUserId(user_id);
        review.setRating(reviewRequestDto.getRating());
        review.setComment(reviewRequestDto.getComment());
        reviewMapper.insert(review);
    }

    public List<Review> getReviewsByRestaurant(Long restaurantId) {
        return reviewMapper.findByRestaurantId(restaurantId);
    }
}