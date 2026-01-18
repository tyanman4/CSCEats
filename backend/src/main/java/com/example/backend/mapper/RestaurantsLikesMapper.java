package com.example.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.RestaurantsLikes;

@Mapper
public interface RestaurantsLikesMapper {

        boolean isLiked(
                        @Param("restaurantId") Long restaurantId,
                        @Param("userId") Long userId);

        void insert(
                        @Param("restaurantId") Long restaurantId,
                        @Param("userId") Long userId);

        void delete(
                        @Param("restaurantId") Long restaurantId,
                        @Param("userId") Long userId);

        int countByRestaurantId(@Param("restaurantId") Long restaurantId);

        List<RestaurantsLikes> findRestaurantsByUserId(Long userId);

}
