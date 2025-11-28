package com.example.backend.entity;

import lombok.Data;

@Data
public class Review {
    private Long reviewId;
    private Long restaurantId;
    private Long userId;
    private String content;
    private Integer rating;
    private String createdAt;
    private String updatedAt;
}
