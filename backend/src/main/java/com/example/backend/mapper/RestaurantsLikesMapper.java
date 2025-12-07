package com.example.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RestaurantsLikesMapper {

    boolean isFavorite(
        @Param("restaurantId") Long restaurantId,
        @Param("userId") Long userId
    );

}
