package com.example.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RestaurantsLikesMapper {

    boolean isLiked(
        @Param("restaurantId") Long restaurantId,
        @Param("userId") Long userId
    );

    void insert(
        @Param("restaurantId") Long restaurantId,
        @Param("userId") Long userId
    );

    void delete(
        @Param("restaurantId") Long restaurantId,
        @Param("userId") Long userId
    );

    int countByRestaurantId(@Param("restaurantId") Long restaurantId);
}
