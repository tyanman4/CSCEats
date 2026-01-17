package com.example.backend.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Restaurant {
    private Long restaurantId;
    private String name;
    private Double distance;
    private String address;
    private String url;
    private Integer underBudget;
    private Integer topBudget;
    private String description;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Double latitude;
    private Double longitude;
}
