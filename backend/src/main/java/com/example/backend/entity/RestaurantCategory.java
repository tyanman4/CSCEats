package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RestaurantCategory {
    private Long restaurantId;
    private Long categoryId;
}
