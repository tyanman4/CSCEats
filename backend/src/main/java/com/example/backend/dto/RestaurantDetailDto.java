package com.example.backend.dto;

import com.example.backend.entity.Restaurant;
import com.example.backend.entity.Photo;
import com.example.backend.entity.Review;
import com.example.backend.entity.Category;
import java.util.List;

public class RestaurantDetailDto {

    private Restaurant restaurant;
    private List<Photo> photos;
    private List<Review> reviews;
    private List<Category> categories;
    private boolean favorite;

    // --- Getter & Setter ---
    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }
}
