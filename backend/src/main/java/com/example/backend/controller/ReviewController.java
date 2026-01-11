package com.example.backend.controller;

import com.example.backend.service.ReviewService;
import com.example.backend.entity.Review;
import com.example.backend.security.JwtUtil;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final JwtUtil jwtUtil;

    @PostMapping("/api/{restaurantId}/reviews")
    public ResponseEntity<Void> submitReview(

            @RequestBody ReviewRequest reviewRequest,
            HttpServletRequest request) {
        if (request.getHeader("Authorization") == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtil.extractUserId(token);

        reviewService.insert(
                reviewRequest.getRestaurantId(),
                userId.intValue(),
                reviewRequest.getRating(),
                reviewRequest.getComment());

        return ResponseEntity.ok().build();
    }

    @Data
    public static class ReviewRequest {
        private Integer restaurantId;
        private Integer rating;
        private String comment;
    }

    @GetMapping("/api/reviews/user/{userId}")
    public ResponseEntity<List<Review>> getByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewService.getByUserId(userId));
    }
}