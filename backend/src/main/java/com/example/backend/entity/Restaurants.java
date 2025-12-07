package com.example.backend.entity;

import lombok.Data;

@Data
public class Restaurants {
    private Long restaurantId;
    private String name;
    private String address;
    private Integer distance;
    private String url;
    private String averageBudget;
    private String description;
    private String imageUrl;
    private String createdAt;
    private String updatedAt;
    private Double latitude;
    private Double longitude;
    private Integer visitCount;
}
