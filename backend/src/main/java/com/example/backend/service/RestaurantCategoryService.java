package com.example.backend.service;

import com.example.backend.mapper.RestaurantCategoriesMapper;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RestaurantCategoryService {

    private final CategoryService categoryService;
    private final RestaurantCategoriesMapper restaurantCategoriesMapper;

    @Transactional
    public void addCategoriesToRestaurant(
            Long restaurantId,
            List<String> categoryNames) {

        for (String categoryName : categoryNames) {

            // ① カテゴリーIDを取得 or 作成
            Long categoryId = categoryService.getOrCreateCategoryId(categoryName);

            // ② 紐付け登録
            restaurantCategoriesMapper
                    .insert(restaurantId, categoryId);
        }
    }
}
