package com.example.backend.service;

import com.example.backend.dto.RestaurantDetailDto;

public interface RestaurantDetailService {

    /**
     * レストラン詳細情報を取得
     * @param restaurantId レストランID
     * @param userId ログインユーザID（お気に入り判定に使う）
     * @return RestaurantDetailDto
     */
    RestaurantDetailDto getRestaurantDetail(Long restaurantId, Long userId);

}
