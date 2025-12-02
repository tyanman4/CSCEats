package com.example.backend.service;

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

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RestaurantDetailService {

    private final RestaurantMapper restaurantMapper;
    private final PhotoMapper photoMapper;
    private final ReviewMapper reviewMapper;
    private final CategoryMapper categoryMapper;
    private final RestaurantsLikesMapper favoriteMapper;

    /**
     * レストラン詳細情報を取得
     * @param restaurantId レストランID
     * @param userId ログインユーザID（お気に入り判定に使う）
     * @return RestaurantDetailDto
     */
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
        RestaurantDetailDto detailDto = new RestaurantDetailDto();
        detailDto.setRestaurant(restaurant);
        detailDto.setPhotos(photos);
        detailDto.setReviews(reviews);
        detailDto.setCategories(categories);
        detailDto.setFavorite(favorite);

        return detailDto;
    }

}
