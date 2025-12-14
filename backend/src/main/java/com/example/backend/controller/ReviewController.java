package com.example.backend.controller;

import com.example.backend.service.ReviewService;
import com.example.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // ReactサーバのURL
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

    public static class ReviewRequest {
        private Integer restaurantId;
        private Integer rating;
        private String comment;

        // Getters and Setters
        public Integer getRestaurantId() {
            return restaurantId;
        }

        public void setRestaurantId(Integer restaurantId) {
            this.restaurantId = restaurantId;
        }

        public Integer getRating() {
            return rating;
        }

        public void setRating(Integer rating) {
            this.rating = rating;
        }

        public String getComment() {
            return comment;
        }

        public void setComment(String comment) {
            this.comment = comment;
        }
    }
}