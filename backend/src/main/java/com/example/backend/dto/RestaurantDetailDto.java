package com.example.backend.dto;

import com.example.backend.entity.Restaurant;
import com.example.backend.entity.Photo;
import com.example.backend.entity.Review;

import lombok.Data;

import com.example.backend.entity.Category;
import java.util.List;

@Data
public class RestaurantDetailDto {

    private Restaurant restaurant;
    private List<Photo> photos;
    private List<Review> reviews;
    private List<Category> categories;
    private boolean favorite;
}
