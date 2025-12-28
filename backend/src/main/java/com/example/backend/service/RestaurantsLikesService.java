package com.example.backend.service;

import com.example.backend.mapper.RestaurantsLikesMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RestaurantsLikesService {

    private final RestaurantsLikesMapper restaurantsLikesMapper;

    /**
     * レストランにいいねを追加
     *
     * @param restaurantId レストランID
     * @param userId       ユーザID
     */
    public void addLike(Long restaurantId, Long userId) {
        restaurantsLikesMapper.insert(restaurantId, userId);
    }

    /**
     * レストランのいいねを削除
     *
     * @param restaurantId レストランID
     * @param userId       ユーザID
     */
    public void removeLike(Long restaurantId, Long userId) {
        restaurantsLikesMapper.delete(restaurantId, userId);
    }

    /**
     * レストランのいいね数を取得
     *
     * @param restaurantId レストランID
     * @return いいね数
     */
    public int getLikeCount(Long restaurantId) {
        return restaurantsLikesMapper.countByRestaurantId(restaurantId);
    }
}