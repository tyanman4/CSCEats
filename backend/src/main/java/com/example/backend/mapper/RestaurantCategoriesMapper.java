package com.example.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RestaurantCategoriesMapper {
    void insert(
            @Param("restaurantId") Long restaurantId,
            @Param("categoryId") Long categoryId);

    int exists(
            @Param("restaurantId") Long restaurantId,
            @Param("categoryId") Long categoryId);
}
