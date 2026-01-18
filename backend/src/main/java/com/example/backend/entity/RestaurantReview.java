package com.example.backend.entity;

import lombok.Data;
import java.util.List;

@Data
public class RestaurantReview {
    private Long restaurantId;
    private String name;
    private String address;
    private Integer distance;
    private String url;
    private String description;
    private String imageUrl;
    private String createdAt;
    private String updatedAt;
    private Double latitude;
    private Double longitude;
    private Integer underBudget;
    private Integer topBudget;

    private Double averageRating; // ← reviewsから算出
    private Integer reviewCount; // ← reviewsから算出

    private List<Category> categories;
}
