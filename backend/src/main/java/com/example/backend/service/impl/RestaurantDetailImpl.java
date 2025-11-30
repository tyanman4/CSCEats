package com.example.backend.service.impl;

import com.example.backend.dto.RestaurantDetailDto;
import com.example.backend.entity.Restaurant;
import com.example.backend.entity.Photo;
import com.example.backend.entity.Review;
import com.example.backend.entity.Category;
import com.example.backend.mapper.RestaurantMapper;
import com.example.backend.mapper.PhotoMapper;
import com.example.backend.mapper.ReviewMapper;
import com.example.backend.mapper.CategoryMapper;
import com.example.backend.mapper.RestaurantsLikesMapper;
import com.example.backend.service.RestaurantDetailService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantDetailImpl implements RestaurantDetailService {

    private final RestaurantMapper restaurantMapper;
    private final PhotoMapper photoMapper;
    private final ReviewMapper reviewMapper;
    private final CategoryMapper categoryMapper;
    private final RestaurantsLikesMapper favoriteMapper;

    public RestaurantDetailImpl(
            RestaurantMapper restaurantMapper,
            PhotoMapper photoMapper,
            ReviewMapper reviewMapper,
            CategoryMapper categoryMapper,
            RestaurantsLikesMapper favoriteMapper
    ) {
        this.restaurantMapper = restaurantMapper;
        this.photoMapper = photoMapper;
        this.reviewMapper = reviewMapper;
        this.categoryMapper = categoryMapper;
        this.favoriteMapper = favoriteMapper;
    }

    @Override
    public RestaurantDetailDto getRestaurantDetail(Long restaurantId, Long userId) {

        // --- ① レストラン情報 ---
        Restaurant restaurant = restaurantMapper.findById(restaurantId);

        // --- ② 承認済み写真 ---
        List<Photo> photos = photoMapper.findApprovedByRestaurantId(restaurantId);

        // --- ③ レビュー一覧 ---
        List<Review> reviews = reviewMapper.findByRestaurantId(restaurantId);

        // --- ④ カテゴリー一覧 ---
        List<Category> categories = categoryMapper.findByRestaurantId(restaurantId);

        // --- ⑤ お気に入り判定 ---
        boolean favorite = favoriteMapper.isFavorite(restaurantId, userId);

        // --- まとめて DTO に入れる ---
        RestaurantDetailDto dto = new RestaurantDetailDto();
        dto.setRestaurant(restaurant);
        dto.setPhotos(photos);
        dto.setReviews(reviews);
        dto.setCategories(categories);
        dto.setFavorite(favorite);

        return dto;
    }
}
