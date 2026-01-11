package com.example.backend.entity;

import lombok.Data;

@Data
public class RestaurantsLikes {
    private Long userId;
    private Long restaurantId;

    private String restaurantName;
}
